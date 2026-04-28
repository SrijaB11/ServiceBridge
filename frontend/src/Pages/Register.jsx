// import { useState } from "react";

// import axios from "axios";

// import {
//   Shield,
//   Lock,
//   Zap,
//   User,
//   Mail,
//   Eye,
//   EyeOff,
//   Phone,
//   MapPin,
//   BookOpen,
//   Wrench,
//   ChevronRight,
//   Check,
//   Plus,
//   HardHat,
//   TrendingUp,
//   ArrowLeft,
// } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const authService = {
//   register: async (payload) => {
//     console.log("API_BASE:", API_BASE);

//     const { data } = await axios.post(`${API_BASE}/register`, payload);
//     return data;
//   },
//   checkEmail: async (email) => {
//     const { data } = await axios.post(`${API_BASE}/auth/check-email`, {
//       email,
//     });
//     return data;
//     return { available: true };
//   },
// };

// function Stepper({ currentStep }) {
//   const steps = [
//     { num: 1, label: "Basic Info" },
//     { num: 2, label: "Choose Role" },
//     { num: 3, label: "Additional Info" },
//   ];
//   return (
//     <div className="flex items-center justify-center gap-0 mb-8">
//       {steps.map((step, idx) => (
//         <div key={step.num} className="flex items-center">
//           <div className="flex flex-col items-center">
//             <div
//               className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
//                 currentStep > step.num
//                   ? "bg-green-500 border-green-500 text-white"
//                   : currentStep === step.num
//                     ? "bg-green-500 border-green-500 text-white shadow-lg shadow-green-200"
//                     : "bg-white border-gray-300 text-gray-400"
//               }`}
//             >
//               {currentStep > step.num ? (
//                 <Check size={16} strokeWidth={3} />
//               ) : (
//                 step.num
//               )}
//             </div>
//             <span
//               className={`text-xs mt-1 font-medium ${
//                 currentStep === step.num ? "text-gray-800" : "text-gray-400"
//               }`}
//             >
//               {step.label}
//             </span>
//           </div>
//           {idx < steps.length - 1 && (
//             <div
//               className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-all duration-500 ${
//                 currentStep > step.num + 0 ? "bg-green-500" : "bg-gray-200"
//               }`}
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// function LeftPanel({ page }) {
//   const page1 = {
//     tag: null,
//     heading: (
//       <>
//         Join Thousands of{" "}
//         <span className="block font-extrabold text-gray-900">
//           Happy Customers
//         </span>
//         <span className="font-extrabold">
//           &amp; <span className="text-green-500">Trusted Workers</span>
//         </span>
//       </>
//     ),
//     sub: "Create your account and connect with skilled professionals near you. Get your work done quickly and easily.",
//     features: [
//       {
//         icon: <Shield size={18} className="text-green-500" />,
//         bg: "bg-green-50",
//         border: "border-green-200",
//         title: "Verified Professionals",
//         desc: "All workers are verified and trusted",
//       },
//       {
//         icon: <Lock size={18} className="text-purple-500" />,
//         bg: "bg-purple-50",
//         border: "border-purple-200",
//         title: "Secure & Safe",
//         desc: "Your data and payments are secure",
//       },
//       {
//         icon: <Zap size={18} className="text-yellow-500" />,
//         bg: "bg-yellow-50",
//         border: "border-yellow-200",
//         title: "Quick & Easy",
//         desc: "Simple process, just a few steps away",
//       },
//     ],
//   };

