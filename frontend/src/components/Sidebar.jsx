import {
  LayoutDashboard,
  Upload,
  FileSearch,
  Briefcase,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload Resume",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "ATS Analyzer",
      path: "/ats",
      icon: <FileSearch size={20} />,
    },
    {
      name: "Job Matcher",
      path: "/job-match",
      icon: <Briefcase size={20} />,
    },
    {
      name: "AI Interview",
      path: "/interview",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col">

      <div className="text-2xl font-bold p-6 border-b border-slate-700">
        HireSense AI
      </div>

      <nav className="flex-1 p-4">

        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}

      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 m-4 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;