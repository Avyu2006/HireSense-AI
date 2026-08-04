import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

function ResumeHistory() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/resume/history");
      setResumes(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load resume history.");
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await api.delete(`/resume/${id}`);
      loadHistory();
    } catch (err) {
      console.error(err);
      alert("Unable to delete resume.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Resume History
        </h1>

        {resumes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No resumes uploaded yet.
          </div>
        ) : (
          <div className="space-y-4">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white shadow rounded-xl p-5 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    {resume.filename}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Uploaded:{" "}
                    {new Date(resume.uploaded_at).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => deleteResume(resume.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeHistory;