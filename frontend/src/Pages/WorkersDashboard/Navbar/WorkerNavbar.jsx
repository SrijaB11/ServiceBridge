import React, {
  useEffect,
  useState,
} from "react";

import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  IndianRupee,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileWarning,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";

import styles from "./WorkerNavbar.module.css";

function WorkerNavbar() {
  const [collapsed, setCollapsed] =
    useState(false);

  const [worker, setWorker] =
    useState({});

  const navigate = useNavigate();

  const location = useLocation();

  // MENU ITEMS

  const menuItems = [
    {
      name: "Dashboard",
      path: "/worker",
      icon: (
        <LayoutDashboard size={20} />
      ),
    },

    {
      name: "History",
      path: "/worker/history",
      icon: (
        <Briefcase size={20} />
      ),
    },

    {
      name: "Requests",
      path: "/worker/requests",
      icon: (
        <ClipboardList size={20} />
      ),
    },

    {
      name: "Earnings",
      path: "/worker/earnings",
      icon: (
        <IndianRupee size={20} />
      ),
    },

    {
      name: "Complaints",
      path: "/worker/complaints",
      icon: (
        <FileWarning size={20} />
      ),
    },

    {
      name: "Profile",
      path: "/worker/profile",
      icon: <User size={20} />,
    },
  ];

  // FETCH WORKER DATA

  const fetchWorkerData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/worker/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorker(
        response.data.data
      );

    } catch (error) {

      console.log(
        "Navbar Fetch Error",
        error
      );
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, []);

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        collapsed
          ? styles.collapsed
          : styles.expanded
      }`}
    >
      {/* TOP SECTION */}

      <div>
        {/* HEADER */}

        <div
          className={styles.header}
        >
          {!collapsed && (
            <div
              className={
                styles.logoContainer
              }
            >
              
            </div>
          )}

          <button
            onClick={() =>
              setCollapsed(
                !collapsed
              )
            }
            className={
              styles.toggleButton
            }
          >
            {collapsed ? (
              <ChevronRight
                size={18}
              />
            ) : (
              <ChevronLeft
                size={18}
              />
            )}
          </button>
        </div>

        {/* MENU */}

        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() =>
                navigate(item.path)
              }
              className={`${
                styles.menuItem
              } ${
                location.pathname ===
                item.path
                  ? styles.active
                  : ""
              }`}
            >
              {item.icon}

              {!collapsed && (
                <span>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER */}

      <div className={styles.footer}>
        <button
          onClick={handleLogout}
          className={`${
            styles.logoutButton
          } ${
            collapsed
              ? styles.logoutCollapsed
              : ""
          }`}
        >
          <LogOut size={18} />

          {!collapsed && (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default WorkerNavbar;