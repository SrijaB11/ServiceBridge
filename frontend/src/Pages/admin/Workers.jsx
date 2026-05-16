// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchWorkers,
//   verifyWorker,
//   rejectWorker,
// } from "../../redux/workers/workerSlice";

// const Workers = () => {
//   const dispatch = useDispatch();
//   const { list } = useSelector((state) => state.workers);

//   useEffect(() => {
//     dispatch(fetchWorkers());
//   }, [dispatch]);

//   return (
//     <div className="p-4 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Worker Verification</h2>

//       <div className="grid gap-4">
//         {list.map((worker) => (
//           <div
//             key={worker.id}
//             className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between"
//           >
//             {/* Worker Info */}
//             <div>
//               <h3 className="font-semibold text-lg">{worker.name}</h3>
//               <p className="text-gray-500">{worker.email}</p>
//               <p className="text-sm">
//                 Status:{" "}
//                 <span
//                   className={
//                     worker.verified ? "text-green-600" : "text-yellow-600"
//                   }
//                 >
//                   {worker.verified ? "Verified" : "Pending"}
//                 </span>
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2 mt-3 md:mt-0">
//               {!worker.verified && (
//                 <button
//                   onClick={() => dispatch(verifyWorker(worker.id))}
//                   className="bg-green-500 text-white px-3 py-1 rounded"
//                 >
//                   Verify
//                 </button>
//               )}

//               <button
//                 onClick={() => dispatch(rejectWorker(worker.id))}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Workers;
import React from "react";

const Workers = () => {
  const workers = [
    { id: 1, name: "Worker A", skill: "Plumber" },
    { id: 2, name: "Worker B", skill: "Electrician" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Workers (Static)</h1>

      {workers.map((w) => (
        <div key={w.id} className="bg-white p-4 shadow mb-3 rounded">
          <h2>{w.name}</h2>
          <p className="text-gray-500">{w.skill}</p>
        </div>
      ))}
    </div>
  );
};

export default Workers;
