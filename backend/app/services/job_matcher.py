import re

COMMON_SKILLS = [
    "Python",
    "SQL",
    "FastAPI",
    "Machine Learning",
    "Deep Learning",
    "Data Analysis",
    "Pandas",
    "NumPy",
    "Git",
    "Docker",
    "REST API",
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Node.js",
    "MongoDB",
    "AWS",
    "Linux",
    "TensorFlow",
]


def extract_skills(text):
    text = text.lower()

    skills = []

    for skill in COMMON_SKILLS:
        if skill.lower() in text:
            skills.append(skill)

    return skills


def match_resume_with_job(resume_text, job_description):
    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description)

    matched = list(set(resume_skills) & set(job_skills))
    missing = list(set(job_skills) - set(resume_skills))

    if len(job_skills) == 0:
        score = 0
    else:
        score = int((len(matched) / len(job_skills)) * 100)

    if score >= 85:
        level = "Excellent Match"
    elif score >= 70:
        level = "Good Match"
    elif score >= 50:
        level = "Average Match"
    else:
        level = "Low Match"

    suggestions = []

    for skill in missing:
        suggestions.append(f"Add {skill} to your resume.")

    return {
        "match_score": score,
        "match_level": level,
        "matched_skills": sorted(matched),
        "missing_skills": sorted(missing),
        "resume_skills": sorted(resume_skills),
        "job_skills": sorted(job_skills),
        "suggestions": suggestions,
    }