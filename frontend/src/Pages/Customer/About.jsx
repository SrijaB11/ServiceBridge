import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          About Service Bridge
        </h1>

        <p className="text-gray-600 leading-relaxed mb-4">
          Service Bridge is a modern platform that connects customers with
          trusted professionals such as plumbers, electricians, cleaners,
          carpenters, and more.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          Our goal is to make home services simple, fast, and reliable by
          providing verified workers, transparent pricing, and easy booking.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          We ensure quality service, on-time delivery, and customer satisfaction
          through a seamless digital experience.
        </p>

        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Service Bridge. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default About;
