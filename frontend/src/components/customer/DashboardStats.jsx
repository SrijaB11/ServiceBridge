import { useEffect, useState } from "react";
import axios from "axios";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalWorkers: 0,
    totalBookings: 0,
    avgRating: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/stats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">Loading stats...</div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {/* SERVICES */}
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <h2 className="text-xl font-bold">{stats.totalServices}</h2>
        <p className="text-gray-500 text-sm">Services</p>
      </div>

      {/* WORKERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <h2 className="text-xl font-bold">{stats.totalWorkers}</h2>
        <p className="text-gray-500 text-sm">Workers</p>
      </div>

      {/* BOOKINGS */}
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <h2 className="text-xl font-bold">{stats.totalBookings}</h2>
        <p className="text-gray-500 text-sm">Bookings</p>
      </div>

      {/* RATING */}
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <h2 className="text-xl font-bold">{stats.avgRating}★</h2>
        <p className="text-gray-500 text-sm">Rating</p>
      </div>
    </div>
  );
}

export default DashboardStats;
