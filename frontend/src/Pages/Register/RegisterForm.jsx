import { useState, useMemo } from "react";
import axios from "axios";
import { useEffect } from "react";
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

//import cities from "cities.json";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
const servicesList = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "AC Repair",
  "Painting",
  "Floor Cleaning",
  "Washroom Cleaning",
  "Washing Machine Repair",
  "Refrigerator Repair",
  "TV Repair",
  "Pest Control",
  "Water Purifier Repair",
  "Stove & Microwave Repair",
  "Salon Men and Women",
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
  const [passwordFocused, setPasswordFocused] = useState(false);
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
  // const cityNames = useMemo(() => {
  //   return [
  //     ...new Set(cities.filter((c) => c.country === "IN").map((c) => c.name)),
  //   ];
  // }, []);
  const cityNames = [
    "Madhapur",
    "Hitech City",
    "Gachibowli",
    "Kukatpally",
    "Ameerpet",
    "Banjara Hills",
    "Jubilee Hills",
    "Charminar",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Mahabubnagar",
    "Siddipet",
    "Medchal",
    "Shamshabad",
    "LB Nagar",
    "Uppal",
  ];

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

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // } else if (formData.password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters";
    // }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Include at least 1 uppercase letter and 1 number";
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
    if (emailVerified || localStorage.getItem("verifiedEmail")) {
      showToast("Email already verified", "error");
      return;
    }
    try {
      setLoading(true);

      await axios.post(`${API_BASE}/registerotp`, {
        email: formData.email,

        role,
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
      // ✅ ADD THIS
      localStorage.setItem("verifiedEmail", formData.email);
    } catch (err) {
      showToast(err?.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async () => {
    if (!validateForm()) return;
    const isEmailVerified =
      emailVerified || localStorage.getItem("verifiedEmail") === formData.email;

    if (!isEmailVerified) {
      showToast("Verify email first", "error");
      return;
    }
    // if (!emailVerified) {
    //   showToast("Verify email first", "error");
    //   return;
    // }

    try {
      setLoading(true);

      const endpoint = role === "worker" ? "/workerregister" : "/register";

      await axios.post(`${API_BASE}${endpoint}`, {
        ...formData,
        role,
      });

      showToast("Account created successfully");
      localStorage.removeItem("verifiedEmail");

      navigate("/login");
    } catch (err) {
      showToast(err?.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("verifiedEmail");

    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));

      setEmailVerified(true);
    }
  }, []);

  const inputStyle =
    "w-full h-12 border border-gray-200 rounded-xl bg-gray-50 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent";

  return (
    <>
      //{" "}
      <div className=" relative flex justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* BACK BUTTON */}
        <div className="absolute -top-4 -right-16 ">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-xl bg-green-50 text-green-600 font-medium border border-green-100 hover:bg-green-100 hover:text-green-700 shadow-sm transition-all duration-200"
          >
            ← Back to Home
          </button>
        </div>
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
                  className="h-12 px-5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading && (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              )}
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* OTP */}
          {showOtpField &&
            !emailVerified &&
            !localStorage.getItem("verifiedEmail") && (
              <div className="mb-5">
                <div className="flex flex-col sm:flex-row gap-3">
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

                {/* RESEND OTP */}
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={loading}
                    className="text-sm font-medium text-green-600 hover:text-green-700 hover:underline transition"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            )}

          {/* PASSWORD */}
          {/* <div className="mb-5">
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
        </div> */}
          {/* <div className="mb-5">
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            {/* <input
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
            /> */}
          {/* <input
              type={showPassword ? "text" : "password"}
              className={`${inputStyle} pl-11 pr-11`}
              placeholder="Password"
              value={formData.password}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            {passwordFocused && (
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters and include at least 1 uppercase
                letter and 1 number.
              </p>
            )}

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
        </div> */}
          <div className="mb-5">
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                className={`${inputStyle} pl-11 pr-11`}
                placeholder="Password"
                value={formData.password}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
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

            {/* Outside the relative container */}
            {passwordFocused && (
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters and include at least 1 uppercase
                letter and 1 number.
              </p>
            )}

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
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

                      "& fieldset": {
                        borderColor: "#e5e7eb",
                      },

                      "&:hover fieldset": {
                        borderColor: "#22c55e",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#22c55e",
                        borderWidth: "2px",
                      },
                    },

                    "& .MuiOutlinedInput-input": {
                      paddingLeft: "10px",
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

                        "& fieldset": {
                          borderColor: "#e5e7eb",
                        },

                        "&:hover fieldset": {
                          borderColor: "#22c55e",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#22c55e",
                          borderWidth: "2px",
                        },
                      },

                      "& .MuiOutlinedInput-input": {
                        paddingLeft: "20px",
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
        //{" "}
      </div>
      x
    </>
  );
}
