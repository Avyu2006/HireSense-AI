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
    "React",
    "HTML",
    "CSS",
    "AWS",
    "Linux",
    "TensorFlow",
]

SECTION_KEYWORDS = {
    "Education": ["education", "qualification", "academic"],
    "Skills": ["skills", "technical skills", "technologies"],
    "Projects": ["projects", "project"],
    "Experience": ["experience", "work experience", "employment"],
    "Certifications": ["certification", "certifications", "certificate"],
}


def analyze_resume(text: str):

    lower = text.lower()

    found_skills = []

    for skill in REQUIRED_SKILLS:
        if skill.lower() in lower:
            found_skills.append(skill)

    missing_skills = [
        skill
        for skill in REQUIRED_SKILLS
        if skill not in found_skills
    ]

    score = int((len(found_skills) / len(REQUIRED_SKILLS)) * 100)

    email_found = bool(
        re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            text,
        )
    )

    phone_found = bool(
        re.search(
            r"(\+?\d[\d\s\-]{8,15})",
            text,
        )
    )

    sections = {}

    for section, keywords in SECTION_KEYWORDS.items():
        sections[section] = any(
            keyword.lower() in lower
            for keyword in keywords
        )

    suggestions = []

    if not email_found:
        suggestions.append("Add your email address.")

    if not phone_found:
        suggestions.append("Add your phone number.")

    if not sections["Education"]:
        suggestions.append("Add an Education section.")

    if not sections["Projects"]:
        suggestions.append("Include at least 2 projects.")

    if not sections["Skills"]:
        suggestions.append("Create a dedicated Skills section.")

    if not sections["Experience"]:
        suggestions.append("Add internship or work experience.")

    if not sections["Certifications"]:
        suggestions.append("Mention certifications.")

    for skill in missing_skills[:8]:
        suggestions.append(f"Consider adding {skill} if applicable.")

    return {
        "score": score,
        "skills": found_skills,
        "missing_skills": missing_skills,
        "email_found": email_found,
        "phone_found": phone_found,
        "sections": sections,
        "suggestions": suggestions,
    }