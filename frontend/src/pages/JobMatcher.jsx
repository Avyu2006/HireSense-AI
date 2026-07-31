import { useState } from "react";
import api from "../services/api";

function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/resume/job-match", {
        job_description: jobDescription,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to analyze job description.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🎯 Job Matcher</h1>

      <textarea
        rows="12"
        cols="80"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={analyzeJob} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Match"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Match Score: {result.match_score}%</h2>

          <h3>✅ Matched Skills</h3>
          <ul>
            {result.matched_skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <h3>❌ Missing Skills</h3>
          <ul>
            {result.missing_skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>

          <h3>💡 Suggestions</h3>
          <ul>
            {result.suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default JobMatcher;