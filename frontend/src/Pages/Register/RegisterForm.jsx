import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Mail, Lock, Phone, MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",

    location: "",
    phone: "",
  });

  // ✅ VALIDATION
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

    if (!formData.role) e.role = "Please select a role";

    if (!formData.phone.trim()) e.phone = "Phone number is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone))
      e.phone = "Enter a valid phone number";

    if (!formData.location.trim()) e.location = "Location is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const toastId = toast.loading("Creating account...");

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone,
        location: formData.location,
      };

      const { data } = await axios.post(`${API_BASE}/register`, payload);

      // ✅ SUCCESS TOAST
      toast.success("Account created successfully 🎉", { id: toastId });

      console.log(data);

      // reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        phone: "",
        location: "",
      });

      setErrors({});
    } catch (err) {
      // ❌ ERROR TOAST
      toast.error(err?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full mb-3 px-4 py-3 border rounded-xl text-sm outline-none ${
      errors[field]
        ? "border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:ring-2 focus:ring-green-100"
    }`;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

      {/* NAME */}
      <input
        className={inputClass("fullName")}
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />
      {errors.fullName && (
        <p className="text-red-500 text-xs">{errors.fullName}</p>
      )}

      {/* EMAIL */}
      <input
        className={inputClass("email")}
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      {/* PASSWORD */}
      <input
        type="password"
        className={inputClass("password")}
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password}</p>
      )}

      {/* CONFIRM PASSWORD */}
      <input
        type="password"
        className={inputClass("confirmPassword")}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
      )}

      {/* ROLE */}
      <select
        className={inputClass("role")}
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="worker">Worker</option>
      </select>
      {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

      {/* LOCATION */}
      <input
        className={inputClass("location")}
        placeholder="Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      {errors.location && (
        <p className="text-red-500 text-xs">{errors.location}</p>
      )}
      {/* PHONE */}
      <input
        className={inputClass("phone")}
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
      />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

      <button
        disabled={loading}
        className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
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
