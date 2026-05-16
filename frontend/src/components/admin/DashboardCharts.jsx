import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const DashboardCharts = ({ stats }) => {
  const raw = stats?.raw || {};

  // 📈 BOOKINGS TREND (mock grouped by status)
  const bookingData = [
    {
      name: "Pending",
      value: raw.bookings?.filter((b) => b.status === "pending").length || 0,
    },
    {
      name: "Approved",
      value: raw.bookings?.filter((b) => b.status === "approved").length || 0,
    },
    {
      name: "Completed",
      value: raw.bookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      name: "Cancelled",
      value: raw.bookings?.filter((b) => b.status === "cancelled").length || 0,
    },
  ];

  // 👥 USERS DISTRIBUTION
  const userData = [
    { name: "Customers", value: stats.customers || 0 },
    { name: "Workers", value: stats.workers || 0 },
  ];

  // 💰 FINANCIAL OVERVIEW
  const financeData = [
    {
      name: "Revenue",
      value:
        raw.payments?.reduce((a, b) => a + (b.adminCommission || 0), 0) || 0,
    },
    {
      name: "Payouts",
      value: raw.payments?.reduce((a, b) => a + (b.workerEarning || 0), 0) || 0,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 📈 BOOKINGS CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Bookings Status</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 👥 USERS PIE CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Users Distribution</h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={userData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 💰 FINANCE BAR CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Revenue vs Payouts</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={financeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
