function Sidebar({ setActiveTab }) {
  return (
    <div className="w-64 bg-white shadow-md p-5 hidden md:block">
      <h2 className="text-xl font-bold text-green-600 mb-6">Service Bridge</h2>

      <ul className="space-y-3">
        <li
          onClick={() => setActiveTab("dashboard")}
          className="cursor-pointer"
        >
          Dashboard
        </li>
        <li onClick={() => setActiveTab("services")} className="cursor-pointer">
          Services
        </li>
        <li onClick={() => setActiveTab("bookings")} className="cursor-pointer">
          My Bookings
        </li>
        <li onClick={() => setActiveTab("history")} className="cursor-pointer">
          History
        </li>
        <li onClick={() => setActiveTab("profile")} className="cursor-pointer">
          Profile
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
