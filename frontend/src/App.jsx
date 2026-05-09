// import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import { Toaster } from "react-hot-toast";

// import Login from "./Pages/Login";
// import Home from "./Pages/Home";
// import CustomerRegister from "./Pages/Register/CustomerRegister";
// import ForgotPassword from "./pages/ForgotPassword";

// import WorkerRegister from "./Pages/Register/WorkerRegister";
// import ProtectedRoute from "./components/ProtectedRoute";
// import CustomerDashboard from "./Pages/Customer/CustomerDashboard";
// import ServiceProviders from "./components/customer/ServiceProviders";

// // Worker Components
// import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";
// import ActiveJobs from "./Pages/WorkersDashboard/ActiveJobs";
// import Requests from "./Pages/WorkersDashboard/Requests";
// import WorkerNavBar from "./Pages/WorkersDashboard/Navbar";
// import WorkerHeader from "./Pages/WorkersDashboard/Header";

// // Admin Components
// import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
// import AdminHeader from "./Pages/AdminDashboard/Header";
// import AdminNavBar from "./Pages/AdminDashboard/Navbar";
// import Users from "./Pages/AdminDashboard/Users";
// import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
// import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

// import "./App.css";

// /* =======================
//    Layout Components
// ======================= */

// function WorkerDashboardLayout() {
//   return (
//     <>
//       <WorkerHeader />
//       <div className="app-layout">
//         <WorkerNavBar />
//         <main className="main-content">
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// }

// function AdminDashboardLayout() {
//   return (
//     <>
//       <AdminHeader />
//       <div className="app-layout">
//         <AdminNavBar />
//         <main className="main-content">
//           <Outlet />
//         </main>
//       </div>
//     </>
//   );
// }

// /* =======================
//    Main App
// ======================= */

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Toaster position="top-right" reverseOrder={false} />

//       <Routes>
//         {/* --- Public Routes --- */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/customer-register" element={<CustomerRegister />} />
//         <Route path="/worker-register" element={<WorkerRegister />} />

//         {/* --- Customer Routes --- */}
//         <Route
//           path="/customer"
//           element={
//             <ProtectedRoute role="customer">
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/service/:id"
//           element={
//             <ProtectedRoute role="customer">
//               <ServiceProviders />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Customer */}
//         <Route
//           path="/customer/*"
//           element={
//             <ProtectedRoute role="customer">
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* --- Worker Routes (Nested) --- */}
//         <Route
//           path="/worker"
//           element={
//             <ProtectedRoute role="worker">
//               <WorkerDashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<WorkersDashboard />} />
//           <Route path="requests" element={<Requests />} />
//           <Route path="active-jobs" element={<ActiveJobs />} />
//           {/* Ensure these components exist or point to placeholders */}
//           <Route path="earnings" element={<div>Earnings Page</div>} />
//           <Route path="reviews" element={<div>Reviews Page</div>} />
//           <Route path="profile" element={<div>Profile Page</div>} />
//           <Route path="logout" element={<div>Logging out...</div>} />
//         </Route>

//         {/* --- Admin Routes (Nested) --- */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<AdminDashboard />} />
//           <Route path="users" element={<Users />} />
//           <Route path="recent-requests" element={<RecentRequests />} />
//           <Route path="recent-complaints" element={<RecentComplaints />} />
//           {/* Matching the paths used in your AdminNavBar.jsx */}
//           <Route path="active-jobs" element={<div>Admin Workers View</div>} />
//           <Route path="reviews" element={<div>Companies/Reviews View</div>} />
//           <Route path="profile" element={<div>Admin Payments/Profile</div>} />
//           <Route path="logout" element={<div>Logging out...</div>} />
//         </Route>

//         {/* --- Fallback --- */}
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

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

import WorkersDashboard from "./Pages/WorkersDashboard/Dashboard";
import ActiveJobs from "./Pages/WorkersDashboard/ActiveJobs";
import Requests from "./Pages/WorkersDashboard/Requests";
import WorkerNavBar from "./Pages/WorkersDashboard/Navbar";
import WorkerHeader from "./Pages/WorkersDashboard/Header";

/* =======================
   Admin Components
======================= */

import AdminDashboard from "./Pages/AdminDashboard/Dashboard";
import AdminHeader from "./Pages/AdminDashboard/Header";
import AdminNavBar from "./Pages/AdminDashboard/Navbar";
import Users from "./Pages/AdminDashboard/Users";
import RecentRequests from "./Pages/AdminDashboard/RecentRequests";
import RecentComplaints from "./Pages/AdminDashboard/RecentComplaints";

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

          {/* --- Customer Routes --- */}

          <Route
            path="/customer"
            element={
              <ProtectedRoute role="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

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

            <Route path="active-jobs" element={<ActiveJobs />} />

            <Route path="earnings" element={<div>Earnings Page</div>} />

            <Route path="reviews" element={<div>Reviews Page</div>} />

            <Route path="profile" element={<div>Profile Page</div>} />

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

            <Route path="active-jobs" element={<div>Admin Workers View</div>} />

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
