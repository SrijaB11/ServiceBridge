import React, { useState } from "react";
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  History,
  User,
  Menu,
} from "lucide-react";

function Sidebar({ setActiveTab, activeTab }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Services", key: "services", icon: <Wrench size={18} /> },
    { name: "Bookings", key: "bookings", icon: <ClipboardList size={18} /> },
    { name: "History", key: "history", icon: <History size={18} /> },
    { name: "Profile", key: "profile", icon: <User size={18} /> },
  ];

  return (
    <>
      {/* MOBILE NAVBAR */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <h2 className="font-semibold text-green-600">Service Bridge</h2>
        <button onClick={() => setOpen(!open)}>
          <Menu size={22} />
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r p-5 transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-xl font-semibold text-green-600 mb-8 hidden md:block">
          Service Bridge
        </h2>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all
                ${
                  activeTab === item.key
                    ? "bg-green-100 text-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*  mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
