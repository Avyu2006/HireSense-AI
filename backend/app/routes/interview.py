import re

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import verify_token
from app.database.dependencies import get_db
from app.models.interview import Interview
from app.models.resume import Resume
from app.services.interview_service import (
    generate_interview_questions,
    evaluate_answer,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)


@router.post("/start")
def start_interview(
    data: dict,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    job_description = data.get("job_description")

    if not job_description:
        raise HTTPException(
            status_code=400,
            detail="Job description is required."
        )

    # Get latest uploaded resume
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

    questions = generate_interview_questions(
        resume.resume_text,
        job_description
    )

    # Clear previous interview
    db.query(Interview).filter(
        Interview.user_id == token["user_id"]
    ).delete()

    db.commit()

    response_questions = []

    for question in questions:
        interview = Interview(
            user_id=token["user_id"],
            question=question,
            answer="",
            score=0,
            feedback=""
        )

        db.add(interview)
        db.commit()
        db.refresh(interview)

        response_questions.append(
            {
                "id": interview.id,
                "question": interview.question
            }
        )

    return {
        "success": True,
        "total_questions": len(response_questions),
        "questions": response_questions
    }


@router.post("/answer")
def answer_question(
    data: dict,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    interview = db.query(Interview).filter(
        Interview.id == data["interview_id"],
        Interview.user_id == token["user_id"]
    ).first()

    if not interview:
        raise HTTPException(
            status_code=404,
            detail="Question not found."
        )

    interview.answer = data["answer"]

    evaluation = evaluate_answer(
        interview.question,
        interview.answer
    )

    score = 0

    match = re.search(
        r"Score:\s*(\d+)",
        evaluation,
        re.IGNORECASE
    )

    if match:
        score = int(match.group(1))

    interview.score = score
    interview.feedback = evaluation

    db.commit()
    db.refresh(interview)

    return {
        "success": True,
        "question": interview.question,
        "answer": interview.answer,
        "score": interview.score,
        "feedback": interview.feedback
    }


@router.get("/report")
def interview_report(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    interviews = db.query(Interview).filter(
        Interview.user_id == token["user_id"]
    ).all()

    if not interviews:
        raise HTTPException(
            status_code=404,
            detail="No interview found."
        )

    total_score = sum(item.score for item in interviews)

    average_score = (
        total_score / len(interviews)
        if interviews else 0
    )

    report = []

    for item in interviews:
        report.append(
            {
                "question": item.question,
                "answer": item.answer,
                "score": item.score,
                "feedback": item.feedback
            }
        )

    return {
        "success": True,
        "average_score": round(average_score, 2),
        "total_questions": len(interviews),
        "report": report
    }