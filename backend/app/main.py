from fastapi import FastAPI

from app.database.database import Base, engine
from app.models import user, resume
from app.routes import user as user_routes
from app.routes import resume as resume_routes

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HireSense AI API",
    version="1.0.0"
)

app.include_router(user_routes.router)
app.include_router(resume_routes.router)


@app.get("/")
def root():
    return {
        "message": "Welcome to HireSense AI Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }