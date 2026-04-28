const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const workerListRoutes = require("./routes/customer/workersListRoutes");
const adminWorkerRoutes = require("./routes/adminWorkerRoutes");



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/",userRoutes);
app.use("/customer",workerListRoutes);
app.use("/admin", adminWorkerRoutes);




app.listen(5000, () => {
  console.log("Server running on port 5000");
});