//   const page2 = {
//     tag: "Step 3 of 3",
//     heading: (
//       <>
//         Build Your <span className="text-green-500 block">Trusted Profile</span>
//       </>
//     ),
//     sub: "Complete your profile to unlock better visibility and trust.",
//     features: [
//       {
//         icon: <Shield size={18} className="text-green-500" />,
//         bg: "bg-green-50",
//         border: "border-green-200",
//         title: "Verified Identity",
//         desc: "Build trust with verified identity & documents.",
//       },
//       {
//         icon: <TrendingUp size={18} className="text-purple-500" />,
//         bg: "bg-purple-50",
//         border: "border-purple-200",
//         title: "More Job Visibility",
//         desc: "Get discovered by more customers and businesses.",
//       },
//       {
//         icon: <Zap size={18} className="text-yellow-500" />,
//         bg: "bg-yellow-50",
//         border: "border-yellow-200",
//         title: "Faster Hiring",
//         desc: "Complete profile helps you get hired quickly.",
//       },
//     ],
//   };

//   const data = page === 1 ? page1 : page2;

//   return (
//     <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-50 to-blue-50 p-10 rounded-2xl min-h-full">
//       <div>
//         <div className="flex items-center gap-2 mb-10">
//           <img
//             src="/logo-placeholder.png"
//             alt="Service Bridge Logo"
//             className="w-10 h-10 object-contain"
//             onError={(e) => {
//               e.target.style.display = "none";
//               e.target.nextSibling.style.display = "flex";
//             }}
//           />

//           <img src="/images/logo.png" alt="logo" className="w-18 h-14" />

//           <span className="text-xl font-bold">
//             Service <span className="text-green-500">Bridge</span>
//           </span>
//         </div>

//         {data.tag && (
//           <span className="text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full mb-4 inline-block">
//             {data.tag}
//           </span>
//         )}

//         <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
//           {data.heading}
//         </h2>
//         <p className="text-gray-500 text-sm mb-8">{data.sub}</p>

//         <div className="space-y-4">
//           {data.features.map((f, i) => (
//             <div key={i} className="flex items-start gap-3">
//               <div
//                 className={`w-9 h-9 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center flex-shrink-0`}
//               >
//                 {f.icon}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
//                 <p className="text-gray-500 text-xs">{f.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-10">
//         <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center">
//           <img
//             src="/images/worker.png"
//             className="h-50 object-contain"
//             alt="Worker"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function InputField({ label, icon, error, type = "text", ...props }) {
//   const [show, setShow] = useState(false);
//   const isPassword = type === "password";

//   return (
//     <div className="mb-4">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//           {icon}
//         </span>
//         <input
//           {...props}
//           type={isPassword ? (show ? "text" : "password") : type}
//           className={`w-full pl-10 pr-${isPassword ? "10" : "4"} py-3 border rounded-xl text-sm bg-white outline-none transition-all
//             ${error ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
//             placeholder:text-gray-400`}
//         />
//         {isPassword && (
//           <button
//             type="button"
//             onClick={() => setShow((s) => !s)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {show ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         )}
//       </div>
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// }

// function Page1({ formData, setFormData, errors, setErrors, onNext }) {
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

//     if (!formData.role) e.role = "Please choose a role";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = (ev) => {
//     ev.preventDefault();
//     if (validate()) onNext();
//   };

//   return (
//     <form onSubmit={handleNext} noValidate>
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Create Your Account
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Join Service Bridge and start your journey
//         </p>
//       </div>

//       <Stepper currentStep={formData.role ? 2 : 1} />

//       <InputField
//         label="Full Name"
//         icon={<User size={16} />}
//         placeholder="Enter your full name"
//         value={formData.fullName}
//         onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//         error={errors.fullName}
//       />
//       <InputField
//         label="Email Address"
//         icon={<Mail size={16} />}
//         type="email"
//         placeholder="Enter your email address"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         error={errors.email}
//       />
//       <InputField
//         label="Password"
//         icon={<Lock size={16} />}
//         type="password"
//         placeholder="Create a password"
//         value={formData.password}
//         onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//         error={errors.password}
//       />
//       <InputField
//         label="Confirm Password"
//         icon={<Lock size={16} />}
//         type="password"
//         placeholder="Confirm your password"
//         value={formData.confirmPassword}
//         onChange={(e) =>
//           setFormData({ ...formData, confirmPassword: e.target.value })
//         }
//         error={errors.confirmPassword}
//       />

