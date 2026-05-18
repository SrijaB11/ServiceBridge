import React, { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  IndianRupee,
  Star,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Form,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import styles from "./WorkerNavbar.module.css";

function WorkerNavbar() {
  const [collapsed, setCollapsed] = useState(false);

  const [worker, setWorker] = useState({});

  const navigate = useNavigate();

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/worker",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "History",
      path: "/worker/history",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Requests",
      path: "/worker/requests",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Earnings",
      path: "/worker/earnings",
      icon: <IndianRupee size={20} />,
    },
    {
      name: "Reviews",
      path: "/worker/reviews",
      icon: <Star size={20} />,
    },
    {
      name: "Complaints",
      path: "/worker/complaints",
      icon: <Form size={20} />,
    },
    {
      name: "Profile",
      path: "/worker/profile",
      icon: <User size={20} />,
    },
    
  ];

  const fetchWorkerData = async () => {
    try {
      const token = localStorage.getItem("token");

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
      {/* HEADER */}

      <div className={styles.header}>
        {!collapsed && (
          <h2 className={styles.logo}>
            Service Bridge
          </h2>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className={styles.toggleButton}
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* USER */}

      <div className={styles.userSection}>
        <img
          src={
            worker?.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="worker"
          className={styles.userImage}
        />

        {!collapsed && (
          <div>
            <h3 className={styles.userName}>
              {worker?.fullName || "Worker"}
            </h3>

            <p className={styles.userRole}>
              Worker
            </p>
          </div>
        )}
      </div>

      {/* MENU */}

      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() =>
              navigate(item.path)
            }
            className={`${styles.menuItem} ${
              location.pathname === item.path
                ? styles.active
                : ""
            }`}
          >
            {item.icon}

            {!collapsed && (
              <span>{item.name}</span>
            )}
          </li>
        ))}
      </ul>

      {/* FOOTER */}

      <div className={styles.footer}>
        <button
          onClick={handleLogout}
          className={`${styles.logoutButton} ${
            collapsed
              ? styles.logoutCollapsed
              : ""
          }`}
        >
          <LogOut size={18} />

          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default WorkerNavbar;