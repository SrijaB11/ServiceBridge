import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "House Cleaning",
    desc: "Professional cleaning for a sparkling home.",
    image: "/images/services/cleaning.jpg",
  },
  {
    id: "plumber",
    title: "Plumber",
    desc: "Expert plumbing services at your door.",
    image: "/images/services/plumber.jpg",
  },
  {
    id: 3,
    title: "Electrical",
    desc: "Safe and reliable electrical solutions.",
    image: "/images/services/electrician.jpg",
  },
  {
    id: 4,
    title: "Painting",
    desc: "Transform your space with a fresh look.",
    image: "/images/services/painter.jpg",
  },
  {
    id: 5,
    title: "Pest Control",
    desc: "Keep your home pest-free & safe.",
    image: "/images/services/pests.jpg",
  },
  {
    id: 6,
    title: "Appliance Repair",
    desc: "Fix and service all major appliances.",
    image: "/images/services/appliance.jpg",
  },
];

function CustomerServices() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/service/${s.id}`)}
          >
            <img
              className="w-40 h-40 object-cover"
              src={s.image}
              alt={s.title}
            />
            <h3 className="font-semibold mt-2">{s.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{s.desc}</p>

            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerServices;
