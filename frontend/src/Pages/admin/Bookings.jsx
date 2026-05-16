// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBookings,
//   updateBookingStatus,
//   deleteBooking,
// } from "../../redux/bookings/bookingSlice";

// const statusColors = {
//   pending: "text-yellow-600",
//   approved: "text-blue-600",
//   completed: "text-green-600",
//   cancelled: "text-red-600",
// };

// const Bookings = () => {
//   const dispatch = useDispatch();
//   const { list } = useSelector((state) => state.bookings);

//   useEffect(() => {
//     dispatch(fetchBookings());
//   }, [dispatch]);

//   return (
//     <div className="p-4 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>

//       <div className="grid gap-4">
//         {list.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row md:justify-between"
//           >
//             {/* INFO */}
//             <div>
//               <h3 className="font-semibold">{booking.service}</h3>
//               <p className="text-gray-500 text-sm">
//                 Customer: {booking.customerName}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Worker: {booking.workerName}
//               </p>

//               <p className={`mt-1 font-medium ${statusColors[booking.status]}`}>
//                 Status: {booking.status}
//               </p>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateBookingStatus({
//                       id: booking.id,
//                       status: "approved",
//                     }),
//                   )
//                 }
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 Approve
//               </button>

//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateBookingStatus({
//                       id: booking.id,
//                       status: "completed",
//                     }),
//                   )
//                 }
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Complete
//               </button>

//               <button
//                 onClick={() =>
//                   dispatch(
//                     updateBookingStatus({
//                       id: booking.id,
//                       status: "cancelled",
//                     }),
//                   )
//                 }
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={() => dispatch(deleteBooking(booking.id))}
//                 className="bg-gray-700 text-white px-3 py-1 rounded"
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

// export default Bookings;
import React from "react";

const Bookings = () => {
  const bookings = [
    { id: 1, service: "AC Repair", user: "John" },
    { id: 2, service: "Plumbing", user: "Sara" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings (Static)</h1>

      {bookings.map((b) => (
        <div key={b.id} className="bg-white p-4 shadow mb-3 rounded">
          <h2>{b.service}</h2>
          <p>User: {b.user}</p>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
