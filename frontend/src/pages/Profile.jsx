import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userRes = await api.get("/users/me");
      const statsRes = await api.get("/dashboard/stats");

      setUser(userRes.data.user);
      setStats(statsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              User Information
            </h2>

            <p className="mb-3">
              <strong>Email:</strong> {user.sub}
            </p>

            <p>
              <strong>User ID:</strong> {user.user_id}
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-4">
              Resume Statistics
            </h2>

            <p className="mb-2">
              Total Resumes: {stats.total_resumes}
            </p>

            <p className="mb-2">
              Latest Resume: {stats.latest_resume}
            </p>

            <p className="mb-2">
              ATS Score: {stats.ats_score}%
            </p>

            <p>
              Job Match: {stats.job_match}%
            </p>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-8">

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Profile;