// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export default function RegisterForm() {
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [step, setStep] = useState(1);
//   const [otp, setOtp] = useState("");
//   const [timer, setTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     location: "",
//     phone: "",
//   });

//   // TIMER
//   useEffect(() => {
//     let interval;

//     if (step === 2 && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     }

//     if (timer === 0) {
//       setCanResend(true);
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [step, timer]);

//   // VALIDATION
//   const validate = () => {
//     const e = {};

//     if (!formData.fullName.trim()) {
//       e.fullName = "Full name required";
//     } else if (formData.fullName.length < 3) {
//       e.fullName = "Name must be at least 3 characters";
//     }

//     if (!formData.email.trim()) {
//       e.email = "Email required";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         e.email = "Invalid email format";
//       }
//     }

//     if (!formData.password) {
//       e.password = "Password required";
//     } else if (formData.password.length < 6) {
//       e.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       e.confirmPassword = "Confirm password required";
//     } else if (formData.password !== formData.confirmPassword) {
//       e.confirmPassword = "Passwords do not match";
//     }

//     if (!formData.role) {
//       e.role = "Select role";
//     }

//     if (!formData.phone) {
//       e.phone = "Phone required";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       e.phone = "Enter valid 10-digit phone";
//     }

//     if (!formData.location.trim()) {
//       e.location = "Location required";
//     }

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   // SEND OTP
//   const handleSendOtp = async () => {
//     if (!validate()) return;

//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/registerotp`, formData);

//       toast.success("OTP sent to your email");
//       setStep(2);
//       setTimer(30);
//       setCanResend(false);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/verifyotp`, {
//         email: formData.email,
//         otp,
//         ...formData,
//       });

//       toast.success("Account created successfully");
//       navigate("/login");

//       setFormData({
//         fullName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//         phone: "",
//         location: "",
//       });
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Invalid OTP");
//       //  if (message === "User not found" || message === "Invalid email") {
//       //     setStep(1);
//       //   } else {
//       //     setOtp("");
//       //   }
//       setOtp("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-3 border rounded-xl text-sm border-gray-200";

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-center">
//         {step === 1 ? "Create Account" : "Verify OTP"}
//       </h1>

