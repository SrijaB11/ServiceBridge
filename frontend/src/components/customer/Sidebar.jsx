import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  History,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ activeTab }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  //  detect screen size
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) setCollapsed(true); // auto collapse on mobile
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/customer",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Services",
      key: "services",
      path: "/customer/services",
      icon: <Wrench size={20} />,
    },
    {
      name: "Bookings",
      key: "bookings",
      path: "/customer/bookings",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "History",
      key: "history",
      path: "/customer/history",
      icon: <History size={20} />,
    },
    {
      name: "Complaints",
      key: "complaints",
      path: "/customer/complaints",
      icon: <AlertCircle size={20} />,
    },
    {
      name: "Profile",
      key: "profile",
      path: "/customer/profile",
      icon: <User size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`
        h-screen sticky top-0 bg-white border-r shadow-xl
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5 border-b">
        {/* {!collapsed && (
          <h2 className="text-2xl font-bold text-green-600">Service Bridge</h2>
        )} */}

        {/* toggle only on desktop */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* USER */}
      <div className="px-4 py-5 border-b flex items-center gap-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user"
          className="w-11 h-11 rounded-full"
        />

        {!collapsed && (
          <div>
            <h3 className="font-semibold">{user?.name || "User"}</h3>
          </div>
        )}
      </div>

      {/* MENU */}
      <ul className="mt-4 px-3 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition
              ${
                activeTab === item.key
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            {item.icon}
            {!collapsed && <span className="font-medium">{item.name}</span>}
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <div className="absolute bottom-5 left-0 w-full px-3">
        <button
          onClick={handleLogout}
          className={`bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl flex items-center justify-center gap-2
            ${collapsed ? "w-14 mx-auto" : "w-full"}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
