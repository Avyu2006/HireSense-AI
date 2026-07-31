from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.resume_parser import extract_resume_text
from app.services.ats_analyzer import analyze_resume
from app.services.job_matcher import match_resume_with_job
from app.services.interview_generator import generate_questions
from app.schemas.job import JobDescription

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Store latest uploaded resume
latest_resume_text = ""


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    global latest_resume_text

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    latest_resume_text = extract_resume_text(file_path)

    analysis = analyze_resume(latest_resume_text)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "analysis": analysis
    }


@router.post("/job-match")
def job_match(data: JobDescription):
    global latest_resume_text

    if not latest_resume_text:
        return {
            "error": "Please upload a resume first."
        }

    return match_resume_with_job(
        latest_resume_text,
        data.job_description
    )


@router.get("/interview")
def interview_questions():
    global latest_resume_text

    if not latest_resume_text:
        return {
            "error": "Please upload a resume first."
        }

    return generate_questions(latest_resume_text)