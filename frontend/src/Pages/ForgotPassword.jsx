import { useState } from "react";
import { Mail, ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const inputStyle =
    "w-full h-14 rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm sm:text-base transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400";

  const handleSendOtp = async () => {
    try {
      if (!email) {
        setMessage("Please enter your email");
        return;
      }

      setLoading(true);

      const response = await fetch("http://localhost:5000/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      setLoading(false);
      setMessage(data.message);

      if (response.ok && data.message === " OTP has been sent") {
        setStep(2);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Something went wrong");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    setMessage("OTP entered successfully");
    setStep(3);
  };

  // RESET PASSWORD
  // const handleResetPassword = async () => {
  //   if (!newPassword || !confirmPassword) {
  //     setMessage("Please fill all fields");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setMessage("Passwords do not match");
  //     return;
  //   }

  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //     setMessage("Password reset successful");

  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1500);
  //   }, 1500);
  // };
  const handleResetPassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        setMessage("Please fill all fields");
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await fetch("http://localhost:5000/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      setLoading(false);
      setMessage(data.message);

      if (response.ok) {
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      setMessage("Reset failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Reset your account password securely
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                step >= item ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* STEP 1 - EMAIL */}
        {step === 1 && (
          <>
            <div className="relative mb-5">
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage("");
                }}
                className={inputStyle}
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 - OTP */}
        {step === 2 && (
          <>
            <div className="relative mb-5">
              <ShieldCheck
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setMessage("");
                }}
                className={inputStyle}
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition-all duration-200"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3 - RESET PASSWORD */}
        {step === 3 && (
          <>
            {/* NEW PASSWORD */}
            <div className="relative mb-5">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setMessage("");
                }}
                className={`${inputStyle} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative mb-5">
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMessage("");
                }}
                className={`${inputStyle} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

        {/* MESSAGE */}
        {message && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-700">
            {message}
          </div>
        )}

        {/* BACK TO LOGIN */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-green-500 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
