import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise Exception("GEMINI_API_KEY not found in .env")

client = genai.Client(
    api_key=API_KEY
)


def generate(prompt: str) -> str:
    """
    Optimized Gemini request
    """

    start = time.perf_counter()

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash",   # Faster than 3.6 Flash
            contents=prompt,
        )

        end = time.perf_counter()

        print("=" * 60)
        print(f"Gemini Response Time : {end - start:.2f} sec")
        print("=" * 60)

        if hasattr(response, "text") and response.text:
            return response.text.strip()

        return "No response generated."

    except Exception as e:
        end = time.perf_counter()

        print("=" * 60)
        print(f"Gemini Error after {end - start:.2f} sec")
        print(e)
        print("=" * 60)

        raise