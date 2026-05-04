// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { User, Mail, Lock, Phone, MapPin } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export default function RegisterForm() {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",

//     location: "",
//     phone: "",
//   });

//   // ✅ VALIDATION
//   const validate = () => {
//     const e = {};

//     if (!formData.fullName.trim()) e.fullName = "Full name is required";
//     else if (formData.fullName.trim().length < 2)
//       e.fullName = "Name must be at least 2 characters";

//     if (!formData.email.trim()) e.email = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       e.email = "Enter a valid email address";

//     if (!formData.password) e.password = "Password is required";
//     else if (formData.password.length < 8)
//       e.password = "Password must be at least 8 characters";
//     else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password))
//       e.password = "Include at least 1 uppercase letter and 1 number";

//     if (!formData.confirmPassword)
//       e.confirmPassword = "Please confirm your password";
//     else if (formData.password !== formData.confirmPassword)
//       e.confirmPassword = "Passwords do not match";

//     if (!formData.role) e.role = "Please select a role";

//     if (!formData.phone.trim()) e.phone = "Phone number is required";
//     else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone))
//       e.phone = "Enter a valid phone number";

//     if (!formData.location.trim()) e.location = "Location is required";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const toastId = toast.loading("Creating account...");

//     try {
//       setLoading(true);

//       const payload = {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//         phone: formData.phone,
//         location: formData.location,
//       };

//       const { data } = await axios.post(`${API_BASE}/register`, payload);

//       // ✅ SUCCESS TOAST
//       toast.success("Account created successfully 🎉", { id: toastId });

//       console.log(data);

//       // reset form
//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//         phone: "",
//         location: "",
//       });

//       setErrors({});
//     } catch (err) {
//       // ❌ ERROR TOAST
//       toast.error(err?.response?.data?.message || "Something went wrong", {
//         id: toastId,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass = (field) =>
//     `w-full mb-3 px-4 py-3 border rounded-xl text-sm outline-none ${
//       errors[field]
//         ? "border-red-400 focus:ring-2 focus:ring-red-100"
//         : "border-gray-200 focus:ring-2 focus:ring-green-100"
//     }`;

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

//       {/* NAME */}
//       <input
//         className={inputClass("fullName")}
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//       />
//       {errors.fullName && (
//         <p className="text-red-500 text-xs">{errors.fullName}</p>
//       )}

//       {/* EMAIL */}
//       <input
//         className={inputClass("email")}
//         placeholder="Email"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//       />
//       {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

//       {/* PASSWORD */}
//       <input
//         type="password"
//         className={inputClass("password")}
//         placeholder="Password"
//         value={formData.password}
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//       />
//       {errors.password && (
//         <p className="text-red-500 text-xs">{errors.password}</p>
//       )}

//       {/* CONFIRM PASSWORD */}
//       <input
//         type="password"
//         className={inputClass("confirmPassword")}
//         placeholder="Confirm Password"
//         value={formData.confirmPassword}
//         onChange={(e) =>
//           setFormData({ ...formData, confirmPassword: e.target.value })
//         }
//       />
//       {errors.confirmPassword && (
//         <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
//       )}

//       {/* ROLE */}
//       <select
//         className={inputClass("role")}
//         value={formData.role}
//         onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//       >
//         <option value="">Select Role</option>
//         <option value="customer">Customer</option>
//         <option value="worker">Worker</option>
//       </select>
//       {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

//       {/* LOCATION */}
//       <input
//         className={inputClass("location")}
//         placeholder="Location"
//         value={formData.location}
//         onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//       />
//       {errors.location && (
//         <p className="text-red-500 text-xs">{errors.location}</p>
//       )}
//       {/* PHONE */}
//       <input
//         className={inputClass("phone")}
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//       />
//       {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

//       <button
//         disabled={loading}
//         className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl font-semibold"
//       >
//         {loading ? "Creating..." : "Create Account"}
//       </button>
//       <p className="text-center text-sm text-gray-500 mt-4">
//         Already have an account?{" "}
//         <a
//           href="/login"
//           className="text-green-500 font-semibold hover:underline"
//         >
//           Login
//         </a>
//       </p>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
    phone: "",
  });

  // ⏱ TIMER LOGIC
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

  // ✅ VALIDATION
  const validate = () => {
    const e = {};

    if (!formData.fullName.trim()) e.fullName = "Full name required";
    if (!formData.email.trim()) e.email = "Email required";
    if (!formData.password) e.password = "Password required";
    if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!formData.role) e.role = "Select role";
    if (!formData.phone) e.phone = "Phone required";
    if (!formData.location) e.location = "Location required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // 📩 SEND OTP
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

  // ✅ VERIFY OTP + REGISTER
  const handleVerifyOtp = async () => {
    try {
      setLoading(true);

      await axios.post(`${API_BASE}/verifyotp`, {
        email: formData.email,
        otp: otp,
        ...formData,
      });

      toast.success("Account created successfully 🎉");

      // reset
      setStep(1);
      setOtp("");
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
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mb-3 px-4 py-3 border rounded-xl text-sm border-gray-200";

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {step === 1 ? "Create Account" : "Verify OTP"}
      </h1>

      {/* STEP 1 FORM */}
      {step === 1 && (
        <>
          <input
            className={inputClass}
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />

          <input
            className={inputClass}
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            className={inputClass}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

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

          <select
            className={inputClass}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="worker">Worker</option>
          </select>

          <input
            className={inputClass}
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
          />

          <input
            className={inputClass}
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
          >
            {loading ? "Sending..." : "Send OTP"}
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
        </>
      )}

      {/* STEP 2 OTP */}
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
        </>
      )}
    </div>
  );
}
