import { Brain, FileText, Mic, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Brain size={40} className="text-blue-600" />,
    title: "AI Mock Interview",
    desc: "Practice realistic HR and technical interviews powered by AI.",
  },
  {
    icon: <FileText size={40} className="text-blue-600" />,
    title: "Resume Analysis",
    desc: "Receive ATS scores and personalized resume improvement tips.",
  },
  {
    icon: <Mic size={40} className="text-blue-600" />,
    title: "Voice Practice",
    desc: "Improve confidence with voice-based interview simulations.",
  },
  {
    icon: <BarChart3 size={40} className="text-blue-600" />,
    title: "Career Twin",
    desc: "Track your skills and interview progress over time with AI.",
  },
];

function Features() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <h2 className="text-4xl font-bold text-center mb-14">
        Everything You Need to Get Hired
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-xl transition"
          >
            {feature.icon}

            <h3 className="text-2xl font-semibold mt-6">
              {feature.title}
            </h3>

            <p className="text-gray-600 mt-4">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;