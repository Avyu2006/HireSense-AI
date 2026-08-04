from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.security import verify_token
from app.models.resume import Resume

from app.services.resume_rewriter import rewrite_resume
from app.services.gemini_service import generate

router = APIRouter(
    prefix="/ai",
    tags=["Artificial Intelligence"]
)


@router.get("/rewrite")
def rewrite_latest_resume(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """
    Rewrite the latest uploaded resume using Gemini AI.
    """

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

    result = rewrite_resume(resume.resume_text)

    return {
        "success": True,
        "filename": resume.filename,
        "data": result
    }


@router.get("/resume-suggestions")
def resume_suggestions(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """
    Resume improvement suggestions.
    """

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

    suggestions = [
        "Use stronger action verbs.",
        "Add measurable achievements.",
        "Include ATS keywords.",
        "Customize your resume for each job application.",
        "Keep the resume to one page if possible.",
        "Improve project descriptions.",
        "Highlight technical skills clearly."
    ]

    return {
        "success": True,
        "suggestions": suggestions
    }


@router.post("/cover-letter")
def generate_cover_letter(
    job_description: str = Body(..., embed=True),
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """
    Generate an AI Cover Letter using Gemini.
    """

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

    prompt = f"""
You are an expert Resume and Career Coach.

Write a professional cover letter based ONLY on the candidate's resume and the job description.

Requirements:
- Around 300 words.
- Professional and confident tone.
- Mention ONLY the skills, education, certifications, projects, and work experience that actually exist in the resume.
- NEVER invent, exaggerate, or assume any skills, technologies, certifications, achievements, or experience.
- If the job description mentions a skill that is NOT present in the resume, do NOT claim the candidate has it. Instead, state that the candidate is eager and willing to learn it.
- Explain why the candidate is a good fit based on the actual resume.
- Express enthusiasm for joining the company.
- End with a polite closing.
- Return ONLY the cover letter. Do not add notes, explanations, or markdown formatting.

Resume:
{resume.resume_text}

Job Description:
{job_description}
"""

    cover_letter = generate(prompt)

    return {
        "success": True,
        "filename": resume.filename,
        "cover_letter": cover_letter
    }