import { useEffect, useState } from "react";
import {
  FileText,
  Target,
  Briefcase,
  Brain,
  Upload,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import AnimatedCounter from "../components/AnimatedCounter";
import DashboardCharts from "../components/DashboardCharts";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_resumes: 0,
    latest_resume: "No Resume",
    ats_score: 0,
    job_match: 0,
    interview_score: 0,
    resume_history: [],
    ats_history: [],
    job_match_history: [],
    interview_history: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    {
      title: "Total Resumes",
      value: stats.total_resumes,
      icon: <FileText size={30} />,
      color: "from-blue-600 to-cyan-500",
      suffix: "",
    },
    {
      title: "ATS Score",
      value: stats.ats_score,
      icon: <Target size={30} />,
      color: "from-green-600 to-emerald-500",
      suffix: "%",
    },
    {
      title: "Job Match",
      value: stats.job_match,
      icon: <Briefcase size={30} />,
      color: "from-purple-600 to-pink-500",
      suffix: "%",
    },
    {
      title: "Interview",
      value: stats.interview_score,
      icon: <Brain size={30} />,
      color: "from-orange-500 to-red-500",
      suffix: "%",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl text-white p-10 shadow-xl mb-8">

          <h1 className="text-4xl font-bold">
            Welcome to HireSense AI 👋
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Analyze resumes, improve ATS score, match jobs and prepare for interviews using AI.
          </p>

          <Link
            to="/upload"
            className="inline-flex items-center gap-2 mt-6 bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            <Upload size={20} />
            Upload Resume
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {cards.map((card) => (

            <div
              key={card.title}
              className={`bg-gradient-to-r ${card.color} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition`}
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-white/80">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    <AnimatedCounter
                      value={card.value}
                      suffix={card.suffix}
                    />
                  </h2>

                </div>

                {card.icon}

              </div>

            </div>

          ))}

        </div>

        <DashboardCharts stats={stats} />

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Latest Resume
            </h2>

            <div className="bg-slate-100 rounded-xl p-5 flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Latest Upload
                </p>

                <h3 className="text-lg font-semibold mt-1">
                  {stats.latest_resume}
                </h3>

              </div>

              <FileText
                size={45}
                className="text-blue-600"
              />

            </div>

            <div className="mt-6">

              <h3 className="font-semibold mb-3">
                Recent Activity
              </h3>

              <div className="space-y-3">

                {stats.resume_history.length === 0 ? (

                  <p className="text-gray-500">
                    No activity yet.
                  </p>

                ) : (

                  stats.resume_history
                    .slice(-5)
                    .reverse()
                    .map((item, index) => (

                      <div
                        key={index}
                        className="flex justify-between bg-slate-50 rounded-lg p-3"
                      >

                        <span>
                          📄 {item.name}
                        </span>

                        <span className="text-gray-500">
                          {item.uploaded_at}
                        </span>

                      </div>

                    ))

                )}

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              AI Insights
            </h2>

            <div className="space-y-4">

              <div className="bg-green-50 rounded-xl p-4 flex justify-between">

                <span>
                  ATS Score: {stats.ats_score}%
                </span>

                <ArrowRight />

              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex justify-between">

                <span>
                  Job Match: {stats.job_match}%
                </span>

                <ArrowRight />

              </div>

              <div className="bg-purple-50 rounded-xl p-4 flex justify-between">

                <span>
                  Interview Score: {stats.interview_score}%
                </span>

                <ArrowRight />

              </div>

              <div className="bg-orange-50 rounded-xl p-4">

                <p className="font-semibold">
                  Recommendation
                </p>

                <p className="text-gray-600 mt-2">

                  {stats.ats_score >= 80
                    ? "Excellent ATS score. Focus on tailoring your resume for each job."
                    : "Improve keywords, skills and formatting to increase your ATS score."}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;