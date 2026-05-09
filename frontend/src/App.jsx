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
import History from "./Pages/WorkersDashboard/History";
import Requests from "./Pages/WorkersDashboard/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar";
import WorkerHeader from "./Pages/WorkersDashboard/Header";
import Reviews from "./Pages/WorkersDashboard/Reviews";
import Profile from "./Pages/WorkersDashboard/Profile";

// Admin Components
import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

// Worker Management Components
import Worker from "./Pages/AdminDashboard/Worker";
import WorkerVerification from "./Pages/AdminDashboard/Certifications";

import "./App.css";

/* =======================
   Layout Components
======================= */
function WorkerDashboardLayout() {
  return (
    <>
      <WorkerHeader />
      <div className="app-layout">
        <WorkerNavBar />
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

/* =======================
   Main App
======================= */
export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Customer Routes --- */}
        <Route
          path="/customer"
          element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>}
        />
        <Route
          path="/service/:id"
          element={<ProtectedRoute role="customer"><ServiceProviders /></ProtectedRoute>}
        />

        {/* --- Worker Routes --- */}
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
          <Route path="history" element={<History />} />
          <Route path="earnings" element={<div>Earnings Page</div>} />
          <Route path="reviews" element={<Reviews/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="logout" element={<div>Logging out...</div>} />
        </Route>

        {/* --- Admin Routes --- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="recent-requests" element={<RecentRequests />} />
          <Route path="recent-complaints" element={<RecentComplaints />} />

          {/* Workers Management */}
          <Route path="workers" element={<Worker />} />
          
          {/* Document Verification - New Route */}
          <Route path="workers/verification" element={<WorkerVerification />} />

          <Route path="history" element={<Worker />} />

          <Route path="reviews" element={<div>Companies/Reviews View</div>} />
          <Route path="profile" element={<div>Admin Payments/Profile</div>} />
          <Route path="logout" element={<div>Logging out...</div>} />
        </Route>

        {/* --- Fallback --- */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}