import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard";

import ServiceProviders from "./components/customer/ServiceProviders";

// Worker Dashboard Components

import ActiveJobs from "./Pages/WorkersDashboard/ActiveJobs";
import NavBar from "./Pages/WorkersDashboard/Navbar";
import Header from "./Pages/WorkersDashboard/Header";
import Requests from "./Pages/WorkersDashboard/Requests";

// Admin Dashboard Components
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import AdminHeader from "./Pages/AdminDashboard/Header";

import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

import "./App.css";

// Worker Dashboard Layout Component
function WorkerDashboardLayout() {
  return (
    <>
      <Header />
      <div className="app-layout">
        <NavBar />
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
          path="/"
          element={
            <ProtectedRoute role="worker">
              <WorkersDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/"
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
