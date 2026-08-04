import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DashboardCharts({ stats }) {
  const data =
    stats.resume_history?.map((item, index) => ({
      name: item.uploaded_at || `Resume ${index + 1}`,
      ats: stats.ats_history?.[index] ?? 0,
      job: stats.job_match_history?.[index] ?? 0,
      interview: stats.interview_history?.[index] ?? 0,
    })) || [];

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500">
        Upload resumes to see analytics.
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          ATS Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Line
              dataKey="ats"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Job Match Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="job"
              fill="#6366f1"
              radius={[6,6,0,0]}
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Interview Trend
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Area
              dataKey="interview"
              stroke="#f97316"
              fill="#fdba74"
            />
          </AreaChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default DashboardCharts;
