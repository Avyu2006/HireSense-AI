import { useState } from "react";
import api from "../services/api";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please choose a resume first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Resume upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Resume Upload</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadResume} disabled={loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h2>Upload Result</h2>

          <p>
            <strong>Filename:</strong> {result.filename}
          </p>

          {result.analysis && (
            <>
              <p>
                <strong>ATS Score:</strong>{" "}
                {result.analysis.score}
              </p>

              <h3>Skills Found</h3>
              <ul>
                {result.analysis.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <h3>Missing Skills</h3>
              <ul>
                {result.analysis.missing_skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <h3>Suggestions</h3>
              <ul>
                {result.analysis.suggestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;