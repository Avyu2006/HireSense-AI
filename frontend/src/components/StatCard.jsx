import { motion } from "framer-motion";

function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <p className="text-gray-500">{title}</p>

      <h2 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </motion.div>
  );
}

export default StatCard;