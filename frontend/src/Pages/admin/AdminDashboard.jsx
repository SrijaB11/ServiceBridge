// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardStats } from "../../redux/dashboard/dashboardSlice";
// import StatsCards from "../../components/admin/StatsCards";
// import DashboardCharts from "../../components/admin/DashboardCharts";
// import RecentBookings from "../../components/admin/RecentBookings";

// const AdminDashboard = () => {
//   const dispatch = useDispatch();

//   const { stats, loading, error } = useSelector((state) => state.dashboard);

//   useEffect(() => {
//     dispatch(fetchDashboardStats());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen text-lg">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-500 p-4">Error: {error}</div>;
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <p className="text-gray-500 text-sm">Overview of system activity</p>
//       </div>

//       {/* Stats Cards */}
//       <StatsCards stats={stats} />

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <DashboardCharts stats={stats} />
//         <RecentBookings />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Admin Dashboard (Static)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 shadow rounded">
          <h2>Total Customers</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2>Total Workers</h2>
          <p className="text-2xl font-bold">45</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2>Bookings</h2>
          <p className="text-2xl font-bold">87</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
