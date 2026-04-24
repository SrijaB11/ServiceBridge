import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  User,
  Clock,
  Wrench,
} from "lucide-react";

// ── tiny reusable social button ──────────────────────────────────────────────
const SocialBtn = ({ icon, label }) => (
  <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:shadow-md active:scale-95">
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

// ── feature row used in the left panel ──────────────────────────────────────
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

// ── main component ───────────────────────────────────────────────────────────
export default function ServiceBridgeLogin() {
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* ── LEFT PANEL ── */}
        <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 md:w-[42%]   p-8 lg:p-10 flex flex-col justify-between min-h-[340px] md:min-h-[640px]">
          {/* Background circles */}
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -top-10 right-0 h-48 w-48 rounded-full bg-purple-200/40 blur-2xl" />

          {/* Logo */}
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-8">
            <img src="/images/logo.png" alt="logo" className="w-18 h-14" />
            <span className="text-green-600 font-bold">Service</span>
            <span className="text-purple-600 font-bold">Bridge</span>{" "}
          </h2>
          {/* Headline */}
          <div className="relative z-10 mt-8">
            <p className="text-sm font-medium text-indigo-500 mb-1">
              Welcome Back!
            </p>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
              Good to See{" "}
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                You
              </span>{" "}
              Again
            </h1>
            <p className="text-sm text-gray-500 max-w-xs">
              Login to your account and continue managing your services with
              ease.
            </p>

            {/* Features */}
            <div className="mt-7 space-y-4">
              <Feature
                icon={<Shield size={17} className="text-green-500" />}
                title="Secure & Safe"
                desc="Your data and account are protected"
              />
              <Feature
                icon={<User size={17} className="text-indigo-500" />}
                title="Easy Access"
                desc="Login and manage your tasks easily"
              />
              <Feature
                icon={<Clock size={17} className="text-amber-500" />}
                title="Always Here"
                desc="We're here to support you 24/7"
              />
            </div>
          </div>

          {/* Illustration placeholder */}
          <div className="relative z-10 mt-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-inner overflow-hidden h-68 lg:h-52 flex items-center justify-center">
            <img
              src="./images/worker.png"
              alt="Service Bridge Illustration"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex gap-3"></div>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL (login form) ── */}
        <div className="flex-1 bg-white px-6 py-10 sm:px-10 lg:px-14 flex flex-col justify-center">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center shadow-lg border-4 border-white ring-2 ring-green-200">
              <img
                src="https://placehold.co/80x80/d1fae5/059669?text=SB"
                alt="User avatar"
                className="h-full w-full rounded-full object-cover opacity-0"
              />
              <User size={36} className="text-green-600 absolute" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Login to your Service Bridge account
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none ring-0 transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-11 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-green-400 focus:bg-white focus:ring-2 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-gray-300 accent-green-500"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm font-semibold text-green-500 hover:text-green-700 transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login button */}
          <button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-400 via-teal-500 to-indigo-500 py-3.5 text-white font-bold text-sm shadow-lg transition hover:shadow-xl hover:opacity-95 active:scale-[0.98] flex items-center justify-center gap-2">
            Login
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="flex gap-3">
            <SocialBtn
              label="Google"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              }
            />
            <SocialBtn
              label="Facebook"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="#1877F2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              }
            />
            <SocialBtn
              label="Apple"
              icon={
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path
                    fill="#000"
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  />
                </svg>
              }
            />
          </div>

          {/* Sign up */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-semibold text-green-500 hover:text-green-700 transition"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
