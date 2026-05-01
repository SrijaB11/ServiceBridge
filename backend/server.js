const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const workerListRoutes = require("./routes/customer/workersListRoutes");
const adminWorkerRoutes = require("./routes/admin/adminWorkerRoutes");
const bookingRoutes = require("./routes/booking/bookingRoutes");
const reviewRoutes = require("./routes/review/reviewRoutes");
const adminCustomerRoutes = require("./routes/admin/adminCustomerRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/",userRoutes);
app.use("/customer",workerListRoutes);
app.use("/admin", adminWorkerRoutes);
app.use("/admin", adminCustomerRoutes);                 
app.use("/booking", bookingRoutes);
app.use("/review", reviewRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});



