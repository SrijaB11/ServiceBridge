import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    image: "/images/services/cleaning.jpg",
  },
  { id: "plumbing", title: "Plumbing", image: "/images/services/plumber.jpg" },
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

              <h3>{service.title}</h3>

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
