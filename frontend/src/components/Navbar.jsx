import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Why Choose Us", id: "whychoose" },
    { name: "How It Works", id: "howitworks" },
    { name: "Testimonials", id: "testimonials" },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMobileMenu(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        {/* LOGO */}
        <div
          onClick={() => scrollToSection("home")}
          className="cursor-pointer flex items-center"
        >
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-16 sm:w-20 h-12 sm:h-14 object-contain"
          />
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-green-500 transition-all duration-200"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* RIGHT BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/customer-register">
            <button className="px-5 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition">
              Register
            </button>
          </Link>

          <Link to="/login">
            <button className="px-5 py-2.5 border border-gray-300 rounded-xl font-medium hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");

              if (!token) {
                navigate("/login");
              } else {
                navigate("/customer/services");
              }
            }}
            className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium shadow-md transition"
          >
            Book a Service
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="lg:hidden px-6 pb-5 bg-white border-t border-gray-100 shadow-md">
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-gray-700 hover:text-green-500 transition"
              >
                {item.name}
              </button>
            ))}
            <Link to="/register">
              <button className="w-full py-3 border rounded-xl mt-2">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="w-full py-3 border rounded-xl mt-2">
                Login
              </button>
            </Link>

            <button
              //onClick={() => scrollToSection("services")}
              onClick={() => navigate("/login")}
              className="w-full py-3 bg-green-500 text-white rounded-xl"
            >
              Book a Service
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
