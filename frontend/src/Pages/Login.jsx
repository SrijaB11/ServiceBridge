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
      console.log("LOGIN RESPONSE:", res.data);
      const { token, role } = res.data;
      console.log("LOGIN RESPONSE:", res.data);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "customer") navigate("/customer");
      else if (role === "worker") navigate("/worker");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 md:w-[42%] p-8 lg:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[640px]">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-8">
            <img src="/images/logo.png" alt="logo" className="w-18 h-14" />
            <span className="text-green-600 font-bold">Service</span>
            <span className="text-purple-600 font-bold">Bridge</span>
          </h2>

          <img
            src="/images/worker.png"
            className="w-[320px] mt-2"
            alt="image"
          />

          <div className="mt-2">
            <p className="text-sm font-medium text-indigo-500 mb-1">
              Welcome Back!
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
              Good to See <span className="text-green-500">You</span> Again
            </h1>

            <div className="mt-7 space-y-4">
              <Feature
                icon={<Shield size={17} />}
                title="Secure"
                desc="Safe login"
              />
              <Feature
                icon={<User size={17} />}
                title="Easy Access"
                desc="Fast login"
              />
              <Feature
                icon={<Clock size={17} />}
                title="24/7"
                desc="Always available"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white px-6 py-10 sm:px-10 lg:px-14 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">
            Welcome Back
          </h2>

          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Email"
              className="w-full pl-10 py-3 border rounded-xl"
            />
          </div>

          <div className="relative mb-3">
            <Lock size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="w-full pl-10 py-3 border rounded-xl"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-3"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-green-500 text-white rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-green-500 font-semibold hover:underline"
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
