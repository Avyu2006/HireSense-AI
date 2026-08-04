from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.routes.user import router as user_router
from app.routes.resume import router as resume_router
from app.routes.dashboard import router as dashboard_router
from app.routes.ai import router as ai_router
from app.routes.interview import router as interview_router

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HireSense AI API",
    version="1.0.0",
    description="AI-powered Resume Analyzer and Interview Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(user_router)
app.include_router(resume_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(interview_router)


@app.get("/")
def root():
    return {
        "message": "HireSense AI Backend Running 🚀",
        "status": "success"
    }