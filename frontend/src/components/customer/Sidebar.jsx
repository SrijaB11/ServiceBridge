// // import React, { useState } from "react";
// // import {
// //   LayoutDashboard,
// //   Wrench,
// //   ClipboardList,
// //   History,
// //   User,
// //   Menu,
// //   X,
// // } from "lucide-react";

// // function Sidebar({ setActiveTab, activeTab }) {
// //   const [open, setOpen] = useState(false);

// //   const menuItems = [
// //     {
// //       name: "Dashboard",
// //       key: "dashboard",
// //       icon: <LayoutDashboard size={18} />,
// //     },
// //     {
// //       name: "Services",
// //       key: "services",
// //       icon: <Wrench size={18} />,
// //     },
// //     {
// //       name: "Bookings",
// //       key: "bookings",
// //       icon: <ClipboardList size={18} />,
// //     },
// //     {
// //       name: "History",
// //       key: "history",
// //       icon: <History size={18} />,
// //     },
// //     {
// //       name: "Profile",
// //       key: "profile",
// //       icon: <User size={18} />,
// //     },
// //   ];

// //   return (
// //     <>
// //       {/* MOBILE TOPBAR */}
// //       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-40">
// //         <h2 className="text-base font-bold text-green-600">Service Bridge</h2>

// //         <button
// //           onClick={() => setOpen(true)}
// //           className="p-2 rounded-lg hover:bg-gray-100"
// //         >
// //           <Menu size={22} />
// //         </button>
// //       </div>

// //       {/* OVERLAY */}
// //       <div
// //         onClick={() => setOpen(false)}
// //         className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 md:hidden
// //         ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
// //       />

// //       {/* SIDEBAR */}
// //       <aside
// //         className={`fixed md:static top-0 left-0 z-50 h-full
// //         w-56 md:w-64
// //         bg-white border-r shadow-xl md:shadow-none
// //         transform transition-transform duration-300
// //         ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
// //       >
// //         {/* MOBILE HEADER */}
// //         <div className="md:hidden flex items-center justify-between px-4 py-4 border-b">
// //           <h2 className="text-lg font-bold text-green-600">Service Bridge</h2>

// //           <button
// //             onClick={() => setOpen(false)}
// //             className="p-1 rounded-md hover:bg-gray-100"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* DESKTOP TITLE */}
// //         <div className="hidden md:block px-5 py-6">
// //           <h2 className="text-2xl font-bold text-green-600">Service Bridge</h2>
// //         </div>

// //         {/* MENU */}
// //         <ul className="mt-4 space-y-1 px-3">
// //           {menuItems.map((item) => (
// //             <li
// //               key={item.key}
// //               onClick={() => {
// //                 setActiveTab(item.key);
// //                 setOpen(false);
// //               }}
// //               className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200
// //               ${
// //                 activeTab === item.key
// //                   ? "bg-green-500 text-white"
// //                   : "text-gray-600 hover:bg-gray-100"
// //               }`}
// //             >
// //               {item.icon}

// //               <span className="text-sm font-medium">{item.name}</span>
// //             </li>
// //           ))}
// //         </ul>
// //       </aside>
// //     </>
// //   );
// // }

// // export default Sidebar;
// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Wrench,
//   ClipboardList,
//   History,
//   User,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { AlertCircle } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// function Sidebar({ setActiveTab, activeTab }) {
//   // const [open, setOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const menuItems = [
//     {
//       name: "Dashboard",
//       key: "dashboard",
//       icon: <LayoutDashboard size={20} />,
//     },
//     {
//       name: "Services",
//       key: "services",
//       icon: <Wrench size={20} />,
//     },
//     {
//       name: "Bookings",
//       key: "bookings",
//       icon: <ClipboardList size={20} />,
//     },
//     {
//       name: "History",
//       key: "history",
//       icon: <History size={20} />,
//     },
//     {
//       name: "Complaints",
//       key: "complaints",
//       icon: <AlertCircle size={20} />,
//     },
//     {
//       name: "Profile",
//       key: "profile",
//       icon: <User size={20} />,
//     },
//   ];
//   const handleLogout = () => {
//     localStorage.clear();

//     navigate("/login");
//   };

//   return (
//     <>
//       {/* MOBILE TOPBAR
//       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-40">
//         <h2 className="text-lg font-bold text-green-600">Service Bridge</h2>

//         <button
//           onClick={() => setOpen(true)}
//           className="p-2 rounded-lg hover:bg-gray-100"
//         >
//           <Menu size={22} />
//         </button>
//       </div> */}

//       {/* OVERLAY */}
//       {/* <div
//         onClick={() => setOpen(false)}
//         className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 md:hidden
//         ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
//       /> */}

//       {/* SIDEBAR */}
//       <aside
//         className={`h-screen sticky top-0 bg-white border-r
//   shadow-xl transition-all duration-300
//   ${collapsed ? "w-20" : "w-64"}`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-4 py-5 border-b">
//           {!collapsed && (
//             <h2 className="text-2xl font-bold text-green-600">
//               Service Bridge
//             </h2>
//           )}

//           <div className="flex items-center gap-2">
//             {/* DESKTOP COLLAPSE */}
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="hidden md:flex p-1 rounded hover:bg-gray-100"
//             >
//               {collapsed ? (
//                 <ChevronRight size={20} />
//               ) : (
//                 <ChevronLeft size={20} />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* USER */}
//         <div className="px-4 py-5 border-b flex items-center gap-3">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             alt="user"
//             className="w-11 h-11 rounded-full"
//           />

//           {!collapsed && (
//             <div>
//               <h3 className="font-semibold">Srija</h3>
//               <p className="text-sm text-gray-500">Customer</p>
//             </div>
//           )}
//         </div>

//         {/* MENU */}
//         <ul className="mt-4 px-3 space-y-2">
//           {menuItems.map((item) => (
//             <li
//               key={item.key}
//               onClick={() => {
//                 setActiveTab(item.key);
//               }}
//               className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
//               ${
//                 activeTab === item.key
//                   ? "bg-green-500 text-white shadow-md"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               {item.icon}

//               {!collapsed && <span className="font-medium">{item.name}</span>}
//             </li>
//           ))}
//         </ul>

//         {/* FOOTER */}
//         <div className="absolute bottom-5 left-0 w-full px-3">
//           <button
//             onClick={handleLogout}
//             className={`bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition
//     flex items-center justify-center gap-2
//     ${collapsed ? "w-14 mx-auto" : "w-full"}`}
//           >
//             <LogOut size={18} />

//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default Sidebar;
import React, { useState } from "react";
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

  const navigate = useNavigate();

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
    overflow-y-auto md:overflow-y-hidden
    ${collapsed ? "w-20" : "w-64"}
  `}
      style={{ scrollbarWidth: "thin" }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-5 border-b">
        {!collapsed && (
          <h2 className="text-2xl font-bold text-green-600">Service Bridge</h2>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
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
            <h3 className="font-semibold">Srija</h3>

            <p className="text-sm text-gray-500">Customer</p>
          </div>
        )}
      </div>

      {/* MENU */}
      <ul className="mt-4 px-3 space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.key}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200
            ${
              activeTab === item.key
                ? "bg-green-500 text-white shadow-md"
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
          className={`bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition
          flex items-center justify-center gap-2
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
