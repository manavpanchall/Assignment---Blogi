from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.schemas.post import Post, PostCreate
from app.crud.post import (
    get_posts,
    get_post,
    create_post,
    update_post,
    delete_post,
    get_user_posts,
)
from app.utils.dependencies import get_db, get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    posts = get_posts(db, skip=skip, limit=limit)
    return posts

@router.get("/my-posts/", response_model=List[Post])
def read_user_posts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    posts = get_user_posts(db, user_id=current_user.id)
    return posts

@router.post("/", response_model=Post)
def create_new_post(
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_post(db=db, post=post, user_id=current_user.id)

@router.get("/{post_id}", response_model=Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    post = get_post(db, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/{post_id}", response_model=Post)
def update_existing_post(
    post_id: int,
    post: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_post = update_post(db, post_id=post_id, post=post, user_id=current_user.id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found or not authorized")
    return db_post

@router.delete("/{post_id}")
def delete_existing_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_post = delete_post(db, post_id