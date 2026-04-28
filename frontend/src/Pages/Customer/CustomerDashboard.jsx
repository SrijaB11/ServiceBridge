import React, { useState } from "react";
import Sidebar from "../../components/customer/Sidebar";
import DashboardHome from "../../components/customer/DashboardHome";
import Bookings from "../../components/customer/Bookings";
import History from "../../components/customer/History";
import Profile from "../../components/customer/Profile";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "bookings":
        return <Bookings />;
      case "history":
        return <History />;
      case "profile":
        return <Profile />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar setActiveTab={setActiveTab} />

      <div className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}

export default CustomerDashboard;
