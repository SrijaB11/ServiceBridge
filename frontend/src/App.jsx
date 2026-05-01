import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";
import ServiceProviders from "./components/customer/ServiceProviders";

// Worker Components
import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";
import ActiveJobs from "./Pages/WorkersDashboard/ActiveJobs";
import Requests from "./Pages/WorkersDashboard/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar";
import WorkerHeader from "./Pages/WorkersDashboard/Header";

// Admin Components
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

import "./App.css";

/* =======================
   Worker Layout
======================= */
function WorkerDashboardLayout() {
  return (
    <>
      <WorkerHeader />
      <div className="app-layout">
        <WorkerNavBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

/* =======================
   Admin Layout
======================= */
function AdminDashboardLayout() {
  return (
    <>
      <AdminHeader />
      <div className="app-layout">
        <AdminNavBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

/* =======================
   Main App
======================= */
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer */}
        <Route
          path="/customer/*"
          element={
            <ProtectedRoute role="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/service/:id"
          element={
            <ProtectedRoute role="customer">
              <ServiceProviders />
            </ProtectedRoute>
          }
        />

        {/* Worker */}
        <Route
          path="/worker"
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<WorkersDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="active-jobs" element={<ActiveJobs />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="recent-requests" element={<RecentRequests />} />
          <Route path="recent-complaints" element={<RecentComplaints />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
