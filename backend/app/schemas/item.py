from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

class ItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    url: Optional[HttpUrl] = None

class ItemCreate(ItemBase):
    pass

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    url: Optional[HttpUrl] = None

class Item(ItemBase):
    id: str
    created_at: datetime