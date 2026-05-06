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
<<<<<<< HEAD
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
=======
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

import "./App.css";

<<<<<<< HEAD
// --- LAYOUT COMPONENTS ---
// Using <Outlet /> tells React Router where to render the child components

=======
/* =======================
   Worker Layout
======================= */
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
function WorkerDashboardLayout() {
  return (
    <>
      <WorkerHeader />
      <div className="app-layout">
<<<<<<< HEAD
        <NavBar />
        <main className="main-content">
          <Outlet /> 
        </main>
=======
        <WorkerNavBar />
        <div className="main-content">
          <Outlet />
        </div>
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
      </div>
    </>
  );
}

<<<<<<< HEAD
=======
/* =======================
   Admin Layout
======================= */
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
function AdminDashboardLayout() {
  return (
    <>
      <AdminHeader />
      <div className="app-layout">
        <AdminNavBar />
<<<<<<< HEAD
        <main className="main-content">
          <Outlet />
        </main>
=======
        <div className="main-content">
          <Outlet />
        </div>
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
      </div>
    </>
  );
}

<<<<<<< HEAD
// --- MAIN APP COMPONENT ---

=======
/* =======================
   Main App
======================= */
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

<<<<<<< HEAD
        {/* Customer Dashboard */}
        <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/service/:id" element={<ProtectedRoute role="customer"><ServiceProviders /></ProtectedRoute>} />

        {/* Worker Dashboard (Nested) */}
=======
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
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
        <Route
          path="/worker"
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboardLayout />
            </ProtectedRoute>
          }
        >
<<<<<<< HEAD
          {/* path="index" matches exactly "/worker" */}
=======
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
          <Route index element={<WorkersDashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="active-jobs" element={<ActiveJobs />} />
        </Route>

<<<<<<< HEAD
        {/* Admin Dashboard (Nested) */}
=======
        {/* Admin */}
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
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
<<<<<<< HEAD

        {/* Fallback Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
=======
>>>>>>> 1901290dc02167af6e44f0098f9f75b7b7988137
      </Routes>
    </BrowserRouter>
  );
}