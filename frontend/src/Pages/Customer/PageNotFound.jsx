import { Home, ArrowLeft, Wrench, Sparkles, ShieldCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-52 h-52 bg-green-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-52 h-52 bg-emerald-300 opacity-20 blur-3xl rounded-full"></div>

      {/* Floating Icons */}
      <Wrench className="absolute top-24 left-12 text-green-200 w-10 h-10 rotate-12 animate-pulse" />

      <Sparkles className="absolute right-16 top-28 text-emerald-300 w-9 h-9 animate-bounce" />

      <ShieldCheck className="absolute bottom-24 left-20 text-green-300 w-10 h-10 animate-pulse" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-green-100 rounded-[32px] shadow-2xl p-8 text-center">
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            <Sparkles size={16} />
            Page Not Found
          </div>

          {/* 404 */}
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            404
          </h1>

          {/* Heading */}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Service Unavailable
          </h2>

          {/* Description */}
          <p className="mt-3 text-gray-500 leading-relaxed text-sm">
            The page you're looking for may have been moved, deleted, or the
            service route is incorrect.
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center mt-6">
            <div className="w-24 h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"></div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <Home size={18} />
              Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:border-green-200 bg-white hover:bg-green-50 text-gray-700 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-400">
            ServiceBridge • Trusted Home Services
          </p>
        </div>
      </div>
    </div>
  );
}
