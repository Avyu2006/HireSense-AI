import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  Upload,
  Target,
  CheckCircle,
  XCircle,
  Sparkles,
  LoaderCircle,
} from "lucide-react";

function ATSAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(res.data.analysis);
      toast.success("Resume analyzed successfully!");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.detail ||
        "Analysis failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 rounded-3xl text-white p-8 shadow-xl mb-8">

          <div className="flex items-center gap-4">

            <Target size={45} />

            <div>

              <h1 className="text-4xl font-bold">
                ATS Resume Analyzer
              </h1>

              <p className="mt-2 text-emerald-100">
                AI checks your resume against ATS standards and highlights improvements.
              </p>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="border-2 border-dashed border-emerald-400 rounded-2xl p-10 text-center">

            <Upload
              size={55}
              className="mx-auto text-emerald-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              Upload Resume
            </h2>

            <p className="text-gray-500 mt-2 mb-5">
              PDF, DOC or DOCX
            </p>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-5"
            />

            {file && (
              <div className="font-semibold text-emerald-700 mb-5">
                {file.name}
              </div>
            )}

            <button
              onClick={analyzeResume}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 mx-auto disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles />
                  Analyze Resume
                </>
              )}
            </button>

          </div>

        </div>

        {result && (

          <div className="mt-8">

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8">

              <h2 className="text-2xl font-bold mb-6">
                ATS Score
              </h2>

              <div
                className={`w-44 h-44 rounded-full border-[10px] mx-auto flex items-center justify-center text-5xl font-bold ${
                  result.score >= 80
                    ? "border-green-500 text-green-600"
                    : result.score >= 60
                    ? "border-yellow-500 text-yellow-600"
                    : "border-red-500 text-red-600"
                }`}
              >
                {result.score}%
              </div>

            </div>

            <div className="grid lg:grid-cols-2 gap-6">

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold text-green-600 mb-5 flex items-center gap-2">
                  <CheckCircle />
                  Skills Found
                </h2>

                <div className="flex flex-wrap gap-2">

                  {result.skills.map((skill) => (
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

            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">

                <Sparkles className="text-yellow-500" />

                AI Suggestions

              </h2>

              <div className="space-y-3">

                {result.suggestions.map((item, index) => (

                  <div
                    key={index}
                    className="bg-slate-100 rounded-xl p-4"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default ATSAnalyzer;