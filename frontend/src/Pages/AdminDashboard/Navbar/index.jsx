import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar-container1">
      <div className="navbar-container2">
        <img src="/images/service-bridge-logo.png" alt="logo" className="webiste-logo" />
        <div>
          <h1 className="navbar-title">Service Bridge</h1>
          <p className="navbar-prfile">Admin</p>
        </div>
      </div>
      <ul className="navbar-list">
        <li className="navbar-list-items">
          {/* end ensures the 'active' class only applies to /admin, not /admin/users */}
          <NavLink end to="/admin" className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}>
            <img src="/images/dashboard.png" alt="dashboard" className="navbar-logo" />
            <p className="tab-name">Dashboard</p>
          </NavLink>
        </li>
        <li className="navbar-list-items">
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}>
            <img src="/images/users.png" alt="total users" className="navbar-logo" />
            <p className="tab-name">Users</p>
          </NavLink>
        </li>
        <li className="navbar-list-items">
          <NavLink to="/admin/recent-requests" className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}>
            <img src="/images/requests.png" alt="requests" className="navbar-logo" />
            <p className="tab-name">Requests</p>
          </NavLink>
        </li>
        
        {/* LOGOUT BUTTON */}
        <li className="navbar-list-items">
          <button onClick={handleLogout} className="navbar-tabs-container logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <img src="/images/logout.png" alt="logout" className="navbar-logo" />
            <p className="tab-name">Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;