//       <div className="mb-5">
//         <label className="block text-sm font-medium text-gray-700 mb-3">
//           Choose Your Role
//         </label>
//         <div className="grid grid-cols-2 gap-3">
//           {[
//             {
//               value: "customer",
//               label: "I am a Customer",
//               sub: "I want to hire skilled professionals",
//               icon: <User size={28} className="text-green-500" />,
//             },
//             {
//               value: "worker",
//               label: "I am a Worker",
//               sub: "I want to offer my services",
//               icon: <HardHat size={28} className="text-purple-500" />,
//             },
//           ].map((r) => (
//             <button
//               key={r.value}
//               type="button"
//               onClick={() => setFormData({ ...formData, role: r.value })}
//               className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
//                 formData.role === r.value
//                   ? "border-green-500 bg-green-50"
//                   : "border-gray-200 bg-white hover:border-gray-300"
//               }`}
//             >
//               {formData.role === r.value && (
//                 <span className="absolute top-3 right-3 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
//                   <Check size={12} className="text-white" strokeWidth={3} />
//                 </span>
//               )}
//               {!formData.role || formData.role !== r.value ? (
//                 <span className="absolute top-3 right-3 w-5 h-5 border-2 border-gray-300 rounded-full" />
//               ) : null}
//               <div className="flex flex-col items-center text-center gap-2">
//                 <div
//                   className={`w-14 h-14 rounded-full flex items-center justify-center ${
//                     r.value === "customer" ? "bg-green-100" : "bg-purple-100"
//                   }`}
//                 >
//                   {r.icon}
//                 </div>
//                 <p className="font-semibold text-sm text-gray-800">{r.label}</p>
//                 <p className="text-xs text-gray-500">{r.sub}</p>
//               </div>
//             </button>
//           ))}
//         </div>
//         {errors.role && (
//           <p className="text-red-500 text-xs mt-1">{errors.role}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-95"
//       >
//         Next Step <ChevronRight size={18} />
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

// function Page2({
//   formData,
//   setFormData,
//   errors,
//   setErrors,
//   onBack,
//   onSubmit,
//   loading,
// }) {
//   const availableServices = [
//     { label: "Electrician", icon: <Zap size={13} /> },
//     { label: "Plumber", icon: <Wrench size={13} /> },
//     { label: "Tutor", icon: <BookOpen size={13} /> },
//     { label: "Carpenter", icon: <Wrench size={13} /> },

    
//     { label: "Painter", icon: <Wrench size={13} /> },
//     { label: "Cleaner", icon: <Shield size={13} /> },
//   ];

//   const toggleService = (svc) => {
//     const list = formData.services || [];
//     setFormData({
//       ...formData,
//       services: list.includes(svc)
//         ? list.filter((s) => s !== svc)
//         : [...list, svc],
//     });
//   };

//   const validate = () => {
//     const e = {};
//     if (!formData.location.trim()) e.location = "Location is required";
//     if (!formData.phone.trim()) e.phone = "Phone number is required";
//     else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone))
//       e.phone = "Enter a valid phone number";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     if (validate()) await onSubmit();
//   };

//   return (
//     <form onSubmit={handleSubmit} noValidate>
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           Complete Your Profile
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Almost there! Just a few more details.
//         </p>
//       </div>

