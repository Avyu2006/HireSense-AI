import { useEffect, useState } from "react";
import api from "../services/api";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await api.get("/resume/interview");

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
      alert("Failed to load interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🤖 AI Interview Generator</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Interview Questions</h2>

          <ol>
            {questions.map((question, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                {question}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

export default Interview;