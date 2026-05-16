import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
                    ? "bg-green-100 text-green-600"
                    : booking.status === "pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
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
            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
              <p className="text-sm text-gray-500">
                Created:
                <span className="ml-1 text-gray-700">
                  {dayjs(booking.createdAt).format("DD MMM YYYY")}
                </span>
              </p>

              <div className="flex gap-3">
                <button
                  disabled={booking.status !== "accepted"}
                  onClick={() => navigate(`/complaint/${booking._id}`)}
                  className={`px-5 py-2 rounded-xl text-white transition
      ${
        booking.status === "accepted"
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gray-300 cursor-not-allowed"
      }`}
                >
                  Raise Complaint
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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";

// function Bookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedId, setExpandedId] = useState(null);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/booking/customerbookingstatus",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );

//       setBookings(res.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 bg-white rounded-xl">Loading bookings...</div>;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

//       {bookings.length === 0 ? (
//         <div className="text-center text-gray-500">No bookings found</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {bookings.map((booking) => {
//             const isOpen = expandedId === booking._id;

//             return (
//               <div
//                 key={booking._id}
//                 className="bg-white rounded-2xl p-6 shadow-sm"
//               >
//                 {/* BASIC INFO */}
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {booking.worker?.services?.[0] || "Service"}
//                 </h3>

//                 <p className="text-sm text-gray-500">
//                   ID: {booking._id.slice(-6)}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   {dayjs(booking.date).format("DD MMM YYYY")}
//                 </p>

//                 {/* VIEW BUTTON */}
//                 <button
//                   onClick={() => setExpandedId(isOpen ? null : booking._id)}
//                   className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
//                 >
//                   {isOpen ? "Hide Details" : "View Details"}
//                 </button>

//                 {/* EXPANDED DETAILS */}
//                 {isOpen && (
//                   <div className="mt-5 border-t pt-4 flex items-center gap-4">
//                     <img
//                       src={booking.worker?.image || "https://i.pravatar.cc/150"}
//                       alt="worker"
//                       className="w-16 h-16 rounded-full object-cover"
//                     />

//                     <div>
//                       <h4 className="font-semibold text-gray-800">
//                         {booking.worker?.fullName}
//                       </h4>
//                       <p className="text-sm text-gray-500">
//                         {booking.worker?.email}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {booking.worker?.phone}
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookings;
