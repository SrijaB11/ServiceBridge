import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  ClipboardList,
  CreditCard,
  AlertCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "Customers", path: "/admin/users", icon: <User size={20} /> },
  { name: "Workers", path: "/admin/workers", icon: <Users size={20} /> },
  { name: "Recent Requests", path: "/admin/recent-requests", icon: <Users size={20} /> },
  { name: "Customer Complaints", path: "/admin/customer-complaints", icon: <AlertCircle size={20} /> },
  { name: "Worker Complaints", path: "/admin/worker-complaints", icon: <AlertCircle size={20} /> },
  { name: "Certificate Verification", path: "/admin/workers/verification", icon: <Users size={20} /> },
  // { name: "Bookings", path: "/admin/bookings", icon: <ClipboardList size={20} /> },
  { name: "Incomming Payments", path: "/admin/customer-payments", icon: <CreditCard size={20} /> }
];

const AdminNavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
    
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-50">
        <h1 className="font-bold text-green-600">Admin Panel</h1>
        <button onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-screen w-64
          bg-white border-r shadow-xl flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          transition-transform duration-300
        `}
      >
        
        <div className="flex items-center justify-between px-5 py-6 border-b flex-shrink-0">
          <h2 className="text-2xl font-bold text-green-600">Service Bridge</h2>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        
        <div className="px-5 py-6 border-b flex items-center gap-3 flex-shrink-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-10 h-10 rounded-full"
            alt="admin"
          />
          <div>
            <h3 className="font-semibold">Admin</h3>
            <p className="text-xs text-gray-500">System Admin</p>
          </div>
        </div>

        
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all
                ${isActive
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        
        <div className="p-4 border-t mt-auto flex-shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full 
                       bg-red-500 hover:bg-red-600 text-white 
                       py-3.5 rounded-xl transition font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminNavBar;