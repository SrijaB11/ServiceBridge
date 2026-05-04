import React, { useState } from "react";
import {
  Users,
  Briefcase,
  AlertCircle,
  CreditCard,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white flex flex-col p-5">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        {/* Menu */}
        <div className="flex flex-col gap-3">

          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />

          <SidebarItem
            icon={<Users size={18} />}
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />

          <SidebarItem
            icon={<Briefcase size={18} />}
            label="Workers"
            active={activeTab === "workers"}
            onClick={() => setActiveTab("workers")}
          />

          <SidebarItem
            icon={<AlertCircle size={18} />}
            label="Complaints"
            active={activeTab === "complaints"}
            onClick={() => setActiveTab("complaints")}
          />

          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Payments"
            active={activeTab === "payments"}
            onClick={() => setActiveTab("payments")}
          />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 p-2 rounded-lg"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 capitalize">
          {activeTab}
        </h2>

        {/* Content */}
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "users" && <UsersSection />}
        {activeTab === "workers" && <WorkersSection />}
        {activeTab === "complaints" && <ComplaintsSection />}
        {activeTab === "payments" && <PaymentsSection />}
      </div>
    </div>
  );
}


// 🔹 Sidebar Item Component

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-lg transition ${
        active
          ? "bg-white text-indigo-600 font-semibold"
          : "hover:bg-indigo-500"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}



// # 🔹 Sections (You can connect APIs later)

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Users" value="120" />
      <Card title="Workers" value="45" />
      <Card title="Complaints" value="8" />
    </div>
  );
}

function UsersSection() {
  return <div>📋 Users list will come here</div>;
}

function WorkersSection() {
  return <div>👷 Workers list will come here</div>;
}

function ComplaintsSection() {
  return <div>⚠ Complaints list will come here</div>;
}

function PaymentsSection() {
  return <div>💳 Payments data will come here</div>;
}



// # 🔹 Card Component

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}