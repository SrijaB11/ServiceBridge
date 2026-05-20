import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, LogOut, Settings } from "lucide-react";

const Topbar = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const username = localStorage.getItem("name") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-md">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <h1
          onClick={() => navigate("/admin")}
          className="font-bold text-lg cursor-pointer"
        >
          Service Bridge Admin
        </h1>

        <div className="hidden md:flex items-center bg-white/20 px-3 py-1 rounded-lg w-1/3">
          <Search size={18} />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-white w-full placeholder-white/70"
          />
        </div>

        <div className="flex items-center gap-4 relative">
          {/* NOTIFICATIONS */}
          <div className="relative cursor-pointer">
            <Bell />

            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
              3
            </span>
          </div>

          <div
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 cursor-pointer bg-white/10 px-3 py-1 rounded-lg"
          >
            <User size={18} />
            <span className="hidden md:block">{username}</span>
          </div>

          {openMenu && (
            <div className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-lg w-40 overflow-hidden">
              <button
                onClick={() => navigate("/admin/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => navigate("/admin/settings")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;