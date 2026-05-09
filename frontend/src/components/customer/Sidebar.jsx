import React, { useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  History,
  User,
  Menu,
  X,
} from "lucide-react";

function Sidebar({ setActiveTab, activeTab }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Services",
      key: "services",
      icon: <Wrench size={18} />,
    },
    {
      name: "Bookings",
      key: "bookings",
      icon: <ClipboardList size={18} />,
    },
    {
      name: "History",
      key: "history",
      icon: <History size={18} />,
    },
    {
      name: "Profile",
      key: "profile",
      icon: <User size={18} />,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-40">
        <h2 className="text-base font-bold text-green-600">Service Bridge</h2>

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 md:hidden
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full
        w-56 md:w-64
        bg-white border-r shadow-xl md:shadow-none
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-bold text-green-600">Service Bridge</h2>

          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* DESKTOP TITLE */}
        <div className="hidden md:block px-5 py-6">
          <h2 className="text-2xl font-bold text-green-600">Service Bridge</h2>
        </div>

        {/* MENU */}
        <ul className="mt-4 space-y-1 px-3">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
              ${
                activeTab === item.key
                  ? "bg-green-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}

              <span className="text-sm font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
