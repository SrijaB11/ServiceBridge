import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold">
        <img src="/images/logo.png" alt="logo" className="w-18 h-14" />
        {/* Service<span className="text-green-500">Bridge</span> */}
      </h1>

      <div className="hidden md:flex gap-6 text-sm text-gray-600">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">How It Works</a>
        <a href="#">Pricing</a>
      </div>

      <div className="flex gap-3">
        <Link to="/login">
          <button className="px-4 py-2 border rounded-lg">Login</button>
        </Link>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Book a Service
        </button>
      </div>
    </div>
  );
}
