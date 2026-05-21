const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const workerListRoutes = require("./routes/customer/workersListRoutes");
const adminWorkerRoutes = require("./routes/admin/adminWorkerRoutes");
const bookingRoutes = require("./routes/booking/bookingRoutes");
const reviewRoutes = require("./routes/review/reviewRoutes");
const adminCustomerRoutes = require("./routes/admin/adminCustomerRoutes");
const workerRoutes = require("./routes/worker/workerRoutes");
const customercomplaintRoutes = require("./routes/complaint/customercomplaintRoutes");
const customerRegRoutes = require("./routes/register/customerRegRoutes");
const workerRegRoutes = require("./routes/register/workerRegRoutes");
const serviceRoutes = require("./routes/service/serviceRoutes");
const customerRoutes = require("./routes/customer/customerCrudRoutes");
const workercomplaintRoutes = require("./routes/complaint/workercomplaintRoutes");
const totalBookingRoutes = require("./routes/totalbookings/totalBookingRoutes");
const totalWorkerRoutes = require("./routes/totalworkers/totalWorkerRoutes");
const cancelcustomerBookingRoutes = require("./routes/cancelbooking/cancelcustomerBookingRoutes");
const customerCancelledBookingsRoutes = require("./routes/cancelbooking/customerCancelledBookingRoutes");
const workerCancelledBookingRoutes = require("./routes/cancelbooking/workerCancelledBookingRoutes");
const adminCancelledBookingRoutes =require("./routes/cancelbooking/adminCancelledBookingRoutes");
const paymentRoutes = require("./routes/payment/paymentRoutes");
const adminPaymentRoutes = require("./routes/admin/adminPaymentRoutes");
const historyRoutes = require("./routes/customer/customerHistoryRoutes");
const adminskillCertificateRoutes = require("./routes/admin/skillCertificationRoutes");
const payAdminToWorkerRoutes =require("./routes/payment/payAdminToWorkerRoutes");
const dashboardRoutes = require("./routes/customer/dashboardRoutes");
const admindashboardRoutes = require("./routes/admin/admindashboardRoutes");
const workerRecievesPaymentFromAdminRoutes =require("./routes/payment/workerRecievesPaymentFromAdminRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/",userRoutes);
app.use("/",customerRegRoutes);
app.use("/",workerRegRoutes);
app.use("/customer",workerListRoutes);  
app.use("/admin", adminWorkerRoutes);
app.use("/admin", adminCustomerRoutes);                 
app.use("/booking", bookingRoutes);
app.use("/review", reviewRoutes);
app.use("/worker", workerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/complaint",customercomplaintRoutes);
app.use("/service", serviceRoutes);
app.use("/customer", customerRoutes);
app.use("/complaint", workercomplaintRoutes);
app.use("/bookings", totalBookingRoutes);
app.use("/workers", totalWorkerRoutes);
app.use("/booking", cancelcustomerBookingRoutes);
app.use("/booking", customerCancelledBookingsRoutes);
app.use("/booking", workerCancelledBookingRoutes);
app.use("/booking", adminCancelledBookingRoutes);
app.use("/payment", paymentRoutes);
app.use( "/admin",adminPaymentRoutes);
app.use("/customer", historyRoutes);
app.use( "/admin",adminskillCertificateRoutes);
app.use("/admin",payAdminToWorkerRoutes);
app.use("/customer", dashboardRoutes);
app.use("/admin", admindashboardRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



