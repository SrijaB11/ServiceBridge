import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CustomerDashboard from "../Pages/Customer/CustomerDashboard";

import DashboardHome from "../components/customer/DashboardHome";
import CustomerServices from "../components/customer/CustomerServices";
import Bookings from "../components/customer/Bookings";
import History from "../components/customer/History";
import Profile from "../components/customer/Profile";

import Complaint from "../Pages/Customer/Complaint";
import ComplaintPage from "../components/customer/ComplaintPage";
import ServiceProviders from "../components/customer/ServiceProviders";
import BookWorkerPage from "../components/customer/BookWorkerPage";

export default function CustomerRoutes() {
  return (
    <>
      {/* Main dashboard layout routes */}
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

      {/* standalone customer routes */}
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
        path="/complaints"
        element={
          <ProtectedRoute role="customer">
            <Complaint />
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
    </>
  );
}
