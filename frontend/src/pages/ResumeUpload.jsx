import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  LoaderCircle,
} from "lucide-react";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/resume/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resume history.");
    }
  };

  const uploadResume = async () => {
    if (!file) {
      toast.error("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Resume uploaded successfully!");

      setFile(null);
      loadHistory();

    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail || "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await api.delete(`/resume/${id}`);
      toast.success("Resume deleted.");
      loadHistory();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed.");
    }
  };

  const downloadResume = (id) => {
    window.open(
      `http://127.0.0.1:8000/resume/download/${id}`,
      "_blank"
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-8 shadow-xl mb-8">

          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Upload size={40} />
            Resume Upload
          </h1>

          <p className="mt-3 text-blue-100">
            Upload your latest resume for ATS analysis, job matching and interview preparation.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <div className="border-2 border-dashed border-blue-400 rounded-2xl p-10 text-center">

            <Upload
              size={55}
              className="mx-auto text-blue-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              Drag & Drop Resume
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
              <div className="text-blue-700 font-semibold mb-5">
                Selected: {file.name}
              </div>
            )}

            <button
              onClick={uploadResume}
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 mx-auto disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload />
                  Upload Resume
                </>
              )}
            </button>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Resume History
          </h2>

          {history.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No resumes uploaded yet.
            </div>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-4">
                    Resume
                  </th>

                  <th>
                    Uploaded
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.map((resume) => (

                  <tr
                    key={resume.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="py-5 flex items-center gap-2">

                      <FileText className="text-blue-600" />

                      {resume.filename}

                    </td>

                    <td>
                      {new Date(
                        resume.uploaded_at
                      ).toLocaleString()}
                    </td>

                    <td className="text-center space-x-2">

                      <button
                        onClick={() => downloadResume(resume.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                      >
                        <Download size={18} />
                      </button>

                      <button
                        onClick={() => deleteResume(resume.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default ResumeUpload;