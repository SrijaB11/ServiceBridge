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
    id: 2,
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 border">
              <img src={service.image} alt={service.title} />

              <h3 className="mt-2 font-semibold">{service.title}</h3>

              <button
                onClick={() => navigate(`/service/${service.id}`)}
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
              >
                Book Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerServices;
