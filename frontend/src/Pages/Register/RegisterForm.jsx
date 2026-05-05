import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
    phone: "",
  });

  // TIMER
  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [step, timer]);

  // VALIDATION
  const validate = () => {
    const e = {};

    if (!formData.fullName.trim()) {
      e.fullName = "Full name required";
    } else if (formData.fullName.length < 3) {
      e.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      e.email = "Email required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        e.email = "Invalid email format";
      }
    }

    if (!formData.password) {
      e.password = "Password required";
    } else if (formData.password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      e.confirmPassword = "Confirm password required";
    } else if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      e.role = "Select role";
    }

    if (!formData.phone) {
      e.phone = "Phone required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      e.phone = "Enter valid 10-digit phone";
    }

    if (!formData.location.trim()) {
      e.location = "Location required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // SEND OTP
  const handleSendOtp = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/registerotp`, formData);

      toast.success("OTP sent to your email");
      setStep(2);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      await axios.post(`${API_BASE}/verifyotp`, {
        email: formData.email,
        otp,
        ...formData,
      });

      toast.success("Account created successfully");
      navigate("/login");

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        phone: "",
        location: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid OTP");
      //  if (message === "User not found" || message === "Invalid email") {
      //     setStep(1);
      //   } else {
      //     setOtp("");
      //   }
      setOtp("");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border rounded-xl text-sm border-gray-200";

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {step === 1 ? "Create Account" : "Verify OTP"}
      </h1>

      {step === 1 && (
        <div className="space-y-4">
          <input
            className={inputClass}
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}

          <input
            className={inputClass}
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            className={inputClass}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="password"
            className={inputClass}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <select
            className={inputClass}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="worker">Worker</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <input
            className={inputClass}
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location}</p>
          )}

          <input
            className={inputClass}
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </div>
      )}

      {step === 2 && (
        <>
          <input
            className={inputClass}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p className="text-sm text-center mt-2 text-gray-500">
            {timer > 0 ? `Resend OTP in ${timer}s` : "Didn't receive OTP?"}
          </p>

          <button
            onClick={handleSendOtp}
            disabled={!canResend}
            className={`w-full mt-2 py-2 rounded-xl ${
              canResend ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            Resend OTP
          </button>
          <button
            onClick={() => {
              setStep(1);
              setOtp("");
            }}
            className="w-full py-2 text-sm text-blue-500 hover:text-blue-700 transition"

            //className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Change Email
          </button>
        </>
      )}
    </div>
  );
}
