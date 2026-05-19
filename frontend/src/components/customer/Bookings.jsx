// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import dayjs from "dayjs";
// // import { useNavigate } from "react-router-dom";
// // import toast from "react-hot-toast";

// // function Bookings() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const navigate = useNavigate();

// //   /* FETCH BOOKINGS */
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []);

// //   const fetchBookings = async () => {
// //     try {
// //       setLoading(true);

// //       const token = localStorage.getItem("token");

// //       const res = await axios.get(
// //         "http://localhost:5000/booking/customerbookingstatus",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       setBookings(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* CANCEL BOOKING */
// //   const cancelBooking = async (bookingId) => {
// //     try {
// //       const token = localStorage.getItem("token");

// //       await axios.put(
// //         `http://localhost:5000/booking/cancel/${bookingId}`,
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );

// //       // UPDATE UI
// //       setBookings((prev) =>
// //         prev.map((booking) =>
// //           booking._id === bookingId
// //             ? { ...booking, status: "cancelled" }
// //             : booking,
// //         ),
// //       );

// //       toast.success("Booking cancelled successfully");
// //     } catch (error) {
// //       console.log(error);

// //       toast.error("Failed to cancel booking");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       {/* TITLE */}
// //       <div className="mb-6">
// //         <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>

// //         <p className="text-gray-500 mt-1">Track all your service bookings</p>
// //       </div>

// //       {/* LOADING */}
// //       {loading && (
// //         <div className="bg-white rounded-2xl p-6 shadow-sm">
// //           <p className="text-gray-500">Loading bookings...</p>
// //         </div>
// //       )}

// //       {/* EMPTY */}
// //       {!loading && bookings.length === 0 && (
// //         <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
// //           <h3 className="text-xl font-semibold text-gray-700">
// //             No bookings found
// //           </h3>

// //           <p className="text-gray-500 mt-2">Your bookings will appear here</p>
// //         </div>
// //       )}

// //       {/* BOOKINGS */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {bookings.map((booking) => (
// //           <div
// //             key={booking._id}
// //             className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
// //           >
// //             {/* HEADER */}
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <h3 className="text-xl font-bold text-gray-800">
// //                   {booking.worker?.services?.[0] || "Service"}
// //                 </h3>

// //                 <p className="text-sm text-gray-500 mt-1">
// //                   Booking ID: {booking._id.slice(-6)}
// //                 </p>
// //               </div>

// //               {/* STATUS */}
// //               <span
// //                 className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
// //                   booking.status === "completed"
// //                     ? "bg-blue-100 text-blue-600"
// //                     : booking.status === "accepted"
// //                       ? "bg-green-100 text-green-600"
// //                       : booking.status === "pending"
// //                         ? "bg-yellow-100 text-yellow-600"
// //                         : booking.status === "rejected"
// //                           ? "bg-red-100 text-red-600"
// //                           : booking.status === "cancelled"
// //                             ? "bg-gray-200 text-gray-600"
// //                             : "bg-gray-100 text-gray-600"
// //                 }`}
// //               >
// //                 {booking.status}
// //               </span>
// //             </div>
// //             <div className="mt-6 flex items-center gap-4">
// //               <img
// //                 // src="https://i.pravatar.cc/150?
// //                 src=""
// //                 alt="worker"
// //                 className="w-16 h-16 rounded-full object-cover"
// //               />{" "}
// //               <div>
// //                 {" "}
// //                 <h4 className="font-semibold text-lg text-gray-800">
// //                   {" "}
// //                   {booking.worker?.fullName}{" "}
// //                 </h4>{" "}
// //                 <p className="text-sm text-gray-500">{booking.worker?.email}</p>{" "}
// //                 <p className="text-sm text-gray-500">
// //                   {booking.worker?.phone}
// //                 </p>{" "}
// //               </div>{" "}
// //             </div>
// //             {/* WORKER INFO */}

// //             {/* <div className="mt-6 flex items-center gap-4 bg-slate-800 p-4 rounded-2xl shadow-md">
// //               <img
// //                 src="https://i.pravatar.cc/150?img=12"
// //                 alt="worker"
// //                 className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
// //               />

// //               <div>
// //                 <h4 className="font-semibold text-lg text-white">
// //                   {booking.worker?.fullName}
// //                 </h4>

// //                 <p className="text-sm text-gray-200">
// //                   {booking.worker?.email}
// //                 </p>

// //                 <p className="text-sm text-gray-300">
// //                   {booking.worker?.phone}
// //                 </p>
// //               </div>
// //             </div> */}

// //             {/* DATE */}
// //             <div className="mt-6">
// //               <p className="text-sm text-gray-500">Booking Date</p>

// //               <h4 className="font-semibold text-gray-800 mt-1">
// //                 {dayjs(booking.date).format("DD MMM YYYY")}
// //               </h4>
// //             </div>

// //             {/* FOOTER */}
// //             <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
// //               <p className="text-sm text-gray-500">
// //                 Created:
// //                 <span className="ml-1 text-gray-700">
// //                   {dayjs(booking.createdAt).format("DD MMM YYYY")}
// //                 </span>
// //               </p>

