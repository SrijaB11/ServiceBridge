import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../redux/dashboard/dashboardSlice";

const StatsCards = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const cards = [
    {
      title: "Customers",
      value: stats?.customers || 0,
      color: "bg-blue-500",
    },
    {
      title: "Workers",
      value: stats?.workers || 0,
      color: "bg-green-500",
    },
    {
      title: "Bookings",
      value: stats?.bookings || 0,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `₹${stats?.revenue || 0}`,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} text-white p-4 rounded-xl shadow`}
        >
          <h3 className="text-sm opacity-90">{card.title}</h3>

          <p className="text-2xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
