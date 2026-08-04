from app.services.gemini_service import generate


def rewrite_resume(text: str):
    prompt = f"""
You are an expert ATS Resume Writer.

Rewrite the following resume professionally.

Requirements:
- Keep all information truthful.
- Improve grammar.
- Improve ATS optimization.
- Use powerful action verbs.
- Make every bullet concise.
- Keep professional formatting.
- Return only the rewritten resume.

Resume:

{text}
"""

    rewritten = generate(prompt)

    return {
        "original": text,
        "rewritten": rewritten,
        "improvements": [
            "Grammar improved",
            "Professional wording",
            "ATS keywords optimized",
            "Action verbs strengthened",
            "Better readability",
        ],
    }