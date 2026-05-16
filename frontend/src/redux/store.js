import { configureStore } from "@reduxjs/toolkit";

// SLICES
import dashboardReducer from "./dashboard/dashboardSlice";
import workerReducer from "./workers/workerSlice";
import customerReducer from "./customers/customerSlice";
import bookingReducer from "./bookings/bookingSlice";
import paymentReducer from "./payments/paymentSlice";
import complaintReducer from "./complaints/complaintSlice";
const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    workers: workerReducer,
    customers: customerReducer,
    bookings: bookingReducer,
    payments: paymentReducer,
    complaints: complaintReducer,
  },

  //   // optional (helps debugging)
  //   devTools: process.env.NODE_ENV !== "production",
});
export default store;
