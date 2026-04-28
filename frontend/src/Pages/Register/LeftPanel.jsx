import { Shield, Lock, Zap, TrendingUp } from "lucide-react";

export default function LeftPanel({ page }) {
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
        <div className="flex items-center gap-2 mb-10">
          <img src="/images/logo.png" className="w-18 h-14" />
          <span className="text-xl font-bold">
            Service <span className="text-green-500">Bridge</span>
          </span>
        </div>

        {data.tag && (
          <span className="text-xs font-semibold bg-purple-100 text-purple-600 px-3 py-1 rounded-full mb-4 inline-block">
            {data.tag}
          </span>
        )}

        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          {data.heading}
        </h2>

        <p className="text-gray-500 text-sm mb-8">{data.sub}</p>

        <div className="space-y-4">
          {data.features.map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center`}
              >
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-sm">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 flex items-center justify-center">
          <img
            src="/images/service_bridge_illustration.png"
            className="h-50 object-contain"
            alt="Worker"
          />
        </div>
      </div>
    </div>
  );
}
