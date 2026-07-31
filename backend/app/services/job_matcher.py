import json
import re
from pathlib import Path

from app.services.category_detector import detect_category

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def load_skills(category):

    file = DATA_DIR / f"{category}.json"

    with open(file, "r", encoding="utf-8") as f:
        return json.load(f)


def contains_skill(text, skill):

    pattern = r"\b" + re.escape(skill.lower()) + r"\b"

    return re.search(pattern, text.lower()) is not None


def match_resume_with_job(resume_text, job_description):

    category = detect_category(job_description)

    skills = load_skills(category)

    matched = []

    missing = []

    for skill in skills:

        if contains_skill(job_description, skill):

            if contains_skill(resume_text, skill):
                matched.append(skill)
            else:
                missing.append(skill)

    total = len(matched) + len(missing)

    score = 0

    if total > 0:
        score = round(len(matched) / total * 100)

    return {
        "category": category,
        "match_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "suggestions": [
            f"Learn or add {skill}"
            for skill in missing
        ]
    }