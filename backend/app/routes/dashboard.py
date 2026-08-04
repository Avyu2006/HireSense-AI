from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.resume import Resume
from app.core.security import verify_token

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == token["user_id"])
        .order_by(Resume.id.desc())
        .all()
    )

    if not resumes:
        return {
            "total_resumes": 0,
            "latest_resume": "No Resume",
            "ats_score": 0,
            "job_match": 0,
            "interview_score": 0,
            "resume_history": [],
            "ats_history": [],
            "job_match_history": [],
            "interview_history": []
        }

    latest = resumes[0]

    return {
        "total_resumes": len(resumes),
        "latest_resume": latest.filename,
        "ats_score": latest.ats_score,
        "job_match": latest.job_match,
        "interview_score": latest.interview_score,

        "resume_history": [
            {
                "name": r.filename,
                "uploaded_at": r.uploaded_at.strftime("%d %b")
            }
            for r in reversed(resumes)
        ],

        "ats_history": [
            r.ats_score for r in reversed(resumes)
        ],

        "job_match_history": [
            r.job_match for r in reversed(resumes)
        ],

        "interview_history": [
            r.interview_score for r in reversed(resumes)
        ]
    }