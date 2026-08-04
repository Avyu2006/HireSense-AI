from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os
import shutil

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.schemas.job import JobDescription
from app.core.security import verify_token

from app.services.resume_parser import extract_resume_text
from app.services.ats_analyzer import analyze_resume
from app.services.job_matcher import match_resume_with_job
from app.services.interview_generator import generate_questions

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_resume_text(file_path)

    analysis = analyze_resume(resume_text)

    new_resume = Resume(
        filename=file.filename,
        resume_text=resume_text,
        ats_score=analysis["score"],
        job_match=0,
        interview_score=0,
        user_id=token["user_id"]
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {
        "message": "Resume uploaded successfully",
        "analysis": analysis
    }


@router.get("/history")
def resume_history(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == token["user_id"])
        .order_by(Resume.id.desc())
        .all()
    )

    return [
        {
            "id": r.id,
            "filename": r.filename,
            "uploaded_at": r.uploaded_at,
            "ats_score": r.ats_score,
            "job_match": r.job_match,
            "interview_score": r.interview_score,
        }
        for r in resumes
    ]


@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == token["user_id"]
        )
        .first()
    )

    if not resume:
        raise HTTPException(404, "Resume not found")

    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)

    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(resume)
    db.commit()

    return {
        "message": "Resume deleted successfully"
    }


@router.get("/download/{resume_id}")
def download_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == token["user_id"]
        )
        .first()
    )

    if not resume:
        raise HTTPException(404, "Resume not found")

    path = os.path.join(UPLOAD_FOLDER, resume.filename)

    if not os.path.exists(path):
        raise HTTPException(404, "File not found")

    return FileResponse(
        path,
        filename=resume.filename,
        media_type="application/octet-stream"
    )


@router.post("/job-match")
def job_match(
    data: JobDescription,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == token["user_id"])
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Please upload a resume first."
        )

    result = match_resume_with_job(
        resume.resume_text,
        data.job_description
    )

    resume.job_match = result["match_score"]
    db.commit()

    return result


@router.get("/interview")
def interview_questions(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == token["user_id"])
        .order_by(Resume.id.desc())
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Please upload a resume first."
        )

    questions = generate_questions(
        resume.resume_text
    )

    # Temporary interview score
    resume.interview_score = 75
    db.commit()

    return questions