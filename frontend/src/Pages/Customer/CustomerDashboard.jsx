import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../../components/customer/Sidebar";
import PrimarySearchAppBar from "../../components/customer/PrimarySearchAppBar";

function CustomerDashboard() {
  const [searchService, setSearchService] = useState("");

  const location = useLocation();

  // GET CURRENT PAGE NAME
  const currentTab = location.pathname.split("/")[2] || "dashboard";

  return (
    <div>
      <PrimarySearchAppBar setSearchService={setSearchService} />

      <div className="min-h-screen flex bg-gray-100">
        <Sidebar activeTab={currentTab} />

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold capitalize">{currentTab}</h1>
          </div>

          <Outlet context={{ searchService }} />
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
