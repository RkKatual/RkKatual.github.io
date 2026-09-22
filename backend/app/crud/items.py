from pathlib import Path
import json
from threading import Lock
from typing import List, Optional, Dict
from uuid import uuid4
from datetime import datetime
from app.schemas.item import ItemCreate, ItemUpdate

_lock = Lock()

def _data_file() -> Path:
    base = Path(__file__).resolve().parent.parent
    return base / "data" / "items.json"

def _read_all() -> List[Dict]:
    p = _data_file()
    if not p.exists():
        return []
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return []

def _write_all(items: List[Dict]):
    p = _data_file()
    p.write_text(json.dumps(items, default=str, indent=2), encoding="utf-8")

def get_all_items() -> List[Dict]:
    return _read_all()

def get_item(item_id: str) -> Optional[Dict]:
    items = _read_all()
    for it in items:
        if it.get("id") == item_id:
            return it
    return None

def create_item(data: ItemCreate) -> Dict:
    with _lock:
        items = _read_all()
        item = {
            "id": str(uuid4()),
            "name": data.name,
            "description": data.description,
            "url": str(data.url) if data.url else None,
            "created_at": datetime.utcnow().isoformat() + "Z",
        }
        items.insert(0, item)
        _write_all(items)
        return item

def update_item(item_id: str, update: ItemUpdate) -> Optional[Dict]:
    with _lock:
        items = _read_all()
        for i, it in enumerate(items):
            if it.get("id") == item_id:
                if update.name is not None:
                    it["name"] = update.name
                if update.description is not None:
                    it["description"] = update.description
                if update.url is not None:
                    it["url"] = str(update.url)
                items[i] = it
                _write_all(items)
                return it
        return None

def delete_item(item_id: str) -> bool:
    with _lock:
        items = _read_all()
        new = [it for it in items if it.get("id") != item_id]
        if len(new) == len(items):
            return False
        _write_all(new)
        return True