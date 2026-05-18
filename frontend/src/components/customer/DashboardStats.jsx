import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalWorkers: 0,
    totalBookings: 0,
    avgRating: 4.8,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Individual API calls with fallback
      const servicesPromise = axios
        .get("http://localhost:5000/service/totalServices", { headers })
        .catch(() => ({
          data: { totalServices: 0 },
        }));

      const bookingsPromise = axios
        .get("http://localhost:5000/bookings/totalbookings", { headers })
        .catch(() => ({
          data: { totalBookings: 0 },
        }));

      // const workersPromise = axios
      //   .get("http://localhost:5000/workers/totalworkers", { headers })
      //   .catch(() => ({
      //     data: { totalWorkers: 0 },
      //   }));

      const [servicesRes, bookingsRes] = await Promise.all([
        servicesPromise,
        bookingsPromise,
      ]);

      setStats({
        totalServices: servicesRes.data.totalServices || 0,
        totalBookings: bookingsRes.data.totalBookings || 0,
        totalWorkers: 22,
        avgRating: 4.8,
      });
    } catch (error) {
      console.log("Dashboard stats error:", error);
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
      <div className="bg-white p-4 rounded-xl shadow-sm text-center flex flex-col items-center">
        <div className="flex items-center gap-1">
          <h2 className="text-xl font-bold">{stats.avgRating}</h2>
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        </div>

        <p className="text-gray-500 text-sm">Average Rating</p>
      </div>
    </div>
  );
}

export default DashboardStats;
