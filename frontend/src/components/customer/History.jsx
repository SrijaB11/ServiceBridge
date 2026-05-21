// import { useEffect, useState } from "react";
// import axios from "axios";

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

//         setHistory(res.data.history);
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
//       <h1 className="text-2xl font-bold mb-6">My Booking History</h1>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {history.map((item) => (
//           <div
//             key={item.bookingId}
//             className="bg-white rounded-2xl shadow-md p-5"
//           >
//             {/* Service */}
//             <h2 className="font-bold text-lg">{item.worker?.services?.[0]}</h2>

//             <p className="text-xs text-gray-500">#{item.bookingId.slice(-6)}</p>

//             {/* Worker */}
//             <div className="mt-3 text-sm text-gray-600">
//               <p className="font-semibold text-gray-800">{item.worker?.name}</p>
//               <p>📞 {item.worker?.phone}</p>
//               <p>📍 {item.worker?.location}</p>
//             </div>

//             {/* Date */}
//             <div className="mt-2 text-sm">
//               Date: {new Date(item.bookingDate).toLocaleDateString()}
//             </div>

//             {/* Payment */}
//             <div className="mt-3 border-t pt-3 text-sm space-y-1">
//               <div className="flex justify-between">
//                 <span>Total Paid</span>
//                 <span className="font-bold">₹{item.payment.amount}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Status</span>
//                 <span className="text-green-600">
//                   {item.payment.paymentStatus}
//                 </span>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-2 mt-4">
//               <button className="bg-green-600 text-white px-4 py-2 rounded-xl w-full">
//                 Review
//               </button>

//               <button className="border px-4 py-2 rounded-xl w-full">
//                 Receipt
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  BadgeCheck,
} from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/customer/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHistory(res.data.history);
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading history...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Booking History</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => (
          <div
            key={item.bookingId}
            className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition"
          >
            {/* Header */}
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
              #{item.bookingId.slice(-6)}
            </p>

            {/* Worker Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="font-semibold text-gray-800">{item.worker?.name}</p>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {item.worker?.phone}
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {item.worker?.location}
              </div>
            </div>

            {/* Date */}
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(item.bookingDate).toLocaleDateString()}
            </div>

            {/* Payment */}
            <div className="mt-4 border-t pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-semibold flex items-center gap-1">
                  <CreditCard className="w-4 h-4" />₹{item.payment?.amount}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Payment Status</span>
                <span className="text-green-600 font-medium">
                  {item.payment?.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
