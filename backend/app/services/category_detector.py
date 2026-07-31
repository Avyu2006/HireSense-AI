def detect_category(job_description: str):

    job = job_description.lower()

    categories = {

        "ai_ml": [
            "machine learning",
            "deep learning",
            "tensorflow",
            "pytorch",
            "opencv",
            "nlp",
            "computer vision",
            "langchain",
            "llm",
            "openai"
        ],

        "fullstack": [
            "react",
            "javascript",
            "typescript",
            "node",
            "express",
            "html",
            "css",
            "mongodb",
            "next.js"
        ],

        "data_science": [
            "pandas",
            "numpy",
            "tableau",
            "power bi",
            "statistics",
            "matplotlib",
            "seaborn"
        ],

        "devops": [
            "docker",
            "kubernetes",
            "terraform",
            "jenkins",
            "ansible",
            "aws",
            "azure",
            "ci/cd"
        ]
    }

    scores = {}

    for category, keywords in categories.items():

        score = 0

        for keyword in keywords:

            if keyword in job:
                score += 1

        scores[category] = score

    best_category = max(scores, key=scores.get)

    return best_category