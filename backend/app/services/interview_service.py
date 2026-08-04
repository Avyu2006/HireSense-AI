from google.genai import types

from app.services.gemini_service import generate


def generate_interview_questions(resume_text: str, job_description: str):
    """
    Generate interview questions using Gemini AI.
    """

    prompt = f"""
You are an expert Technical Interviewer.

Based on the candidate's resume and the job description, generate exactly 10 interview questions.

Rules:
- Generate 6 technical questions.
- Generate 2 project-based questions.
- Generate 2 HR/behavioral questions.
- Questions should match the candidate's experience level.
- Do not invent projects or skills not present in the resume.
- Return ONLY the questions.
- Number them from 1 to 10.

Resume:
{resume_text}

Job Description:
{job_description}
"""

    response = generate(prompt)

    questions = []

    for line in response.split("\n"):
        line = line.strip()

        if not line:
            continue

        if "." in line:
            line = line.split(".", 1)[1].strip()
        elif ")" in line:
            line = line.split(")", 1)[1].strip()

        if line:
            questions.append(line)

    return questions[:10]


def evaluate_answer(question: str, answer: str):
    """
    Evaluate a user's interview answer.
    """

    prompt = f"""
You are an AI technical interviewer.

Evaluate the candidate's answer briefly.

Question:
{question}

Answer:
{answer}

Rules:
- Keep the response SHORT.
- Give only one strength.
- Give only one weakness.
- Give only one improvement.
- Ideal answer must be only 2-3 sentences.
- Do not exceed 180 words.

Return EXACTLY in this format:

Score: X/10

Feedback:
- Strength: ...
- Weakness: ...
- Improvement: ...

Ideal Answer:
...
"""

    return generate(prompt)