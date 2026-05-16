// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchComplaints,
//   updateComplaintStatus,
//   deleteComplaint,
// } from "../../redux/complaints/complaintSlice";

// const Complaints = () => {
//   const dispatch = useDispatch();
//   const { list } = useSelector((state) => state.complaints);

//   useEffect(() => {
//     dispatch(fetchComplaints());
//   }, [dispatch]);

//   const statusColor = {
//     open: "text-red-600",
//     "in-progress": "text-yellow-600",
//     resolved: "text-green-600",
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Complaints & Support</h2>

//       <div className="grid gap-4">
//         {list.map((c) => (
//           <div
//             key={c.id}
//             className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row justify-between"
//           >
//             {/* INFO */}
//             <div>
//               <h3 className="font-semibold">
//                 {c.customerName} → {c.workerName}
//               </h3>

//               <p className="text-gray-600 mt-1">Issue: {c.issue}</p>

//               <p className={`mt-2 font-medium ${statusColor[c.status]}`}>
//                 Status: {c.status}
//               </p>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateComplaintStatus({
//                       id: c.id,
//                       status: "in-progress",
//                     }),
//                   )
//                 }
//                 className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 In Progress
//               </button>

//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateComplaintStatus({
//                       id: c.id,
//                       status: "resolved",
//                     }),
//                   )
//                 }
//                 className="bg-green-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 Resolve
//               </button>

//               <button
//                 onClick={() => dispatch(deleteComplaint(c.id))}
//                 className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Complaints;
// import React from "react";

// const Complaints = () => {
//   const complaints = [
//     { id: 1, issue: "Late service", user: "John" },
//     { id: 2, issue: "Bad behavior", user: "Sara" },
//   ];

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Complaints (Static)</h1>

//       {complaints.map((c) => (
//         <div key={c.id} className="bg-white p-4 shadow mb-3 rounded">
//           <h2>{c.issue}</h2>
//           <p>User: {c.user}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Complaints;
import React from "react";

const Complaints = () => {
  // 👤 Customer complaints (raised by customers)
  const customerComplaints = [
    {
      id: 1,
      user: "John Doe",
      issue: "Worker arrived late",
      status: "Open",
    },
    {
      id: 2,
      user: "Sara Ali",
      issue: "Service not completed properly",
      status: "In Progress",
    },
  ];

  // 🧑 Worker complaints (raised by workers)
  const workerComplaints = [
    {
      id: 1,
      worker: "Worker A",
      issue: "Customer not available at location",
      status: "Resolved",
    },
    {
      id: 2,
      worker: "Worker B",
      issue: "Payment delay issue",
      status: "Open",
    },
  ];

  const totalComplaints = customerComplaints.length + workerComplaints.length;

  const openCount = [...customerComplaints, ...workerComplaints].filter(
    (c) => c.status === "Open",
  ).length;

  const resolvedCount = [...customerComplaints, ...workerComplaints].filter(
    (c) => c.status === "Resolved",
  ).length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Complaints Management</h1>
        <p className="text-gray-500 text-sm">
          Customer & Worker issue tracking system
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Complaints</p>
          <h2 className="text-2xl font-bold">{totalComplaints}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Open</p>
          <h2 className="text-2xl font-bold text-red-500">{openCount}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Resolved</p>
          <h2 className="text-2xl font-bold text-green-600">{resolvedCount}</h2>
        </div>
      </div>

      {/* ================= CUSTOMER COMPLAINTS ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          Customer Complaints
        </h2>

        <div className="space-y-3">
          {customerComplaints.map((c) => (
            <div key={c.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{c.user}</p>
                <p className="text-sm text-gray-500">{c.issue}</p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  c.status === "Open"
                    ? "text-red-500"
                    : c.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-500"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= WORKER COMPLAINTS ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Worker Complaints
        </h2>

        <div className="space-y-3">
          {workerComplaints.map((c) => (
            <div key={c.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{c.worker}</p>
                <p className="text-sm text-gray-500">{c.issue}</p>
              </div>

              <span
                className={`text-sm font-semibold ${
                  c.status === "Open"
                    ? "text-red-500"
                    : c.status === "Resolved"
                      ? "text-green-600"
                      : "text-yellow-500"
                }`}
              >
                {c.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
