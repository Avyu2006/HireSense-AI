import re

REQUIRED_SKILLS = [
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
    "HTML",
    "CSS",
    "Excel"
]


def analyze_resume(text: str):

    found_skills = []

    lower_text = text.lower()

    for skill in REQUIRED_SKILLS:
        if skill.lower() in lower_text:
            found_skills.append(skill)

    missing_skills = [
        skill
        for skill in REQUIRED_SKILLS
        if skill not in found_skills
    ]

    score = int((len(found_skills) / len(REQUIRED_SKILLS)) * 100)

    suggestions = []

    if "Git" not in found_skills:
        suggestions.append("Learn and mention Git.")

    if "Docker" not in found_skills:
        suggestions.append("Add Docker knowledge.")

    if "SQL" not in found_skills:
        suggestions.append("Mention SQL projects.")

    education = re.findall(
        r"B\.?Tech.*|Bachelor.*",
        text,
        flags=re.IGNORECASE
    )

    experience = re.findall(
        r"Intern.*|Experience.*",
        text,
        flags=re.IGNORECASE
    )

    return {
        "score": score,
        "skills": found_skills,
        "missing_skills": missing_skills,
        "education": education,
        "experience": experience,
        "suggestions": suggestions
    }