//       {step === 1 && (
//         <div className="space-y-4">
//           <input
//             className={inputClass}
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={(e) =>
//               setFormData({ ...formData, fullName: e.target.value })
//             }
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm">{errors.fullName}</p>
//           )}

//           <input
//             className={inputClass}
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm">{errors.email}</p>
//           )}

//           <input
//             type="password"
//             className={inputClass}
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm">{errors.password}</p>
//           )}

//           <input
//             type="password"
//             className={inputClass}
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 confirmPassword: e.target.value,
//               })
//             }
//           />
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
//           )}

//           <select
//             className={inputClass}
//             value={formData.role}
//             onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           >
//             <option value="">Select Role</option>
//             <option value="customer">Customer</option>
//             <option value="worker">Worker</option>
//           </select>
//           {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

//           <input
//             className={inputClass}
//             placeholder="Location"
//             value={formData.location}
//             onChange={(e) =>
//               setFormData({ ...formData, location: e.target.value })
//             }
//           />
//           {errors.location && (
//             <p className="text-red-500 text-sm">{errors.location}</p>
//           )}

//           <input
//             className={inputClass}
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm">{errors.phone}</p>
//           )}

//           <button
//             onClick={handleSendOtp}
//             disabled={loading}
//             className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
//           >
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </div>
//       )}

//       {step === 2 && (
//         <>
//           <input
//             className={inputClass}
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />

//           <button
//             onClick={handleVerifyOtp}
//             disabled={loading}
//             className="w-full mt-4 bg-green-500 text-white py-3 rounded-xl"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>

//           <p className="text-sm text-center mt-2 text-gray-500">
//             {timer > 0 ? `Resend OTP in ${timer}s` : "Didn't receive OTP?"}
//           </p>

//           <button
//             onClick={handleSendOtp}
//             disabled={!canResend}
//             className={`w-full mt-2 py-2 rounded-xl ${
//               canResend ? "bg-blue-500 text-white" : "bg-gray-300"
//             }`}
//           >
//             Resend OTP
//           </button>
//           <button
//             onClick={() => {
//               setStep(1);
//               setOtp("");
//             }}
//             className="w-full py-2 text-sm text-blue-500 hover:text-blue-700 transition"

//             //className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//           >
//             Change Email
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// import { useState, useMemo } from "react";
// import axios from "axios";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   MapPin,
//   Eye,
//   EyeOff,
//   CheckCircle,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import cities from "cities.json";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// export default function RegisterForm() {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [showOtpField, setShowOtpField] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [toast, setToast] = useState({
//     show: false,
//     msg: "",
//     type: "success",
//   });

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     phone: "",
//   });

//   const showToast = (msg, type = "success") => {
//     setToast({ show: true, msg, type });
//     setTimeout(() => setToast({ ...toast, show: false }), 3000);
//   };

//   // SEND OTP
//   const handleSendOtp = async () => {
//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/registerotp`, {
//         email: formData.email,
//       });

//       showToast("OTP sent successfully");
//       setShowOtpField(true);
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Invalid Email", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/verifyotp`, {
//         email: formData.email,
//         otp,
//       });

//       showToast("Email verified ✅");
//       setEmailVerified(true);
//       setShowOtpField(false);
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Invalid OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // REGISTER
//   const handleRegister = async () => {
//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/register`, formData);

//       showToast("Account created ");
//       navigate("/login");
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Error", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ city list (optimized)
//   const cityNames = useMemo(() => {
//     return [
//       ...new Set(cities.filter((c) => c.country === "IN").map((c) => c.name)),
//     ];
//   }, []);

//   // ✅ filter function
//   const filterOptions = (options, state) => {
//     const input = state.inputValue.toLowerCase();

//     return options
//       .filter((option) => option.toLowerCase().includes(input))
//       .slice(0, 5);
//   };

//   const inputStyle =
//     "w-full h-12 border border-gray-200 rounded-xl bg-gray-50 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent";

//   return (
//     <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
//         {/* HEADING */}
//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
//           <p className="mt-2 text-sm text-gray-500">
//             Register to continue as customer
//           </p>
//         </div>

//         {/* FULL NAME */}
//         <div className="relative mb-5">
//           <User
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />
//           <input
//             className={`${inputStyle} pl-11`}
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={(e) =>
//               setFormData({ ...formData, fullName: e.target.value })
//             }
//           />
//         </div>

//         {/* EMAIL */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-5">
//           <div className="relative flex-1">
//             <Mail
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               disabled={emailVerified}
//               className={`${inputStyle} pl-11 pr-10`}
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             />

//             {emailVerified && (
//               <CheckCircle
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
//                 size={18}
//               />
//             )}
//           </div>

//           {!emailVerified && (
//             <button
//               onClick={handleSendOtp}
//               className="h-12 px-5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200 whitespace-nowrap"
//             >
//               Send OTP
//             </button>
//           )}
//         </div>

//         {/* OTP */}
//         {showOtpField && !emailVerified && (
//           <div className="flex flex-col sm:flex-row gap-3 mb-5">
//             <input
//               className={inputStyle}
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <button
//               onClick={handleVerifyOtp}
//               className="h-12 px-5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200"
//             >
//               Verify
//             </button>
//           </div>
//         )}

//         {/* PASSWORD */}
//         <div className="relative mb-5">
//           <Lock
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />

//           <input
//             type={showPassword ? "text" : "password"}
//             className={`${inputStyle} pl-11 pr-11`}
//             placeholder="Password (min 6 chars)"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />

//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {/* CONFIRM PASSWORD */}
//         <div className="relative mb-5">
//           <Lock
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />

//           <input
//             type={showConfirm ? "text" : "password"}
//             className={`${inputStyle} pl-11 pr-11`}
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 confirmPassword: e.target.value,
//               })
//             }
//           />

//           <button
//             type="button"
//             onClick={() => setShowConfirm(!showConfirm)}
//             className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//           >
//             {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {/* LOCATION - SINGLE BOX ONLY */}
//         <div className="relative mb-5">
//           <MapPin
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
//             size={18}
//           />

//           <Autocomplete
//             options={cityNames}
//             value={formData.location}
//             onChange={(event, newValue) => {
//               setFormData({
//                 ...formData,
//                 location: newValue || "",
//               });
//             }}
//             filterOptions={(options, state) => {
//               const input = state.inputValue.toLowerCase();

//               return options.filter((option) =>
//                 option.toLowerCase().includes(input),
//               );
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Select Location"
//                 fullWidth
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     height: "48px",
//                     borderRadius: "12px",
//                     backgroundColor: "#f9fafb",
//                     paddingLeft: "34px",
//                   },
//                   "& fieldset": {
//                     borderColor: "#e5e7eb",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "#22c55e",
//                   },
//                 }}
//               />
//             )}
//           />
//         </div>

//         {/* PHONE */}
//         <div className="relative mb-6">
//           <Phone
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={18}
//           />

//           <input
//             className={`${inputStyle} pl-11`}
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//           />
//         </div>

//         {/* REGISTER BUTTON */}
//         <button
//           onClick={handleRegister}
//           disabled={!emailVerified || loading}
//           className="w-full h-12 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           {loading ? "Processing..." : "Create Account"}
//         </button>

//         {/* LOGIN */}
//         <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
//           Already registered?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="font-semibold text-green-500  cursor-pointer hover:text-green-600 hover:underline transition"
//           >
//             Login
//           </span>
//         </p>
//       </div>

//       {/* TOAST */}
//       {toast.show && (
//         <div
//           className={`fixed top-5 right-5 z-50 rounded-xl px-5 py-3 shadow-xl text-white transition-all duration-300 ${
//             toast.type === "error" ? "bg-red-500" : "bg-green-500"
//           }`}
//         >
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useMemo } from "react";
// import axios from "axios";
// import {
//   Mail,
//   Lock,
//   User,
//   Phone,
//   MapPin,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   Briefcase,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// import cities from "cities.json";

// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const servicesList = [
//   "Plumber",
//   "Electrician",
//   "Painter",
//   "Cleaner",
//   "Carpenter",
//   "AC Repair",
//   "Appliance Repair",
//   "Home Cleaning",
// ];

// export default function AuthForm({
//   role = "customer",
//   title = "Create Account",
//   subtitle = "Register to continue",
// }) {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const [otp, setOtp] = useState("");

//   const [emailVerified, setEmailVerified] = useState(false);

//   const [showOtpField, setShowOtpField] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const [showConfirm, setShowConfirm] = useState(false);

//   const [toast, setToast] = useState({
//     show: false,
//     msg: "",
//     type: "success",
//   });

//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     location: "",
//     phone: "",
//     services: [],
//   });

//   // TOAST
//   const showToast = (msg, type = "success") => {
//     setToast({
//       show: true,
//       msg,
//       type,
//     });

//     setTimeout(() => {
//       setToast((prev) => ({
//         ...prev,
//         show: false,
//       }));
//     }, 3000);
//   };

//   // CITY LIST
//   const cityNames = useMemo(() => {
//     return [
//       ...new Set(cities.filter((c) => c.country === "IN").map((c) => c.name)),
//     ];
//   }, []);

//   // VALIDATION
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//     ) {
//       newErrors.email = "Invalid email";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Confirm password is required";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (!formData.location) {
//       newErrors.location = "Location is required";
//     }

//     if (!formData.phone) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^[0-9]{10}$/.test(formData.phone)) {
//       newErrors.phone = "Enter valid 10 digit phone";
//     }

//     if (role === "worker" && formData.services.length === 0) {
//       newErrors.services = "Please select at least one service";
//     }

//     setErrors(newErrors);

//     return Object.keys(newErrors).length === 0;
//   };

//   // SEND OTP
//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       showToast("Enter email first", "error");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/registerotp`, {
//         email: formData.email,
//       });

//       showToast("OTP sent successfully");

//       setShowOtpField(true);
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Failed to send OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // VERIFY OTP
//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       showToast("Enter OTP", "error");
//       return;
//     }

//     try {
//       setLoading(true);

//       await axios.post(`${API_BASE}/verifyotp`, {
//         email: formData.email,
//         otp,
//       });

//       showToast("Email verified");

//       setEmailVerified(true);

//       setShowOtpField(false);
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Invalid OTP", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // REGISTER
//   const handleRegister = async () => {
//     if (!validateForm()) return;

//     if (!emailVerified) {
//       showToast("Verify email first", "error");
//       return;
//     }

//     try {
//       setLoading(true);

//       const endpoint = role === "worker" ? "/worker/register" : "/register";

//       await axios.post(`${API_BASE}${endpoint}`, {
//         ...formData,
//         role,
//       });

//       showToast("Account created successfully");

//       navigate("/login");
//     } catch (err) {
//       showToast(err?.response?.data?.message || "Registration failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputStyle =
//     "w-full h-12 border border-gray-200 rounded-xl bg-gray-50 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent";

//   return (
//     <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
//         {/* HEADING */}
//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold text-gray-800">{title}</h2>

//           <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
//         </div>

//         {/* FULL NAME */}
//         <div className="mb-5">
//           <div className="relative">
//             <User
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               className={`${inputStyle} pl-11`}
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   fullName: e.target.value,
//                 })
//               }
//             />
//           </div>

//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         {/* EMAIL */}
//         <div className="mb-5">
//           <div className="flex flex-col sm:flex-row gap-3">
//             <div className="relative flex-1">
//               <Mail
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={18}
//               />

//               <input
//                 disabled={emailVerified}
//                 className={`${inputStyle} pl-11 pr-10`}
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     email: e.target.value,
//                   })
//                 }
//               />

//               {emailVerified && (
//                 <CheckCircle
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
//                   size={18}
//                 />
//               )}
//             </div>

//             {!emailVerified && (
//               <button
//                 onClick={handleSendOtp}
//                 disabled={loading}
//                 className="h-12 px-5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200 whitespace-nowrap"
//               >
//                 Send OTP
//               </button>
//             )}
//           </div>

//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* OTP */}
//         {showOtpField && !emailVerified && (
//           <div className="flex flex-col sm:flex-row gap-3 mb-5">
//             <input
//               className={inputStyle}
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />

//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="h-12 px-5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200"
//             >
//               Verify
//             </button>
//           </div>
//         )}

//         {/* PASSWORD */}
//         <div className="mb-5">
//           <div className="relative">
//             <Lock
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               type={showPassword ? "text" : "password"}
//               className={`${inputStyle} pl-11 pr-11`}
//               placeholder="Password"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   password: e.target.value,
//                 })
//               }
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </div>

//         {/* CONFIRM PASSWORD */}
//         <div className="mb-5">
//           <div className="relative">
//             <Lock
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               type={showConfirm ? "text" : "password"}
//               className={`${inputStyle} pl-11 pr-11`}
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   confirmPassword: e.target.value,
//                 })
//               }
//             />

//             <button
//               type="button"
//               onClick={() => setShowConfirm(!showConfirm)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//             >
//               {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">
//               {errors.confirmPassword}
//             </p>
//           )}
//         </div>

//         {/* LOCATION */}
//         <div className="mb-5 relative">
//           <MapPin
//             className="absolute left-4 top-4 text-gray-400 z-10"
//             size={18}
//           />

//           <Autocomplete
//             options={cityNames}
//             value={formData.location}
//             onChange={(event, newValue) => {
//               setFormData({
//                 ...formData,
//                 location: newValue || "",
//               });
//             }}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 placeholder="Select Location"
//                 fullWidth
//                 error={!!errors.location}
//                 helperText={errors.location}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: "12px",
//                     backgroundColor: "#f9fafb",
//                     paddingLeft: "34px",
//                   },
//                 }}
//               />
//             )}
//           />
//         </div>

//         {/* SERVICES */}
//         {role === "worker" && (
//           <div className="mb-5 relative">
//             <Briefcase
//               className="absolute left-4 top-4 text-gray-400 z-10"
//               size={18}
//             />

//             <Autocomplete
//               multiple
//               options={servicesList}
//               value={formData.services}
//               onChange={(event, newValue) => {
//                 setFormData({
//                   ...formData,
//                   services: newValue,
//                 });
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   placeholder="Select Services"
//                   fullWidth
//                   error={!!errors.services}
//                   helperText={errors.services}
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                       backgroundColor: "#f9fafb",
//                       paddingLeft: "34px",
//                     },
//                   }}
//                 />
//               )}
//             />
//           </div>
//         )}

//         {/* PHONE */}
//         <div className="mb-6">
//           <div className="relative">
//             <Phone
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />

//             <input
//               className={`${inputStyle} pl-11`}
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   phone: e.target.value,
//                 })
//               }
//             />
//           </div>

//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//           )}
//         </div>

//         {/* REGISTER BUTTON */}
//         <button
//           onClick={handleRegister}
//           disabled={loading}
//           className="w-full h-12 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
//         >
//           {loading
//             ? "Processing..."
//             : role === "worker"
//               ? "Register as Worker"
//               : "Create Account"}
//         </button>

//         {/* LOGIN */}
//         <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
//           Already registered?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="font-semibold text-green-500 cursor-pointer hover:text-green-600 hover:underline transition"
//           >
//             Login
//           </span>
//         </p>
//       </div>

//       {/* TOAST */}
//       {toast.show && (
//         <div
//           className={`fixed top-5 right-5 z-50 rounded-xl px-5 py-3 shadow-xl text-white transition-all duration-300 ${
//             toast.type === "error" ? "bg-red-500" : "bg-green-500"
//           }`}
//         >
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useMemo } from "react";
import axios from "axios";
import {
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  Briefcase,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import cities from "cities.json";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const servicesList = [
  "Plumber",
  "Electrician",
  "Painter",
  "Cleaner",
  "Carpenter",
  "AC Repair",
  "Appliance Repair",
  "Home Cleaning",
];

export default function RegisterForm({
  role = "customer",
  title = "Create Account",
  subtitle = "Register to continue",
}) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);

  const [showOtpField, setShowOtpField] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    msg: "",
    type: "success",
  });

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    phone: "",
    services: [],
  });

  // TOAST
  const showToast = (msg, type = "success") => {
    setToast({
      show: true,
      msg,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3000);
  };

  // CITY LIST
  const cityNames = useMemo(() => {
    return [
      ...new Set(cities.filter((c) => c.country === "IN").map((c) => c.name)),
    ];
  }, []);

  // VALIDATION
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.location) {
      newErrors.location = "Location is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid 10 digit phone";
    }

    if (role === "worker" && formData.services.length === 0) {
      newErrors.services = "Please select at least one service";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // SEND OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      showToast("Enter email first", "error");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/registerotp`, {
        email: formData.email,
      });

      showToast("OTP sent successfully");

      setShowOtpField(true);
    } catch (err) {
      showToast(err?.response?.data?.message || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      showToast("Enter OTP", "error");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/verifyotp`, {
        email: formData.email,
        otp,
      });

      showToast("Email verified");

      setEmailVerified(true);

      setShowOtpField(false);
    } catch (err) {
      showToast(err?.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    if (!validateForm()) return;

    if (!emailVerified) {
      showToast("Verify email first", "error");
      return;
    }

    try {
      setLoading(true);

      const endpoint = role === "worker" ? "/worker/register" : "/register";

      await axios.post(`${API_BASE}${endpoint}`, {
        ...formData,
        role,
      });

      showToast("Account created successfully");

      navigate("/login");
    } catch (err) {
      showToast(err?.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full h-12 border border-gray-200 rounded-xl bg-gray-50 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent";

  return (
    <div className="flex justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
        {/* HEADING */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>

          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        </div>

        {/* FULL NAME */}
        <div className="mb-5">
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              className={`${inputStyle} pl-11`}
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
            />
          </div>

          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                disabled={emailVerified}
                className={`${inputStyle} pl-11 pr-10`}
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              {emailVerified && (
                <CheckCircle
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500"
                  size={18}
                />
              )}
            </div>

            {!emailVerified && (
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="h-12 px-5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200 whitespace-nowrap"
              >
                Send OTP
              </button>
            )}
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* OTP */}
        {showOtpField && !emailVerified && (
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              className={inputStyle}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="h-12 px-5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all duration-200"
            >
              Verify
            </button>
          </div>
        )}

        {/* PASSWORD */}
        <div className="mb-5">
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              className={`${inputStyle} pl-11 pr-11`}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-5">
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showConfirm ? "text" : "password"}
              className={`${inputStyle} pl-11 pr-11`}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* LOCATION */}
        <div className="mb-5 relative">
          <MapPin
            className="absolute left-4 top-4 text-gray-400 z-10"
            size={18}
          />

          <Autocomplete
            options={cityNames}
            value={formData.location}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                location: newValue || "",
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Location"
                fullWidth
                error={!!errors.location}
                helperText={errors.location}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                    paddingLeft: "34px",
                  },
                }}
              />
            )}
          />
        </div>

        {/* SERVICES */}
        {role === "worker" && (
          <div className="mb-5 relative">
            <Briefcase
              className="absolute left-4 top-4 text-gray-400 z-10"
              size={18}
            />

            <Autocomplete
              multiple
              options={servicesList}
              value={formData.services}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  services: newValue,
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select Services"
                  fullWidth
                  error={!!errors.services}
                  helperText={errors.services}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "#f9fafb",
                      paddingLeft: "34px",
                    },
                  }}
                />
              )}
            />
          </div>
        )}

        {/* PHONE */}
        <div className="mb-6">
          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              className={`${inputStyle} pl-11`}
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />
          </div>

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-green-500 text-white font-semibold shadow-md hover:bg-green-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading
            ? "Processing..."
            : role === "worker"
              ? "Register as Worker"
              : "Create Account"}
        </button>

        {/* LOGIN */}
        <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
          Already registered?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-semibold text-green-500 cursor-pointer hover:text-green-600 hover:underline transition"
          >
            Login
          </span>
        </p>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 rounded-xl px-5 py-3 shadow-xl text-white transition-all duration-300 ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
