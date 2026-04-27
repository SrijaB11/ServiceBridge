const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
<<<<<<< HEAD
const workerRoutes = require("./routes/customer/workersListRoutes");
=======
const adminWorkerRoutes = require("./routes/adminWorkerRoutes");
>>>>>>> 4175edaccfb49ec90591fc9fe4b733af5fbe3960

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use("/",userRoutes);
app.use("/customer",workerRoutes)
=======
>>>>>>> 4175edaccfb49ec90591fc9fe4b733af5fbe3960

app.use(cors());
app.use(express.json()); 

app.use("/", userRoutes);
app.use("/admin", adminWorkerRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});