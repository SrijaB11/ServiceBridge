import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";

// Admin Dashboard Components
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

import "./App.css";

// --- LAYOUT COMPONENTS ---
// Using <Outlet /> tells React Router where to render the child components

function WorkerDashboardLayout() {
  return (
    <>
      <Header />
      <div className="app-layout">
        <NavBar />
        <main className="main-content">
          <Outlet /> 
        </main>
      </div>
    </>
  );
}

function AdminDashboardLayout() {
  return (
    <>
      <AdminHeader />
      <div className="app-layout">
        <AdminNavBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

// --- MAIN APP COMPONENT ---

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
        <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/service/:id" element={<ProtectedRoute role="customer"><ServiceProviders /></ProtectedRoute>} />

        {/* Worker Dashboard (Nested) */}
        <Route
          path="/worker"
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* path="index" matches exactly "/worker" */}
          <Route index element={<WorkersDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="active-jobs" element={<ActiveJobs />} />
        </Route>

        {/* Admin Dashboard (Nested) */}
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

        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}