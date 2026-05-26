// import { useState } from "react";
// import { Mail, ShieldCheck, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function ForgotPassword() {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1);

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");

//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const handleBack = () => {
//     if (step === 1) {
//       navigate("/login");
//     } else {
//       setStep((prev) => prev - 1);
//     }
//   };
//   const inputStyle =
//     "w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm sm:text-base transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400";
//   const handleSendOtp = async () => {
//     try {
//       if (!email) {
//         setMessage("Please enter your email");
//         return;
//       }

//       setLoading(true);

//       const response = await fetch("http://localhost:5000/forgotpassword", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       setLoading(false);
//       setMessage(data.message);

//       // MOVE TO OTP SCREEN
//       if (response.ok) {
//         setStep(2);
//       }
//     } catch (error) {
//       setLoading(false);
//       setMessage("Something went wrong");
//     }
//   };

//   // const handleVerifyOtp = async () => {
//   //   if (!otp) {
//   //     setMessage("Please enter OTP");
//   //     return;
//   //   }

//   //   setMessage("OTP entered successfully");
//   //   setStep(3);
//   // };
//   const handleVerifyOtp = async () => {
//     try {
//       if (!otp) {
//         setMessage("Please enter OTP");
//         return;
//       }

//       setLoading(true);

//       const response = await fetch(
//         "http://localhost:5000/verifyresetpassword",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email,
//             otp,
//           }),
//         },
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("OTP verified successfully");
//         setStep(3); // Move to reset password page
//       } else {
//         setMessage(data.message || "Invalid OTP");
//       }
//     } catch (error) {
//       setMessage("OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleResetPassword = async () => {
//     try {
//       if (!newPassword || !confirmPassword) {
//         toast.error("Please fill all fields");
//         return;
//       }

//       if (newPassword !== confirmPassword) {
//         toast.error("Passwords do not match");
//         return;
//       }

//       setLoading(true);

//       const response = await fetch("http://localhost:5000/resetpassword", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           otp,
//           newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Password reset successful");

//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       } else {
//         toast.error(data.message || "Reset failed");
//       }
//     } catch (error) {
//       toast.error("Reset failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-6">
//       <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
//         <div className="mb-6">
//           <button
//             onClick={handleBack}
//             className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-green-50 border border-gray-200 hover:border-green-300 transition-all duration-300"
//           >
//             <ArrowLeft
//               size={18}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             <span className="font-medium text-gray-700 group-hover:text-green-600">
//               {step === 1 ? "Back to Login" : "Back"}
//             </span>
//           </button>
//         </div>
//         {/* HEADER */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-gray-900">
//             Forgot Password
//           </h2>

//           <p className="mt-2 text-sm text-gray-500">
//             Reset your account password securely
//           </p>
//         </div>

//         {/* STEP INDICATOR */}
//         <div className="flex items-center justify-center gap-3 mb-8">
//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className={`h-3 w-3 rounded-full transition-all duration-300 ${
//                 step >= item ? "bg-green-500" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>

//         {/* STEP 1 - EMAIL */}
//         {step === 1 && (
//           <>
//             <div className="relative mb-5">
//               <Mail
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="email"
//                 placeholder="Enter registered email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setMessage("");
//                 }}
//                 className={inputStyle}
//               />
//             </div>

//             <button
//               onClick={handleSendOtp}
//               disabled={loading}
//               className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-200"
//             >
//               {loading ? "Sending OTP..." : "Send OTP"}
//             </button>
//           </>
//         )}

//         {/* STEP 2 - OTP */}
//         {step === 2 && (
//           <>
//             <div className="relative mb-5">
//               <ShieldCheck
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type="text"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => {
//                   setOtp(e.target.value);
//                   setMessage("");
//                 }}
//                 className={inputStyle}
//               />
//             </div>

//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading}
//               className="w-full h-14 rounded-2xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition-all duration-200"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </>
//         )}

//         {/* STEP 3 - RESET PASSWORD */}
//         {step === 3 && (
//           <>
//             {/* NEW PASSWORD */}
//             <div className="relative mb-5">
//               <Lock
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => {
//                   setNewPassword(e.target.value);
//                   setMessage("");
//                 }}
//                 className={`${inputStyle} pr-12`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             {/* CONFIRM PASSWORD */}
//             <div className="relative mb-5">
//               <Lock
//                 size={20}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//               />

//               <input
//                 type={showConfirm ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={(e) => {
//                   setConfirmPassword(e.target.value);
//                   setMessage("");
//                 }}
//                 className={`${inputStyle} pr-12`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowConfirm(!showConfirm)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <button
//               onClick={handleResetPassword}
//               disabled={loading}
//               className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-200"
//             >
//               {loading ? "Updating..." : "Reset Password"}
//             </button>
//           </>
//         )}

//         {/* MESSAGE */}
//         {message && (
//           <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-700">
//             {message}
//           </div>
//         )}

//         {/* BACK TO LOGIN */}
//         <p className="mt-6 text-center text-sm text-gray-500">
//           Back to{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="cursor-pointer font-semibold text-green-500 hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Mail, ShieldCheck, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email) return toast.error("Enter email");

    try {
      setLoading(true);

      const { data } = await api.post("/forgotpassword", {
        email: form.email,
      });

      toast.success(data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!form.otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const { data } = await api.post("/verifyresetpassword", {
        email: form.email,
        otp: form.otp,
      });

      toast.success(data.message || "OTP verified");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!form.newPassword || !form.confirmPassword)
      return toast.error("Fill all fields");

    if (form.newPassword !== form.confirmPassword)
      return toast.error("Passwords do not match");

    if (form.newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      setLoading(true);

      const { data } = await api.post("/resetpassword", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });

      toast.success(data.message || "Password reset successful");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 1) return navigate("/login");
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        {/* Back */}
        <button onClick={handleBack} className="mb-4 flex items-center gap-2">
          <ArrowLeft size={18} />
          Back
        </button>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-3 pl-10 rounded-xl"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-green-500 text-white p-3 rounded-xl"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <div className="relative mb-4">
              <ShieldCheck className="absolute left-3 top-3 text-gray-400" />
              <input
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full border p-3 pl-10 rounded-xl"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-blue-500 text-white p-3 rounded-xl"
            >
              Verify OTP
            </button>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <div className="relative mb-3">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={show.password ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border p-3 pl-10 rounded-xl"
                placeholder="New Password"
              />
              <button
                onClick={() => setShow({ ...show, password: !show.password })}
              >
                {show.password ? <EyeOff /> : <Eye />}
              </button>
            </div>

            <input
              type={show.confirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-3"
              placeholder="Confirm Password"
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-purple-500 text-white p-3 rounded-xl"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}
