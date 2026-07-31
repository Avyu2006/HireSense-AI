import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cards = [
    {
      title: "Resume Upload",
      description: "Upload your resume and extract text automatically.",
      icon: "📄",
      color: "#2563eb",
      path: "/upload",
    },
    {
      title: "ATS Analyzer",
      description: "Analyze your resume for ATS compatibility.",
      icon: "📊",
      color: "#16a34a",
      path: "/ats",
    },
    {
      title: "Job Matcher",
      description: "Compare your resume with any job description.",
      icon: "🎯",
      color: "#9333ea",
      path: "/job-match",
    },
    {
      title: "AI Interview",
      description: "Practice AI-generated interview questions.",
      icon: "🤖",
      color: "#ea580c",
      path: "/interview",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>HireSense AI</h1>
          <p style={{ margin: "5px 0 0" }}>
            AI Resume Analyzer & Career Assistant
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* Welcome */}
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2>Welcome 👋</h2>

        <p>
          Choose one of the tools below to continue building your professional
          profile.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
            marginTop: "35px",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h1>{card.icon}</h1>

              <h2>{card.title}</h2>

              <p>{card.description}</p>

              <button
                onClick={() => navigate(card.path)}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "8px",
                  background: card.color,
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;