// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";

// const menu = [
//   { name: "Dashboard", path: "/admin" },
//   { name: "Workers", path: "/admin/workers" },
//   { name: "Customers", path: "/admin/customers" },
//   { name: "Bookings", path: "/admin/bookings" },
//   { name: "Payments", path: "/admin/payments" },
//   { name: "Complaints", path: "/admin/complaints" },
// ];

// const Sidebar = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button className="md:hidden p-3" onClick={() => setOpen(!open)}>
//         ☰
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transform transition-transform duration-300 z-50
//         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

//         <nav className="space-y-2">
//           {menu.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               end
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded ${
//                   isActive ? "bg-blue-600" : "hover:bg-gray-700"
//                 }`
//               }
//               onClick={() => setOpen(false)}
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Overlay (mobile) */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black opacity-40 md:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  ClipboardList,
  CreditCard,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "Workers", path: "/admin/workers", icon: <Users size={20} /> },
  { name: "Customers", path: "/admin/customers", icon: <User size={20} /> },
  {
    name: "Bookings",
    path: "/admin/bookings",
    icon: <ClipboardList size={20} />,
  },
  { name: "Payments", path: "/admin/payments", icon: <CreditCard size={20} /> },
  {
    name: "Complaints",
    path: "/admin/complaints",
    icon: <AlertCircle size={20} />,
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* ================= MOBILE TOPBAR ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-50">
        <h1 className="font-bold text-green-600">Admin Panel</h1>

        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50 h-screen
          bg-white border-r shadow-xl
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-5 border-b">
          {!collapsed && (
            <h2 className="text-2xl font-bold text-green-600">
              Service Bridge
            </h2>
          )}

          <div className="flex gap-2">
            {/* collapse button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex p-1 hover:bg-gray-100 rounded"
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>

            {/* close mobile */}
            <button className="md:hidden p-1" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* USER */}
        <div className="px-4 py-5 border-b flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-10 h-10 rounded-full"
            alt="admin"
          />

          {!collapsed && (
            <div>
              <h3 className="font-semibold">Admin</h3>
              <p className="text-xs text-gray-500">System Admin</p>
            </div>
          )}
        </div>

        {/* MENU */}
        <nav className="mt-4 px-3 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-green-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {!collapsed && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-5 left-0 w-full px-3">
          <button
            onClick={handleLogout}
            className={`
              flex items-center justify-center gap-2
              bg-red-500 hover:bg-red-600 text-white
              py-3 rounded-xl transition
              ${collapsed ? "w-14 mx-auto" : "w-full"}
            `}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
