import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

const WorkerNavBar = () => {
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
          <p className="navbar-prfile">Worker</p>
        </div>
      </div>
      <ul className="navbar-list">
        <li className="navbar-list-items">
          {/* Use 'end' on the base path so it doesn't stay highlighted when on sub-routes */}
          <NavLink 
            end 
            to="/worker" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/dashboard.png" alt="dashboard" className="navbar-logo" />
            <p className="tab-name">Dashboard</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          <NavLink 
            to="/worker/requests" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/requests.png" alt="requests" className="navbar-logo" />
            <p className="tab-name">Requests</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          <NavLink 
            to="/worker/history" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/active jobs.png" alt="active jobs" className="navbar-logo" />
            <p className="tab-name">History</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          <NavLink 
            to="/worker/earnings" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/earnings-image.png" alt="earnings" className="navbar-logo" />
            <p className="tab-name">Earnings</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          <NavLink 
            to="/worker/reviews" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/reviews.png" alt="reviews" className="navbar-logo" />
            <p className="tab-name">Reviews</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          <NavLink 
            to="/worker/profile" 
            className={({ isActive }) => isActive ? "navbar-tabs-container active" : "navbar-tabs-container"}
          >
            <img src="/images/profile-img.png" alt="profile" className="navbar-logo" />
            <p className="tab-name">Profile</p>
          </NavLink>
        </li>

        <li className="navbar-list-items">
          {/* Changed from Link to button for functional logout */}
          <button 
            onClick={handleLogout} 
            className="navbar-tabs-container logout-button-style"
            style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', padding: 0 }}
          >
            <img src="/images/logout.png" alt="logout" className="navbar-logo" />
            <p className="tab-name">Logout</p>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default WorkerNavBar;