// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Briefcase,
//   Phone,
//   MapPin,
//   Calendar,
//   CreditCard,
//   BadgeCheck,
// } from "lucide-react";

// export default function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get("http://localhost:5000/customer/history", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         //setHistory(res.data.history);
//         // // setHistory(
//         // //   res.data.history.filter((item) => item.bookingStatus === "Completed"),
//         // // );
//         // const completedHistory = res.data.history.filter(
//         //   (item) => item.bookingStatus === "Completed",
//         // );
//         // setHistory(
//         //   res.data.history.filter(
//         //     (item) => item.payment?.paymentStatus === "Paid",
//         //   ),
//         // );

//         // setHistory(completedHistory);
//         setHistory(
//           res.data.history.filter(
//             (item) => item.payment?.paymentStatus?.toLowerCase() === "paid",
//           ),
//         );
//       } catch (err) {
//         console.error("Error fetching history:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return (
//       <div className="p-6 text-center text-gray-500">Loading history...</div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <h1 className="text-2xl font-bold mb-6">Booking History</h1>

//       <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {history.map((item) => (
//           <div
//             key={item.bookingId}
//             className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
//           >
//             {/* Header */}
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-2">
//                 <Briefcase className="w-5 h-5 text-gray-600" />
//                 <h2 className="font-semibold text-lg">
//                   {item.worker?.services?.[0]}
//                 </h2>
//               </div>

//               <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
//                 <BadgeCheck className="w-4 h-4" />
//                 {item.bookingStatus}
//               </span>
//             </div>

//             <p className="text-xs text-gray-400 mt-1">
//               #{item.bookingId.slice(-6)}
//             </p>

//             {/* Worker Info */}
//             <div className="mt-4 space-y-2 text-sm text-gray-600">
//               <p className="font-semibold text-gray-800">{item.worker?.name}</p>

//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4" />
//                 {item.worker?.phone}
//               </div>

//               <div className="flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 {item.worker?.location}
//               </div>
//             </div>

//             {/* Date */}
//             <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
//               <Calendar className="w-4 h-4" />
//               {new Date(item.bookingDate).toLocaleDateString()}
//             </div>

//             {/* Payment */}
//             <div className="mt-4 border-t pt-3 space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Total Paid</span>
//                 <span className="font-semibold flex items-center gap-1">
//                   <CreditCard className="w-4 h-4" />₹{item.payment?.amount}
//                 </span>
//               </div>

//               <div className="flex justify-between">
//                 <span className="text-gray-500">Payment Status</span>
//                 <span className="text-green-600 font-medium">
//                   {item.payment?.paymentStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import {
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

import api from "../../api/axios";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      try {
        const res = await api.get("/customer/history");

        const filtered = (res.data.history || []).filter(
          (item) =>
            item.payment?.paymentStatus?.toLowerCase() === "paid"
        );

        if (isMounted) {
          setHistory(filtered);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderHistoryCards = useMemo(() => {
    return history.map((item) => (
      <div
        key={item.bookingId}
        className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-lg">
              {item.worker?.services?.[0]}
            </h2>
          </div>

          <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <BadgeCheck className="w-4 h-4" />
            {item.bookingStatus}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          #{item.bookingId?.slice(-6)}
        </p>

        {/* WORKER INFO */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p className="font-semibold text-gray-800">
            {item.worker?.name}
          </p>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {item.worker?.phone}
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {item.worker?.location}
          </div>
        </div>

        {/* DATE */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          {item.bookingDate
            ? new Date(item.bookingDate).toLocaleDateString()
            : "N/A"}
        </div>

        {/* PAYMENT */}
        <div className="mt-4 border-t pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Total Paid</span>
            <span className="font-semibold flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              ₹{item.payment?.amount || 0}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Payment Status</span>
            <span className="text-green-600 font-medium">
              {item.payment?.paymentStatus || "N/A"}
            </span>
          </div>
        </div>
      </div>
    ));
  }, [history]);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading history...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {renderHistoryCards}
      </div>
    </div>
  );
}
