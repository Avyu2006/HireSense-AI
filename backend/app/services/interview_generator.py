def generate_questions(resume_text: str):
    text = resume_text.lower()

    questions = []

    # General HR Questions
    questions.append("Tell me about yourself.")
    questions.append("Why do you want to work for our company?")
    questions.append("What are your strengths and weaknesses?")

    # Skill-based Questions
    if "python" in text:
        questions.append("Explain Python decorators.")
        questions.append("What are Python generators?")

    if "machine learning" in text:
        questions.append("Explain supervised and unsupervised learning.")
        questions.append("What is overfitting and how can you prevent it?")

    if "sql" in text:
        questions.append("Explain JOIN types in SQL.")
        questions.append("What is normalization?")

    if "fastapi" in text:
        questions.append("How does dependency injection work in FastAPI?")

    if "docker" in text:
        questions.append("Why is Docker useful in deployment?")

    if "git" in text:
        questions.append("Explain Git branching and merging.")

    if "react" in text:
        questions.append("What are React Hooks?")
        questions.append("Explain the Virtual DOM.")

    if "data analysis" in text:
        questions.append("How do you handle missing values in a dataset?")

    return {
        "total_questions": len(questions),
        "questions": questions
    }