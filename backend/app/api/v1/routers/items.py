from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.item import Item, ItemCreate, ItemUpdate
from app.crud import items as crud

router = APIRouter(prefix="/api/v1/items", tags=["items"])

@router.get("/", response_model=List[Item])
def list_items():
    return crud.get_all_items()

@router.post("/", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate):
    return crud.create_item(payload)

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: str):
    it = crud.get_item(item_id)
    if not it:
        raise HTTPException(status_code=404, detail="Item not found")
    return it

@router.put("/{item_id}", response_model=Item)
def update_item(item_id: str, payload: ItemUpdate):
    it = crud.update_item(item_id, payload)
    if not it:
        raise HTTPException(status_code=404, detail="Item not found")
    return it

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: str):
    ok = crud.delete_item(item_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Item not found")
    return None