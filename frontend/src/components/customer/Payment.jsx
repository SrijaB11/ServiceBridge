// import { useLocation, useNavigate } from "react-router-dom";

// function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // data passed from previous page
//   const { worker, date, service } = location.state || {};

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Payment
//         </h2>

//         {/* Booking Details */}
//         <div className="mb-4 border-b pb-4">
//           <p className="text-gray-600">Service:</p>
//           <p className="font-semibold capitalize">{service}</p>

//           <p className="text-gray-600 mt-2">Worker:</p>
//           <p className="font-semibold">{worker?.fullName}</p>

//           <p className="text-gray-600 mt-2">Date:</p>
//           <p className="font-semibold">{date}</p>
//         </div>

//         {/* Amount */}
//         <div className="mb-4">
//           <p className="text-gray-600">Total Amount</p>
//           <p className="text-2xl font-bold text-green-600">₹499</p>
//         </div>

//         {/* Payment Options (UI only) */}
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Payment Method</p>

//           <div className="flex flex-col gap-2">
//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" defaultChecked /> UPI
//             </label>

//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" /> Credit / Debit Card
//             </label>

//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" /> Cash on Service
//             </label>
//           </div>
//         </div>

//         {/* Pay Button */}
//         <button
//           onClick={() => {
//             alert("Payment Successful (Demo)");
//             navigate("/customer");
//           }}
//           className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;import { useLocation, useNavigate } from "react-router-dom";

// function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // data passed from previous page
//   const { worker, date, service } = location.state || {};

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Payment
//         </h2>

//         {/* Booking Details */}
//         <div className="mb-4 border-b pb-4">
//           <p className="text-gray-600">Service:</p>
//           <p className="font-semibold capitalize">{service}</p>

//           <p className="text-gray-600 mt-2">Worker:</p>
//           <p className="font-semibold">{worker?.fullName}</p>

//           <p className="text-gray-600 mt-2">Date:</p>
//           <p className="font-semibold">{date}</p>
//         </div>

//         {/* Amount */}
//         <div className="mb-4">
//           <p className="text-gray-600">Total Amount</p>
//           <p className="text-2xl font-bold text-green-600">₹499</p>
//         </div>

//         {/* Payment Options (UI only) */}
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Select Payment Method</p>

//           <div className="flex flex-col gap-2">
//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" defaultChecked /> UPI
//             </label>

//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" /> Credit / Debit Card
//             </label>

//             <label className="border p-2 rounded cursor-pointer">
//               <input type="radio" name="payment" /> Cash on Service
//             </label>
//           </div>
//         </div>

//         {/* Pay Button */}
//         <button
//           onClick={() => {
//             alert("Payment Successful (Demo)");
//             navigate("/customer");
//           }}
//           className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;