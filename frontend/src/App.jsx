import React from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Landing/Home";
import CustomerDashboard from "./Pages/Customer/CustomerDashboard"

function App() {
  return (
    <div>
      <Register />
      <Login />
      {/* <Home /> */}
    </div>
  );
}

export default App;
