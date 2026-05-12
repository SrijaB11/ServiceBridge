import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

/* =======================
   Lazy Loaded Public + Customer
======================= */

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

const CustomerRegister = lazy(
  () => import("./Pages/Register/CustomerRegister")
);

const WorkerRegister = lazy(
  () => import("./Pages/Register/WorkerRegister")
);

const ForgotPassword = lazy(
  () => import("./Pages/ForgotPassword")
);

const CustomerDashboard = lazy(
  () => import("./Pages/Customer/CustomerDashboard")
);

const ServiceProviders = lazy(
  () => import("./components/customer/ServiceProviders")
);

/* =======================
   Worker Components
======================= */

import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";
import History from "./Pages/WorkersDashboard/History";
import Requests from "./Pages/WorkersDashboard/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar";
import WorkerHeader from "./Pages/WorkersDashboard/Header";
import Reviews from "./Pages/WorkersDashboard/Reviews";
import Profile from "./Pages/WorkersDashboard/Profile";

/* =======================
   Admin Components
======================= */

import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

import Worker from "./Pages/AdminDashboard/Worker";
import WorkerVerification from "./Pages/AdminDashboard/Certifications";

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

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* =======================
              Public Routes
          ======================= */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/customer-register"
            element={<CustomerRegister />}
          />

          <Route
            path="/worker-register"
            element={<WorkerRegister />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          {/* =======================
              Customer Routes
          ======================= */}

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

          {/* =======================
              Worker Routes
          ======================= */}

          <Route
            path="/worker"
            element={
              <ProtectedRoute role="worker">
                <WorkerDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkersDashboard />} />

            <Route
              path="requests"
              element={<Requests />}
            />

            <Route
              path="history"
              element={<History />}
            />

            <Route
              path="earnings"
              element={<div>Earnings Page</div>}
            />

            <Route
              path="reviews"
              element={<Reviews />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

            <Route
              path="logout"
              element={<div>Logging out...</div>}
            />
          </Route>

          {/* =======================
              Admin Routes
          ======================= */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="users"
              element={<Users />}
            />

            <Route
              path="recent-requests"
              element={<RecentRequests />}
            />

            <Route
              path="recent-complaints"
              element={<RecentComplaints />}
            />

            <Route
              path="workers"
              element={<Worker />}
            />

            <Route
              path="workers/verification"
              element={<WorkerVerification />}
            />

            <Route
              path="reviews"
              element={<div>Companies/Reviews View</div>}
            />

            <Route
              path="profile"
              element={<div>Admin Payments/Profile</div>}
            />

            <Route
              path="logout"
              element={<div>Logging out...</div>}
            />
          </Route>

          {/* =======================
              Fallback Route
          ======================= */}

          <Route
            path="*"
            element={<div>404 - Page Not Found</div>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}