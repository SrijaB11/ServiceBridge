// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPayments,
//   updatePaymentStatus,
// } from "../../redux/payments/paymentSlice";

// const Payments = () => {
//   const dispatch = useDispatch();
//   const { list } = useSelector((state) => state.payments);

//   useEffect(() => {
//     dispatch(fetchPayments());
//   }, [dispatch]);

//   const totalRevenue = list.reduce((sum, p) => sum + p.adminCommission, 0);

//   const totalPayouts = list.reduce((sum, p) => sum + p.workerEarning, 0);

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* HEADER */}
//       <div>
//         <h2 className="text-2xl font-bold">Payments Overview</h2>
//         <p className="text-gray-500 text-sm">
//           Manage customer payments & worker payouts
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white shadow rounded-xl p-4">
//           <p className="text-gray-500">Total Revenue</p>
//           <h3 className="text-xl font-bold text-green-600">₹{totalRevenue}</h3>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <p className="text-gray-500">Worker Payouts</p>
//           <h3 className="text-xl font-bold text-blue-600">₹{totalPayouts}</h3>
//         </div>

//         <div className="bg-white shadow rounded-xl p-4">
//           <p className="text-gray-500">Transactions</p>
//           <h3 className="text-xl font-bold">{list.length}</h3>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white shadow rounded-xl overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Customer</th>
//               <th className="p-3 text-left">Worker</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Admin Cut</th>
//               <th className="p-3 text-left">Worker Earn</th>
//               <th className="p-3 text-left">Status</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {list.map((p) => (
//               <tr key={p.id} className="border-t">
//                 <td className="p-3">{p.customerName}</td>
//                 <td className="p-3">{p.workerName}</td>
//                 <td className="p-3">₹{p.amount}</td>
//                 <td className="p-3 text-green-600">₹{p.adminCommission}</td>
//                 <td className="p-3 text-blue-600">₹{p.workerEarning}</td>
//                 <td className="p-3">
//                   <span
//                     className={
//                       p.status === "paid" ? "text-green-600" : "text-yellow-600"
//                     }
//                   >
//                     {p.status}
//                   </span>
//                 </td>

//                 <td className="p-3">
//                   <button
//                     onClick={() =>
//                       dispatch(
//                         updatePaymentStatus({
//                           id: p.id,
//                           status: "paid",
//                         }),
//                       )
//                     }
//                     className="bg-green-500 text-white px-2 py-1 rounded text-xs"
//                   >
//                     Mark Paid
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Payments;
import React from "react";

const Payments = () => {
  // 💰 Customer Payments (money coming in)
  const customerPayments = [
    { id: 1, customer: "John Doe", amount: 500, status: "Paid" },
    { id: 2, customer: "Sara Ali", amount: 1200, status: "Pending" },
    { id: 3, customer: "Mike Ross", amount: 800, status: "Paid" },
  ];

  // 🧑 Worker Payments (money going out)
  const workerPayments = [
    { id: 1, worker: "Worker A", amount: 300, status: "Paid" },
    { id: 2, worker: "Worker B", amount: 450, status: "Pending" },
  ];

  const totalCustomerRevenue = customerPayments.reduce(
    (sum, p) => sum + p.amount,
    0,
  );

  const totalWorkerPayout = workerPayments.reduce(
    (sum, p) => sum + p.amount,
    0,
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Payments Overview</h1>
        <p className="text-gray-500 text-sm">
          Customer collections & Worker payouts
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Customer Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{totalCustomerRevenue}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Worker Payouts</p>
          <h2 className="text-2xl font-bold text-blue-600">
            ₹{totalWorkerPayout}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Net Profit</p>
          <h2 className="text-2xl font-bold text-purple-600">
            ₹{totalCustomerRevenue - totalWorkerPayout}
          </h2>
        </div>
      </div>

      {/* ================= CUSTOMER PAYMENTS ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Customer Payments
        </h2>

        <div className="space-y-3">
          {customerPayments.map((p) => (
            <div key={p.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{p.customer}</p>
                <p className="text-sm text-gray-500">{p.status}</p>
              </div>

              <p className="font-semibold text-green-600">₹{p.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WORKER PAYMENTS ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Worker Payments
        </h2>

        <div className="space-y-3">
          {workerPayments.map((p) => (
            <div key={p.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{p.worker}</p>
                <p className="text-sm text-gray-500">{p.status}</p>
              </div>

              <p className="font-semibold text-blue-600">₹{p.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
