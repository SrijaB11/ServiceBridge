import { NavLink, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className={styles["navbar-container1"]}>
      <div className={styles["navbar-container2"]}>
        <img
          src="/images/service-bridge-logo.png"
          alt="logo"
          className={styles["webiste-logo"]}
        />

        <div>
          <h1 className={styles["navbar-title"]}>Service Bridge</h1>
          <p className={styles["navbar-prfile"]}>Admin</p>
        </div>
      </div>

      <ul className={styles["navbar-list"]}>
        <li className={styles["navbar-list-items"]}>
          <NavLink
            end
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/dashboard.png"
              alt="dashboard"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Dashboard</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/users.png"
              alt="total users"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Users</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/admin/workers"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/workers.png"
              alt="workers"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Workers</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/admin/recent-requests"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/requests.png"
              alt="requests"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Requests</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/admin/recent-complaints"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/complaints.png"
              alt="complaints"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Complaints</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <button
            onClick={handleLogout}
            className={`${styles["navbar-tabs-container"]} ${styles["logout-btn"]}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <img
              src="/images/logout.png"
              alt="logout"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Logout</p>
          </button>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/admin/workers/verification"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/verification.png"
              alt="verification"
              className={styles["navbar-logo"]}
            />

            <p className={styles["tab-name"]}>Verification</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavBar;