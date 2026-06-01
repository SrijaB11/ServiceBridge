import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

import Review from "./pages/Customer/Review";
import "./App.css";

/* =======================
   Lazy Loaded Public + Customer
======================= */

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

const CustomerRegister = lazy(
  () => import("./Pages/Register/CustomerRegister"),
);
const About = lazy(() => import("./Pages/Customer/About"));
const WorkerRegister = lazy(() => import("./Pages/Register/WorkerRegister"));

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

/* =======================
   Worker Components
======================= */

import WorkerDashboard from "./Pages/WorkersDashboard/Dashboard/WorkerDashboard";
import WorkerEarnings from "./Pages/WorkersDashboard/Earnings/WorkerEarnings";
import Requests from "./Pages/WorkersDashboard/Requests/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar/WorkerNavbar";
import WorkerProfile from "./Pages/WorkersDashboard/Profile/WorkerProfile";
import WorkerHeader from "./Pages/WorkersDashboard/Header/WorkerHeader";
import WorkerHistory from "./Pages/WorkersDashboard/History/WorkerHistory";
import WorkerComplaintPage from "./Pages/WorkersDashboard/Complaints/WorkerComplaints";
import WorkerComplaintsPage from "./Pages/WorkersDashboard/Complaints/WorkerComplaintsPage";

/* =======================
   Admin Components
======================= */

import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import CustomerComplaints from "./Pages/AdminDashboard/CustomerComplaints";
import WorkerComplaints from "./Pages/AdminDashboard/WorkerComplaints";
import CustomerPayments from "./Pages/AdminDashboard/CustomerPayments";

import Worker from "./Pages/AdminDashboard/Worker";
import Certifications from "./Pages/AdminDashboard/Certifications";

import PageNotFound from "./Pages/Customer/PageNotFound";
import { CustomerRoutes } from "./routes/CustomerRoutes";

/* =======================
   Loading Component
======================= */

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="h-10 w-10 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
    </div>
  );
}

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

//admin//

/* =======================
   Main App
======================= */

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-register" element={<CustomerRegister />} />
          <Route path="/worker-register" element={<WorkerRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />

          {/* Customer Routes */}
          {CustomerRoutes}

          {/* Worker Routes */}
          <Route
            path="/worker"
            element={
              <ProtectedRoute role="worker">
                <WorkerDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<WorkerDashboard />} />
            <Route path="requests" element={<Requests />} />
            <Route path="history" element={<WorkerHistory />} />
            <Route path="earnings" element={<WorkerEarnings />} />
            <Route
              path="complaint/:bookingId"
              element={<WorkerComplaintPage />}
            />
            <Route path="complaints" element={<WorkerComplaintsPage />} />
            <Route path="profile" element={<WorkerProfile />} />
          </Route>

          {/* Admin Routes */}
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
            <Route
              path="customer-complaints"
              element={<CustomerComplaints />}
            />
            <Route path="worker-complaints" element={<WorkerComplaints />} />
            <Route path="workers" element={<Worker />} />
            <Route path="workers/verification" element={<Certifications />} />
            <Route path="customer-payments" element={<CustomerPayments />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
