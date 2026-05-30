import React, { memo } from "react";
import CustomerServices from "./CustomerServices";
import DashboardStats from "./DashboardStats";

function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Service Bridge
          </h1>

          <p className="text-gray-500 mt-1">
            Book trusted professionals for your daily needs
          </p>
        </div>

        {/* QUICK STATS */}
        <DashboardStats />

        {/* SERVICES */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Explore Services</h2>

        <CustomerServices />
      </div>
    </div>
  );
}

export default memo(DashboardHome);
