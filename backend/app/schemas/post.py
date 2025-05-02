from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from app.schemas.user import User

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
    author: User

    class Config:
        from_attributes = True