// //               <div className="flex gap-3 flex-wrap">
// //                 {/* PAY NOW */}
// //                 {booking.status === "completed" && (
// //                   <button
// //                     onClick={() => navigate(`/payment/${booking._id}`)}
// //                     className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition shadow-md"
// //                   >
// //                     Pay Now
// //                   </button>
// //                 )}

// //                 {/* RAISE COMPLAINT */}
// //                 <button
// //                   disabled={booking.status !== "accepted"}
// //                   onClick={() => navigate(`/complaint/${booking._id}`)}
// //                   className={`px-5 py-2 rounded-xl text-white font-medium transition ${
// //                     booking.status === "accepted"
// //                       ? "bg-amber-500 hover:bg-amber-600"
// //                       : "bg-gray-300 cursor-not-allowed"
// //                   }`}
// //                 >
// //                   Raise Complaint
// //                 </button>

// //                 {/* CANCEL BOOKING */}
// //                 <button
// //                   disabled={
// //                     booking.status === "cancelled" ||
// //                     booking.status === "completed" ||
// //                     booking.status === "rejected"
// //                   }
// //                   onClick={() => cancelBooking(booking._id)}
// //                   className={`px-5 py-2 rounded-xl text-white font-medium transition ${
// //                     booking.status === "cancelled" ||
// //                     booking.status === "completed" ||
// //                     booking.status === "rejected"
// //                       ? "bg-gray-300 cursor-not-allowed"
// //                       : "bg-red-500 hover:bg-red-600"
// //                   }`}
// //                 >
// //                   {booking.status === "cancelled"
// //                     ? "Cancelled"
// //                     : booking.status === "rejected"
// //                       ? "Rejected"
// //                       : "Cancel Booking"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Bookings;
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  /* FETCH BOOKINGS */
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/booking/customerbookingstatus",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/booking/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(res.data);

      // UPDATE UI INSTANTLY
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking,
        ),
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to cancel booking");
    }
  };
  return (
    <div className="p-6">
      {/* TITLE */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>

        <p className="text-gray-500 mt-1">Track all your service bookings</p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <p className="text-gray-500">Loading bookings...</p>
        </div>
      )}

      {/* EMPTY */}
      {!loading && bookings.length === 0 && (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <h3 className="text-xl font-semibold text-gray-700">
            No bookings found
          </h3>

          <p className="text-gray-500 mt-2">Your bookings will appear here</p>
        </div>
      )}

      {/* BOOKINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {booking.worker?.services?.[0] || "Service"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Booking ID: {booking._id.slice(-6)}
                </p>
              </div>

              {/* STATUS */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium capitalize ${
                  booking.status === "completed"
                    ? "bg-blue-100 text-blue-600"
                    : booking.status === "accepted"
                      ? "bg-emerald-100 text-emerald-600"
                      : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : booking.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                }`}
              >
                {booking.status}
              </span>
            </div>
            {/* WORKER INFO */}
            <div className="mt-6 flex items-center gap-4">
              <img
                // src="https://i.pravatar.cc/150?img=12"
                src=""
                alt="worker"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {booking.worker?.fullName}
                </h4>

                <p className="text-sm text-gray-500">{booking.worker?.email}</p>

                <p className="text-sm text-gray-500">{booking.worker?.phone}</p>
              </div>
            </div>

            {/* DATE */}
            <div className="mt-6">
              <p className="text-sm text-gray-500">Booking Date</p>

              <h4 className="font-semibold text-gray-800 mt-1">
                {dayjs(booking.date).format("DD MMM YYYY")}
              </h4>
            </div>

            {/* FOOTER */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              {/* CREATED DATE */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Booked on</p>

                <span className="text-sm font-semibold text-gray-700">
                  {dayjs(booking.createdAt).format("DD MMM YYYY")}
                </span>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3">
                {/* PAY NOW */}
                {booking.status === "completed" && (
                  <button
                    onClick={() => navigate(`/payment/${booking._id}`)}
                    className="flex-1 min-w-[140px] bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Pay Now
                  </button>
                )}

                {/* RAISE COMPLAINT */}
                <button
                  disabled={booking.status !== "accepted"}
                  onClick={() => navigate(`/complaint/${booking._id}`)}
                  className={`flex-1 min-w-[140px] py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    booking.status === "accepted"
                      ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Raise Complaint
                </button>

                {/* CANCEL BOOKING */}
                <button
                  disabled={
                    booking.status === "cancelled" ||
                    booking.status === "completed" ||
                    booking.status === "rejected"
                  }
                  onClick={() => cancelBooking(booking._id)}
                  className={`flex-1 min-w-[140px] py-3 rounded-2xl font-semibold transition-all duration-200 ${
                    booking.status === "cancelled" ||
                    booking.status === "completed" ||
                    booking.status === "rejected"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md"
                  }`}
                >
                  {booking.status === "cancelled"
                    ? "Cancelled"
                    : booking.status === "rejected"
                      ? "Rejected"
                      : "Cancel Booking"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;
