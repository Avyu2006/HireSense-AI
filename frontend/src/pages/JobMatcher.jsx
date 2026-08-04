import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { Briefcase, CheckCircle, XCircle } from "lucide-react";

function JobMatcher() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const matchJob = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/resume/job-match", {
        job_description: jobDescription,
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.detail || "Job matching failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-gradient-to-r from-indigo-700 to-blue-600 rounded-3xl text-white p-8 shadow-xl mb-8">

          <div className="flex items-center gap-4">

            <Briefcase size={42} />

            <div>

              <h1 className="text-4xl font-bold">
                AI Job Matcher
              </h1>

              <p className="text-blue-100 mt-2">
                Compare your resume with any job description and discover missing skills instantly.
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <textarea
            rows="12"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={matchJob}
            disabled={loading}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Matching..." : "Match Resume"}
          </button>

        </div>

        {result && (

          <div className="mt-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">

              <h2 className="text-2xl font-bold mb-4">
                Match Score
              </h2>

              <div className="w-40 h-40 rounded-full border-[10px] border-blue-600 mx-auto flex items-center justify-center text-5xl font-bold text-blue-700">
                {result.match_score}%
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold text-green-600 mb-5 flex items-center gap-2">
                  <CheckCircle />
                  Matched Skills
                </h2>

                <div className="flex flex-wrap gap-2">

                  {result.matched_skills.map((skill) => (

                    <span
                      key={skill}
                      className="bg-green-100 text-green-700 px-3 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold text-red-600 mb-5 flex items-center gap-2">
                  <XCircle />
                  Missing Skills
                </h2>

                <div className="flex flex-wrap gap-2">

                  {result.missing_skills.map((skill) => (

                    <span
                      key={skill}
                      className="bg-red-100 text-red-700 px-3 py-2 rounded-full"
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}

export default JobMatcher;