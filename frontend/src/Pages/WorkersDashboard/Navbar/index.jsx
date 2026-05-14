import { NavLink, useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const WorkerNavBar = () => {
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
          <p className={styles["navbar-prfile"]}>Worker</p>
        </div>
      </div>

      <ul className={styles["navbar-list"]}>
        <li className={styles["navbar-list-items"]}>
          <NavLink
            end
            to="/worker"
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
            to="/worker/requests"
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
            to="/worker/history"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/active jobs.png"
              alt="active jobs"
              className={styles["navbar-logo"]}
            />
            <p className={styles["tab-name"]}>History</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/worker/earnings"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/earnings-image.png"
              alt="earnings"
              className={styles["navbar-logo"]}
            />
            <p className={styles["tab-name"]}>Earnings</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/worker/reviews"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/reviews.png"
              alt="reviews"
              className={styles["navbar-logo"]}
            />
            <p className={styles["tab-name"]}>Reviews</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <NavLink
            to="/worker/profile"
            className={({ isActive }) =>
              isActive
                ? `${styles["navbar-tabs-container"]} ${styles.active}`
                : styles["navbar-tabs-container"]
            }
          >
            <img
              src="/images/profile-img.png"
              alt="profile"
              className={styles["navbar-logo"]}
            />
            <p className={styles["tab-name"]}>Profile</p>
          </NavLink>
        </li>

        <li className={styles["navbar-list-items"]}>
          <button
            onClick={handleLogout}
            className={styles["navbar-tabs-container"]}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              cursor: "pointer",
              textAlign: "left",
              padding: 0
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
      </ul>
    </nav>
  );
};

export default WorkerNavBar;