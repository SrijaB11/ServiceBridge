// import { Route } from "react-router-dom";

// import ProtectedRoute from "../components/ProtectedRoute";

// import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
// import DashboardHome from "../components/customer/DashboardHome";
// import CustomerServices from "../components/customer/CustomerServices";
// import Bookings from "../components/customer/Bookings";
// import History from "../components/customer/History";
// import Profile from "../components/customer/Profile";
// import ServiceProviders from "../components/customer/ServiceProviders";
// import BookWorkerPage from "../components/customer/BookWorkerPage";
// import ComplaintPage from "../components/customer/ComplaintPage";

// import Complaint from "../Pages/Customer/Complaint";
// import Review from "../pages/Customer/Review";
// import PaymentPage from "../Pages/PaymentPage";

// export default function CustomerRoutes() {
//   return (
//     <>
//       <Route
//         path="/customer"
//         element={
//           <ProtectedRoute role="customer">
//             <CustomerDashboard />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<DashboardHome />} />

//         <Route path="services" element={<CustomerServices />} />

//         <Route path="bookings" element={<Bookings />} />

//         <Route path="payment" element={<PaymentPage />} />

//         <Route path="history" element={<History />} />

//         <Route path="complaints" element={<Complaint />} />

//         <Route path="profile" element={<Profile />} />

//         <Route path="review" element={<Review />} />
//       </Route>

//       <Route
//         path="/service/:id"
//         element={
//           <ProtectedRoute role="customer">
//             <ServiceProviders />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/book-worker/:workerId"
//         element={
//           <ProtectedRoute role="customer">
//             <BookWorkerPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/complaint/:bookingId"
//         element={
//           <ProtectedRoute role="customer">
//             <ComplaintPage />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/customer-complaints"
//         element={
//           <ProtectedRoute role="customer">
//             <Complaint />
//           </ProtectedRoute>
//         }
//       />
//     </>
//   );
// }
import { Route, Outlet } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import CustomerDashboard from "../Pages/Customer/CustomerDashboard";
import DashboardHome from "../components/customer/DashboardHome";
import CustomerServices from "../components/customer/CustomerServices";
import Bookings from "../components/customer/Bookings";
import History from "../components/customer/History";
import Profile from "../components/customer/Profile";
import ServiceProviders from "../components/customer/ServiceProviders";
import BookWorkerPage from "../components/customer/BookWorkerPage";
import ComplaintPage from "../components/customer/ComplaintPage";

import Complaint from "../Pages/Customer/Complaint";
import Review from "../pages/Customer/Review";
import PaymentPage from "../Pages/PaymentPage";

function CustomerProtectedLayout() {
  return (
    <ProtectedRoute role="customer">
      <Outlet />
    </ProtectedRoute>
  );
}

export const CustomerRoutes = (
  <>
    {/* Customer Dashboard */}
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
      <Route path="payment" element={<PaymentPage />} />
      <Route path="history" element={<History />} />
      <Route path="complaints" element={<Complaint />} />
      <Route path="profile" element={<Profile />} />
      <Route path="review" element={<Review />} />
    </Route>

    {/* Other Customer Protected Routes */}
    <Route element={<CustomerProtectedLayout />}>
      <Route path="/service/:id" element={<ServiceProviders />} />

      <Route path="/book-worker/:workerId" element={<BookWorkerPage />} />

      <Route path="/complaint/:bookingId" element={<ComplaintPage />} />

      <Route path="/customer-complaints" element={<Complaint />} />
    </Route>
  </>
);
