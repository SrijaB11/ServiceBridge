import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Complaint from "./Pages/Customer/Complaint";
import "./App.css";

/* =======================
   Lazy Loaded Public + Customer
======================= */

const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));

const CustomerRegister = lazy(
  () => import("./Pages/Register/CustomerRegister"),
);

const WorkerRegister = lazy(() => import("./Pages/Register/WorkerRegister"));

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

const CustomerDashboard = lazy(
  () => import("./Pages/Customer/CustomerDashboard"),
);

const ServiceProviders = lazy(
  () => import("./components/customer/ServiceProviders"),
);

/* =======================
   Worker Components
======================= */

import WorkerDashboard from "./Pages/WorkersDashboard/Dashboard/WorkerDashboard";
// import History from "./Pages/WorkersDashboard/History";
import Requests from "./Pages/WorkersDashboard/Requests/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar/WorkerNavbar";
import WorkerProfile from "./Pages/WorkersDashboard/Profile/WorkerProfile";
import WorkerHeader from "./Pages/WorkersDashboard/Header/WorkerHeader";

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

import Worker from "./Pages/AdminDashboard/Worker";
import Certifications from "./Pages/AdminDashboard/Certifications";

import ComplaintPage from "./components/customer/ComplaintPage";
import DashboardHome from "./components/customer/DashboardHome";
import CustomerServices from "./components/customer/CustomerServices";
import Bookings from "./components/customer/Bookings";
import History from "./components/customer/History";
import Profile from "./components/customer/Profile";
import BookWorkerPage from "./components/customer/BookWorkerPage";
import WorkerHistory from "./Pages/WorkersDashboard/History/WorkerHistory";
import About from "./Pages/Customer/About";
import PaymentPage from "./components/customer/PaymentPage";

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
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/customer-register" element={<CustomerRegister />} />

          <Route path="/worker-register" element={<WorkerRegister />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />

          {/* --- Customer Routes --- */}

          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />

            <Route path="services" element={<CustomerServices />} />

            <Route path="bookings" element={<Bookings />} />

            <Route path="history" element={<History />} />

            <Route path="complaints" element={<Complaint />} />

            <Route path="profile" element={<Profile />} />
          </Route>

          <Route
            path="/service/:id"
            element={
              <ProtectedRoute role="customer">
                <ServiceProviders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/complaint/:bookingId"
            element={
              <ProtectedRoute role="customer">
                <ComplaintPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-complaints"
            element={
              <ProtectedRoute role="customer">
                <Complaint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <ProtectedRoute role="customer">
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-worker/:workerId"
            element={
              <ProtectedRoute role="customer">
                <BookWorkerPage />
              </ProtectedRoute>
            }
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
            <Route index element={<WorkerDashboard />} />

            <Route path="requests" element={<Requests />} />

            <Route path="history" element={<WorkerHistory />} />

            {/* <Route path="earnings" element={<div>Earnings Page</div>} /> */}

            {/* <Route path="reviews" element={<div>Reviews Page</div>} /> */}

            <Route path="profile" element={<WorkerProfile />} />

            {/* <Route path="logout" element={<div>Logging out...</div>} /> */}
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

            <Route
              path="customer-complaints"
              element={<CustomerComplaints />}
            />

            <Route path="worker-complaints" element={<WorkerComplaints />} />

            <Route path="workers" element={<Worker />} />

            <Route path="workers/verification" element={<Certifications />} />

            <Route path="reviews" element={<div>Companies/Reviews View</div>} />

            <Route path="profile" element={<div>Admin Payments/Profile</div>} />

            <Route path="logout" element={<div>Logging out...</div>} />
          </Route>

          {/* --- Fallback --- */}

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