//       <Stepper currentStep={3} />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Location
//           </label>
//           <div className="relative">
//             <MapPin
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Enter your city / area"
//               value={formData.location}
//               onChange={(e) =>
//                 setFormData({ ...formData, location: e.target.value })
//               }
//               className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none transition-all
//                 ${errors.location ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
//                 placeholder:text-gray-400`}
//             />
//           </div>
//           {errors.location && (
//             <p className="text-red-500 text-xs mt-1">{errors.location}</p>
//           )}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1.5">
//             Phone Number
//           </label>
//           <div className="relative">
//             <Phone
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="tel"
//               placeholder="Enter phone number"
//               value={formData.phone}
//               onChange={(e) =>
//                 setFormData({ ...formData, phone: e.target.value })
//               }
//               className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none transition-all
//                 ${errors.phone ? "border-red-400 focus:ring-2 focus:ring-red-100" : "border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"}
//                 placeholder:text-gray-400`}
//             />
//           </div>
//           {errors.phone && (
//             <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//           )}
//         </div>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Services{" "}
//           <span className="text-green-500 font-normal">(Optional)</span>
//         </label>
//         <div className="flex flex-wrap gap-2">
//           {availableServices.map((svc) => {
//             const active = (formData.services || []).includes(svc.label);
//             return (
//               <button
//                 key={svc.label}
//                 type="button"
//                 onClick={() => toggleService(svc.label)}
//                 className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
//                   active
//                     ? "bg-green-50 border-green-400 text-green-700"
//                     : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
//                 }`}
//               >
//                 {svc.icon}
//                 {svc.label}
//                 {active && (
//                   <Check size={11} strokeWidth={3} className="text-green-500" />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="mb-5">
//         <label className="block text-sm font-medium text-gray-700 mb-1.5">
//           Address <span className="text-green-500 font-normal"></span>
//         </label>
//         <div className="relative">
//           <BookOpen
//             size={16}
//             className="absolute left-3 top-3.5 text-gray-400"
//           />
//           <textarea
//             rows={4}
//             placeholder="Enter your full address"
//             value={formData.address}
//             onChange={(e) =>
//               setFormData({ ...formData, address: e.target.value })
//             }
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400 resize-none"
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
//       >
//         {loading ? (
//           <svg
//             className="animate-spin h-5 w-5 text-white"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v8z"
//             />
//           </svg>
//         ) : (
//           <>
//             Create Account <ChevronRight size={18} />
//           </>
//         )}
//       </button>

//       <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
//         <Shield size={13} className="text-green-400" />
//         Your information is safe and secure with us.
//       </div>

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
// export default function ServiceBridgeRegister({ onSuccess }) {
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//     location: "",
//     phone: "",
//     services: [],
//     address: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleSubmit = async () => {
//     setLoading(true);
//     setApiError("");
//     try {
//       const payload = {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//         role: formData.role,
//         location: formData.location,
//         phone: formData.phone,
//         services: formData.services,
//         address: formData.address,
//       };
//       const result = await authService.register(payload);
//       setSuccessMsg("Account created successfully! Redirecting...");
//       if (onSuccess) onSuccess(result);
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         "Something went wrong. Please try again.";
//       setApiError(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (successMsg) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-sm mx-auto">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Check size={32} className="text-green-500" strokeWidth={3} />
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">
//             You're all set!
//           </h2>
//           <p className="text-gray-500 text-sm">{successMsg}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
//         <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[680px]">
//           {/* Left Panel */}
//           <div className="lg:col-span-2 p-6 lg:p-8">
//             <LeftPanel page={page} />
//           </div>

//           <div className="lg:col-span-3 p-6 lg:p-10 border-l border-gray-100 flex flex-col justify-center">
//             {page === 2 && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPage(1);
//                   setErrors({});
//                 }}
//                 className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors self-start"
//               >
//                 <ArrowLeft size={16} /> Back
//               </button>
//             )}

//             {apiError && (
//               <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
//                 {apiError}
//               </div>
//             )}

//             {page === 1 ? (
//               <Page1
//                 formData={formData}
//                 setFormData={setFormData}
//                 errors={errors}
//                 setErrors={setErrors}
//                 onNext={() => {
//                   setPage(2);
//                   setErrors({});
//                 }}
//               />
//             ) : (
//               <Page2
//                 formData={formData}
//                 setFormData={setFormData}
//                 errors={errors}
//                 setErrors={setErrors}
//                 onBack={() => {
//                   setPage(1);
//                   setErrors({});
//                 }}
//                 onSubmit={handleSubmit}
//                 loading={loading}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
