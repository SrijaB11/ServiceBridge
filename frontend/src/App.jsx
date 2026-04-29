import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register/Register";
<<<<<<< HEAD

=======
>>>>>>> b4004d8702180320b1af92d2a07fb7c0138093c9
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";

import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import ServiceProviders from "./components/customer/ServiceProviders";

// Worker Dashboard Components
import WorkerNavBar from "./components/WorkersDashboard/Navbar";
import WorkerHeader from "./components/WorkersDashboard/Header";
import WorkersDashboard from "./components/WorkersDashboard/Dashboard";
import Requests from "./components/WorkersDashboard/Requests";
import ActiveJobs from "./components/WorkersDashboard/ActiveJobs";

// Admin Dashboard Components
import AdminNavBar from "./components/AdminDashboard/Navbar";
import AdminHeader from "./components/AdminDashboard/Header";
import AdminDashboard from "./components/AdminDashboard/Dashboard";
import Users from "./components/AdminDashboard/Users";
import RecentRequests from "./components/AdminDashboard/RecentRequests";
import RecentComplaints from "./components/AdminDashboard/RecentComplaints";

import "./App.css";

// Worker Dashboard Layout Component
function WorkerDashboardLayout() {
  return (
    <>
      <WorkerHeader />
      <div className="app-layout">
        <WorkerNavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<WorkersDashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/active-jobs" element={<ActiveJobs />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

// Admin Dashboard Layout Component
function AdminDashboardLayout() {
  return (
    <>
      <AdminHeader />
      <div className="app-layout">
        <AdminNavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/recent-requests" element={<RecentRequests />} />
            <Route path="/recent-complaints" element={<RecentComplaints />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Dashboard */}
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

        {/* Worker Dashboard with nested routes */}
        <Route
          path="/worker/*"
          element={
            <ProtectedRoute role="worker">
<<<<<<< HEAD
              <WorkersDashboard />
=======
              <WorkerDashboardLayout />
>>>>>>> b4004d8702180320b1af92d2a07fb7c0138093c9
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}