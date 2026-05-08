import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, Shield, User, Clock } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Feature = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  </div>
);

function Login() {
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    if (!email.trim()) return "Email is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email";

    if (!password) return "Password is required";

    if (password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  const handleLogin = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/login`, {
        email,
        password,
      });

      const { token, role, user } = res.data;

      // token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", user?.fullName || email);

      //  Navigate based on role
      if (role === "customer") {
        navigate("/customer");
      } else if (role === "worker") {
        navigate("/worker");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    //   <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
    //     <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
    //       <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 md:w-[42%] p-8 lg:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[640px]">
    //         <h2 className="text-lg font-semibold flex items-center gap-2 mb-8">
    //           <img
    //             src="/images/logo.png"
    //             alt="logo"
    //             className="w-18 h-14 cursor-pointer relative z-10"
    //             onClick={() => {
    //               console.log("clicked");
    //               navigate("/");
    //             }}
    //           />
    //           <span className="text-green-600 font-bold">Service</span>
    //           <span className="text-purple-600 font-bold">Bridge</span>
    //         </h2>

    //         <img
    //           src="/images/service_bridge_illustration.png"
    //           className="w-[320px] mt-2 "
    //           alt="image"
    //         />

    //         <div className="mt-2">
    //           <p className="text-sm font-medium text-indigo-500 mb-1">
    //             Welcome Back!
    //           </p>
    //           <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
    //             Good to See <span className="text-green-500">You</span> Again
    //           </h1>
    //         </div>
    //       </div>

    //       <div className="flex-1 bg-white px-6 py-10 sm:px-10 lg:px-14 flex flex-col justify-center">
    //         <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
    //           Welcome Back
    //         </h2>

    //         <div className="relative mb-4">
    //           <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
    //           <input
    //             type="email"
    //             value={email}
    //             onChange={(e) => {
    //               setEmail(e.target.value);
    //               setError("");
    //             }}
    //             placeholder="Email"
    //             className="w-full pl-10 py-3 border rounded-xl"
    //           />
    //         </div>

    //         <div className="relative mb-3">
    //           <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
    //           <input
    //             type={showPw ? "text" : "password"}
    //             value={password}
    //             onChange={(e) => {
    //               setPassword(e.target.value);
    //               setError("");
    //             }}
    //             placeholder="Password"
    //             className="w-full pl-10 py-3 border rounded-xl"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPw(!showPw)}
    //             className="absolute right-3 top-3"
    //           >
    //             {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
    //           </button>
    //         </div>

    //         {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

    //         <button
    //           onClick={handleLogin}
    //           disabled={loading}
    //           className="w-full py-3 bg-green-500 text-white rounded-xl"
    //         >
    //           {loading ? "Logging in..." : "Login"}
    //         </button>
    //         <p className="text-center text-sm text-gray-500 mt-4">
    //           Don't have an account?{" "}
    //           <a
    //             href="/register"
    //             className="text-green-500 font-semibold hover:underline"
    //           >
    //             Register
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // );
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-6 font-sans">
      <div className="w-full max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] flex flex-col lg:flex-row">
        {/* LEFT SIDE */}
        <div className="relative lg:w-[42%] bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 p-8 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-52 h-52 bg-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-52 h-52 bg-blue-300/20 rounded-full blur-3xl"></div>

          {/* LOGO */}
          <div className="relative z-10">
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-16 sm:w-20 h-14 sm:h-16 object-contain"
              />

              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-extrabold text-green-600">
                  Service
                </span>
                <span className="text-2xl font-extrabold text-purple-600">
                  Bridge
                </span>
              </div>
            </div>
          </div>

          {/* ILLUSTRATION */}
          <div className="relative z-10 flex justify-center py-6 lg:py-10">
            <img
              src="/images/service_bridge_illustration.png"
              className="w-full max-w-[320px] sm:max-w-[380px] object-contain drop-shadow-2xl"
              alt="illustration"
            />
          </div>

          {/* TEXT */}
          <div className="relative z-10 text-center lg:text-left mt-4">
            <p className="text-sm sm:text-base font-semibold text-indigo-500 uppercase tracking-wide mb-2">
              Welcome Back
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Good to See <span className="text-green-500">You</span> Again
            </h1>

            <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-md">
              Login to continue accessing trusted services and connect with
              skilled workers easily.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-white px-6 py-10 sm:px-10 md:px-14 lg:px-16 flex flex-col justify-center">
          {/* TITLE */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Login to your account
            </p>
          </div>

          {/* EMAIL */}
          <div className="relative mb-5">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm sm:text-base transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-4">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className="w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-12 text-sm sm:text-base transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              {showPw ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium text-indigo-500 hover:text-indigo-600 hover:underline transition"
            >
              Forgot Password?
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base font-semibold shadow-lg transition-all duration-200 hover:scale-[1.01] hover:shadow-xl disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER */}
          <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-green-500 cursor-pointer hover:text-green-600 hover:underline transition"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
