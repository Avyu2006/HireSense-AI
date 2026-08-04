import re


def generate_questions(resume_text: str):
    text = resume_text.lower()

    questions = []

    if "python" in text:
        questions.extend([
            "Explain Python decorators.",
            "What is the difference between a list and a tuple?",
            "How does Python memory management work?",
            "What are generators in Python?",
        ])

    if "fastapi" in text:
        questions.extend([
            "Why did you choose FastAPI for your project?",
            "What is dependency injection in FastAPI?",
            "How do you secure FastAPI APIs using JWT?",
        ])

    if "sql" in text:
        questions.extend([
            "Explain INNER JOIN and LEFT JOIN.",
            "What are indexes in SQL?",
            "What is normalization?",
        ])

    if "machine learning" in text:
        questions.extend([
            "Explain supervised and unsupervised learning.",
            "What is overfitting?",
            "How do you evaluate an ML model?",
            "Explain the bias-variance tradeoff.",
        ])

    if "deep learning" in text:
        questions.extend([
            "What is backpropagation?",
            "What is the difference between CNN and RNN?",
            "Why do we use activation functions?",
        ])

    if "docker" in text:
        questions.extend([
            "What is Docker?",
            "Explain Docker images and containers.",
            "What is Docker Compose?",
        ])

    if "git" in text:
        questions.extend([
            "Explain git rebase and git merge.",
            "What is the difference between fork and clone?",
        ])

    if "react" in text:
        questions.extend([
            "Explain React Hooks.",
            "What is Virtual DOM?",
            "Difference between useEffect and useState?",
        ])

    questions.extend([
        "Tell me about yourself.",
        "Describe your final year project.",
        "What challenges did you face while building HireSense AI?",
        "Why should we hire you?",
        "Where do you see yourself in five years?",
    ])

    unique_questions = []

    for question in questions:
        if question not in unique_questions:
            unique_questions.append(question)

    return {
        "total_questions": len(unique_questions),
        "questions": unique_questions,
    }