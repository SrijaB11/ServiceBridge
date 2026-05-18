
import LeftPanel from "./LeftPanel";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

export default function WorkerRegister() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-gray-50 border-r border-gray-100 p-6 sm:p-8">
            <LeftPanel page={2} />
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-3 flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <RegisterForm
                role="worker"
                title="Worker Registration"
                subtitle="Register as service professional"
                registerEndpoint="/worker-register"
                showServices={true}
              />

              {/* SWITCH LINK */}
              <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
                Want customer account?{" "}
                <span
                  onClick={() => navigate("/customer-register")}
                  className="font-semibold text-green-500 cursor-pointer hover:text-green-600 hover:underline transition"
                >
                  Customer Registration
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
