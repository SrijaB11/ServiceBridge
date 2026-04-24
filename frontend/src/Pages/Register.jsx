import { useState } from "react";
// axios import - uncomment when connecting to backend
// import axios from "axios";

// ─── Icon Components (Lucide-style inline SVG replacements via CSS) ───────────
// Using lucide-react icons
import {
  Shield,
  Lock,
  Zap,
  User,
  Mail,
  Eye,
  EyeOff,
  Phone,
  MapPin,
  BookOpen,
  Wrench,
  ChevronRight,
  Check,
  Plus,
  HardHat,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";

// ─── API Service (axios-ready) ─────────────────────────────────────────────────
const API_BASE = "https://your-api.com/api"; // replace with your base URL

const authService = {
  register: async (payload) => {
    // Uncomment below to connect to backend:
    // const { data } = await axios.post(`${API_BASE}/auth/register`, payload);
    // return data;
    console.log("Register payload:", payload);
    return { success: true, message: "Account created!" };
  },
  checkEmail: async (email) => {
    // const { data } = await axios.post(`${API_BASE}/auth/check-email`, { email });
    // return data;
    return { available: true };
  },
};

// ─── Progress Stepper ─────────────────────────────────────────────────────────
function Stepper({ currentStep }) {
  const steps = [
    { num: 1, label: "Basic Info" },
    { num: 2, label: "Choose Role" },
    { num: 3, label: "Additional Info" },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                currentStep > step.num
                  ? "bg-green-500 border-green-500 text-white"
                  : currentStep === step.num
                    ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-200"
                    : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > step.num ? (
                <Check size={16} strokeWidth={3} />
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-xs mt-1 font-medium ${
                currentStep === step.num ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-all duration-500 ${
                currentStep > step.num + 0 ? "bg-green-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Left Panel ────────────────────────────────────────────────────────────────
function LeftPanel({ page }) {
  const page1 = {
    tag: null,
    heading: (
      <>
        Join Thousands of{" "}
        <span className="block font-extrabold text-gray-900">
          Happy Customers
        </span>
        <span className="font-extrabold">
          &amp; <span className="text-green-500">Trusted Workers</span>
        </span>
      </>
    ),
    sub: "Create your account and connect with skilled professionals near you. Get your work done quickly and easily.",
    features: [
      {
        icon: <Shield size={18} className="text-green-500" />,
        bg: "bg-green-50",
        border: "border-green-200",
        title: "Verified Professionals",
        desc: "All workers are verified and trusted",
      },
      {
        icon: <Lock size={18} className="text-purple-500" />,
        bg: "bg-purple-50",
        border: "border-purple-200",
        title: "Secure & Safe",
        desc: "Your data and payments are secure",
      },
      {
        icon: <Zap size={18} className="text-yellow-500" />,
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        title: "Quick & Easy",
        desc: "Simple process, just a few steps away",
      },
    ],
  };

  const page2 = {
    tag: "Step 3 of 3",
    heading: (
      <>
        Build Your <span className="text-green-500 block">Trusted Profile</span>
      </>
    ),
    sub: "Complete your profile to unlock better visibility and trust.",
    features: [
      {
        icon: <Shield size={18} className="text-green-500" />,
        bg: "bg-green-50",
        border: "border-green-200",
        title: "Verified Identity",
        desc: "Build trust with verified identity & documents.",
      },
      {
        icon: <TrendingUp size={18} className="text-purple-500" />,
        bg: "bg-purple-50",
        border: "border-purple-200",
        title: "More Job Visibility",
        desc: "Get discovered by more customers and businesses.",
      },
      {
        icon: <Zap size={18} className="text-yellow-500" />,
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        title: "Faster Hiring",
        desc: "Complete profile helps you get hired quickly.",
      },
    ],
  };

  const data = page === 1 ? page1 : page2;

  return (
    <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-50 to-blue-50 p-10 rounded-2xl min-h-full">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <img
            src="/logo-placeholder.png"
            alt="Service Bridge Logo"
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />

          <img src="/images/logo.png" alt="logo" className="w-18 h-14" />

          <span className="text-xl font-bold">
            Service <span className="text-green-500">Bridge</span>
          </span>
        </div>

        {data.tag && (
          <span className="text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full mb-4 inline-block">
            {data.tag}
          </span>
        )}

        <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
          {data.heading}
        </h2>
        <p className="text-gray-500 text-sm mb-8">{data.sub}</p>

        <div className="space-y-4">
          {data.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center flex-shrink-0`}
              >
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Illustration placeholder */}
      <div className="mt-10">
        <img src="/images/worker.png" className="w-[320px] mt-10" alt="image" />
        <div
          style={{ display: "none" }}
          className="w-full h-48 rounded-2xl bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 items-center justify-center"
        >
          <div className="text-center">
            <div className="flex gap-4 justify-center mb-3">
              <div className="w-16 h-16 rounded-full bg-green-200 flex items-center justify-center">
                <HardHat size={28} className="text-green-600" />
              </div>
              <div className="w-16 h-16 rounded-full bg-yellow-200 flex items-center justify-center">
                <User size={28} className="text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400">Workers &amp; Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Input Field ───────────────────────────────────────────────────────────────
function InputField({ label, icon, error, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          {...props}
          type={isPassword ? (show ? "text" : "password") : type}
          className={`w-full pl-10 pr-${isPassword ? "10" : "4"} py-3 border rounded-xl text-sm bg-white outline-none transition-all
            ${error ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
            placeholder:text-gray-400`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Social Auth Buttons ───────────────────────────────────────────────────────
function SocialButtons() {
  return (
    <div>
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">
          or continue with
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            name: "Google",
            icon: (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            ),
          },
          {
            name: "Facebook",
            icon: (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            ),
          },
          {
            name: "Apple",
            icon: (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            ),
          },
        ].map((s) => (
          <button
            key={s.name}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600 font-medium"
          >
            {s.icon}
            <span className="hidden sm:inline">{s.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Page 1: Steps 1 & 2 ──────────────────────────────────────────────────────
function Page1({ formData, setFormData, errors, setErrors, onNext }) {
  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      e.fullName = "Name must be at least 2 characters";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address";

    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8)
      e.password = "Password must be at least 8 characters";
    else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      e.password = "Include at least 1 uppercase letter and 1 number";

    if (!formData.confirmPassword)
      e.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";

    if (!formData.role) e.role = "Please choose a role";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = (ev) => {
    ev.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleNext} noValidate>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Your Account
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Join Service Bridge and start your journey
        </p>
      </div>

      <Stepper currentStep={formData.role ? 2 : 1} />

      <InputField
        label="Full Name"
        icon={<User size={16} />}
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        error={errors.fullName}
      />
      <InputField
        label="Email Address"
        icon={<Mail size={16} />}
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
      />
      <InputField
        label="Password"
        icon={<Lock size={16} />}
        type="password"
        placeholder="Create a password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={errors.password}
      />
      <InputField
        label="Confirm Password"
        icon={<Lock size={16} />}
        type="password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        error={errors.confirmPassword}
      />

      {/* Role Selection */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose Your Role
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "customer",
              label: "I am a Customer",
              sub: "I want to hire skilled professionals",
              icon: <User size={28} className="text-green-500" />,
            },
            {
              value: "worker",
              label: "I am a Worker",
              sub: "I want to offer my services",
              icon: <HardHat size={28} className="text-purple-500" />,
            },
          ].map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setFormData({ ...formData, role: r.value })}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                formData.role === r.value
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {formData.role === r.value && (
                <span className="absolute top-3 right-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </span>
              )}
              {!formData.role || formData.role !== r.value ? (
                <span className="absolute top-3 right-3 w-5 h-5 border-2 border-gray-300 rounded-full" />
              ) : null}
              <div className="flex flex-col items-center text-center gap-2">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    r.value === "customer" ? "bg-green-100" : "bg-purple-100"
                  }`}
                >
                  {r.icon}
                </div>
                <p className="font-semibold text-sm text-gray-800">{r.label}</p>
                <p className="text-xs text-gray-500">{r.sub}</p>
              </div>
            </button>
          ))}
        </div>
        {errors.role && (
          <p className="text-red-500 text-xs mt-1">{errors.role}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-95"
      >
        Next Step <ChevronRight size={18} />
      </button>

      <SocialButtons />

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-green-500 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
}

// ─── Page 2: Step 3 ────────────────────────────────────────────────────────────
function Page2({
  formData,
  setFormData,
  errors,
  setErrors,
  onBack,
  onSubmit,
  loading,
}) {
  const availableServices = [
    { label: "Electrician", icon: <Zap size={13} /> },
    { label: "Plumber", icon: <Wrench size={13} /> },
    { label: "Tutor", icon: <BookOpen size={13} /> },
    { label: "Carpenter", icon: <Wrench size={13} /> },
    { label: "Painter", icon: <Wrench size={13} /> },
    { label: "Cleaner", icon: <Shield size={13} /> },
  ];

  const toggleService = (svc) => {
    const list = formData.services || [];
    setFormData({
      ...formData,
      services: list.includes(svc)
        ? list.filter((s) => s !== svc)
        : [...list, svc],
    });
  };

  const validate = () => {
    const e = {};
    if (!formData.location.trim()) e.location = "Location is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone))
      e.phone = "Enter a valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (validate()) await onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Complete Your Profile
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Almost there! Just a few more details.
        </p>
      </div>

      <Stepper currentStep={3} />

      {/* Location + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Location
          </label>
          <div className="relative">
            <MapPin
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Enter your city / area"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none transition-all
                ${errors.location ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
                placeholder:text-gray-400`}
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none transition-all
                ${errors.phone ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
                placeholder:text-gray-400`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Preferred Services */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Services{" "}
          <span className="text-green-500 font-normal">(Optional)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {availableServices.map((svc) => {
            const active = (formData.services || []).includes(svc.label);
            return (
              <button
                key={svc.label}
                type="button"
                onClick={() => toggleService(svc.label)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  active
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {svc.icon}
                {svc.label}
                {active && (
                  <Check size={11} strokeWidth={3} className="text-green-500" />
                )}
              </button>
            );
          })}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-dashed border-gray-300 text-gray-400 hover:border-gray-400 transition-all"
          >
            <Plus size={13} /> Add More
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Address <span className="text-green-500 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <BookOpen
            size={16}
            className="absolute left-3 top-3.5 text-gray-400"
          />
          <textarea
            rows={4}
            placeholder="Enter your full address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400 resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : (
          <>
            Create Account <ChevronRight size={18} />
          </>
        )}
      </button>

      {/* Trust badge */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
        <Shield size={13} className="text-green-400" />
        Your information is safe and secure with us.
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-green-500 font-semibold hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function ServiceBridgeRegister({ onSuccess }) {
  const [page, setPage] = useState(1); // 1 = steps 1&2, 2 = step 3
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
    phone: "",
    services: [],
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        location: formData.location,
        phone: formData.phone,
        services: formData.services,
        address: formData.address,
      };
      const result = await authService.register(payload);
      setSuccessMsg("Account created successfully! Redirecting...");
      if (onSuccess) onSuccess(result);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setApiError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (successMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-sm mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-500" strokeWidth={3} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            You're all set!
          </h2>
          <p className="text-gray-500 text-sm">{successMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[680px]">
          {/* Left Panel */}
          <div className="lg:col-span-2 p-6 lg:p-8">
            <LeftPanel page={page} />
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-3 p-6 lg:p-10 border-l border-gray-100 flex flex-col justify-center">
            {/* Back button on page 2 */}
            {page === 2 && (
              <button
                type="button"
                onClick={() => {
                  setPage(1);
                  setErrors({});
                }}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors self-start"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}

            {/* API Error */}
            {apiError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {apiError}
              </div>
            )}

            {page === 1 ? (
              <Page1
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onNext={() => {
                  setPage(2);
                  setErrors({});
                }}
              />
            ) : (
              <Page2
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                onBack={() => {
                  setPage(1);
                  setErrors({});
                }}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
