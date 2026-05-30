import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { Briefcase, Users, ClipboardList, Star } from "lucide-react";

import api from "../../api/axios";

function CustomerStats() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalWorkers: 0,
    totalBookings: 0,
    averageRating: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get("/customer/stats");

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
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = useMemo(
    () => [
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
    ],
    [stats],
  );

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500">
        Loading dashboard stats...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border p-5 flex items-center justify-between hover:shadow-md transition"
            >
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
              </div>

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

export default memo(CustomerStats);
