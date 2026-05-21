import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Users, ClipboardList, Star } from "lucide-react";

export default function CustomerStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalWorkers: 0,
    totalBookings: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/customer/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.stats;

      setStats({
        totalServices: data.totalServices || 0,
        totalWorkers: data.totalWorkers || 0,
        totalBookings: data.totalBookings || 0,
        averageRating: data.averageRating || 0,
      });
    } catch (err) {
      console.error("Stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500">
        Loading dashboard stats...
      </div>
    );
  }

  const cards = [
    {
      title: "Services",
      value: stats.totalServices,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Workers",
      value: stats.totalWorkers,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: ClipboardList,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Avg Rating",
      value: stats.averageRating,
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="w-full">
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between hover:shadow-md transition"
            >
              {/* Left */}
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>

                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>

              {/* Icon */}
              <div className={`p-3 rounded-xl ${item.bg}`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
