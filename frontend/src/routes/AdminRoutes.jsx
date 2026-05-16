import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "../components/admin/AdminLayout";

import AdminDashboard from "../Pages/admin/AdminDashboard";
import Workers from "../Pages/admin/Workers";
import Customers from "../Pages/admin/Customers";
import Bookings from "../Pages/admin/Bookings";
import Payments from "../Pages/admin/Payments";
import Complaints from "../Pages/admin/Complaints";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* PARENT LAYOUT */}
      <Route path="/" element={<AdminLayout />}>
        {/* DEFAULT /admin */}
        <Route index element={<AdminDashboard />} />

        {/* CHILD ROUTES */}
        <Route path="workers" element={<Workers />} />
        <Route path="customers" element={<Customers />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="payments" element={<Payments />} />
        <Route path="complaints" element={<Complaints />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
