from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, post, user
from app.database import engine
from app.models import user as user_models, post as post_models

user_models.Base.metadata.create_all(bind=engine)
post_models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(post.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Blogi API"}