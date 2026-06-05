from uuid import uuid4

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="FastAPI CRUD Service", version="0.1.0")


class ItemCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    owner: str = Field(min_length=2, max_length=80)
    priority: int = Field(ge=1, le=5)


class Item(ItemCreate):
    id: str


items: dict[str, Item] = {}


@app.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item(payload: ItemCreate) -> Item:
    item = Item(id=str(uuid4()), **payload.model_dump())
    items[item.id] = item
    return item


@app.get("/items", response_model=list[Item])
def list_items() -> list[Item]:
    return list(items.values())


@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: str) -> Item:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="item not found")
    return items[item_id]


@app.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: str) -> None:
    if item_id not in items:
        raise HTTPException(status_code=404, detail="item not found")
    del items[item_id]

