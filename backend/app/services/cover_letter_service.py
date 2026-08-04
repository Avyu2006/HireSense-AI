from app.services.gemini_service import generate


def generate_cover_letter(resume: str, job_description: str):
    prompt = f"""
You are an expert career coach.

Write a professional cover letter based on the resume and job description.

Requirements:
- Professional tone
- Around 300 words
- Mention relevant skills
- Explain why the candidate is suitable
- End politely
- Return only the cover letter

Resume:
{resume}

Job Description:
{job_description}
"""

    return generate(prompt)