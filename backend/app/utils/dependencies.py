from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.security import oauth2_scheme
from app.models.user import User
from app.utils.security import get_current_user as security_get_current_user

def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return security_get_current_user(db, token)