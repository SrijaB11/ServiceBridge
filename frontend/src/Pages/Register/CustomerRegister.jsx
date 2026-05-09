// import LeftPanel from "./LeftPanel";
// import RegisterForm from "./RegisterForm";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
//         <div className="grid grid-cols-1 lg:grid-cols-5">
//           {/* LEFT */}
//           <div className="lg:col-span-2 p-6">
//             <LeftPanel page={1} />
//           </div>

//           {/* RIGHT */}
//           <div className="lg:col-span-3 p-6 flex flex-col items-center justify-center">
//             <RegisterForm />
//             <p className="text-center mt-4 text-sm">
//               Worker Registration?{" "}
//               <span
//                 onClick={() => navigate("/worker-reg")}
//                 className="text-blue-500 cursor-pointer hover:underline"
//               >
//                 Worker Registration
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import LeftPanel from "./LeftPanel";
// import RegisterForm from "./RegisterForm";
// import { useNavigate } from "react-router-dom";

// export default function CustomerRegister() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
//         <div className="grid grid-cols-1 lg:grid-cols-5">
//           {/* Left Section */}
//           <div className="lg:col-span-2 bg-gray-50 border-r border-gray-100 p-6 sm:p-8">
//             <LeftPanel page={1} />
//           </div>

//           {/* Right Section */}
//           <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 sm:p-10">
//             {/* Form Container */}
//             <div className="w-full max-w-md">
//               <RegisterForm />

//               {/* Navigation Link */}
//               <p
//                 className="mt-6 text-center text-sm sm:text-base text-gray-500
//               "
//               >
//                 Worker Registration?{" "}
//                 <span
//                   onClick={() => navigate("/worker-reg")}
//                   className="font-semibold text-green-500  cursor-pointer hover:text-green-600 hover:underline transition"
//                 >
//                   Worker Registration
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import LeftPanel from "./LeftPanel";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";

export default function CustomerRegister() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 bg-gray-50 border-r border-gray-100 p-6 sm:p-8">
            <LeftPanel page={1} />
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-3 flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <RegisterForm
                role="customer"
                title="Create Customer Account"
                subtitle="Register to continue as customer"
                registerEndpoint="/customer-register"
              />

              {/* SWITCH LINK */}
              <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
                Want to work with us?{" "}
                <span
                  onClick={() => navigate("/worker-register")}
                  className="font-semibold text-green-500 cursor-pointer hover:text-green-600 hover:underline transition"
                >
                  Worker Registration
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
