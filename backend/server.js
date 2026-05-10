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
const complaintRoutes = require("./routes/complaint/complaintRoutes");
const customerRegRoutes = require("./routes/register/customerRegRoutes");
const workerRegRoutes = require("./routes/register/workerRegRoutes");

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
app.use("/complaint", complaintRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



