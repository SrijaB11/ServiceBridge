import Services from "../Services";
import { useNavigate } from "react-router-dom";
import React from "react";

const services = [
  {
    id: "plumbing",
    title: "Plumbing",
    desc: "Fix leaks, pipes, and installations",
    icon: "🔧",
  },
  {
    id: "cleaning",
    title: "House Cleaning",
    desc: "Home deep cleaning services",
    icon: "🧹",
  },
  {
    id: "electrical",
    title: "Electrical",
    desc: "Wiring and electrical repairs",
    icon: "⚡",
  },
  {
    id: "painting",
    title: "Painting",
    desc: "Wall painting & renovation",
    icon: "🎨",
  },
];

function DashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Service Bridge 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Book trusted professionals for your daily needs
          </p>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <h2 className="text-xl font-bold">12</h2>
            <p className="text-gray-500 text-sm">Services Available</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <h2 className="text-xl font-bold">5+</h2>
            <p className="text-gray-500 text-sm">Active Workers</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <h2 className="text-xl font-bold">24/7</h2>
            <p className="text-gray-500 text-sm">Support</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <h2 className="text-xl font-bold">4.8★</h2>
            <p className="text-gray-500 text-sm">User Rating</p>
          </div>
        </div>

        {/* SERVICES */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Explore Services</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/service/${s.id}`)}
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="font-semibold mt-2">{s.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{s.desc}</p>

              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* RECENT BOOKINGS */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Recent Bookings</h2>

          <p className="text-gray-500 text-sm">
            No bookings yet. Start by selecting a service above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
