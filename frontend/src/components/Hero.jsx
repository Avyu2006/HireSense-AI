import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
            Ace Every
            <span className="text-blue-600"> Interview </span>
            With AI
          </h1>

          <p className="mt-8 text-xl text-gray-600">
            Practice technical and HR interviews,
            analyze your resume,
            improve communication,
            and receive personalized AI coaching.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700">
              Get Started
            </button>

            <button className="border px-8 py-4 rounded-xl hover:bg-gray-100">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="AI Interview"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;