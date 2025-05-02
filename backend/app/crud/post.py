from sqlalchemy.orm import Session
from datetime import datetime
from app.models.post import Post

def get_posts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()

def get_user_posts(db: Session, user_id: int):
    return db.query(Post).filter(Post.author_id == user_id).order_by(Post.created_at.desc()).all()

def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

def create_post(db: Session, post, user_id: int):
    db_post = Post(**post.dict(), author_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: int, post, user_id: int):
    db_post = db.query(Post).filter(Post.id == post_id, Post.author_id == user_id).first()
    if db_post:
        db_post.title = post.title
        db_post.content = post.content
        db_post.updated_at = datetime.now()
        db.commit()
        db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int, user_id: int):
    db_post = db.query(Post).filter(Post.id == post_id, Post.author_id == user_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post