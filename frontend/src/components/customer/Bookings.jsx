import { useEffect, useState } from "react";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

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

      const res = await api.get("/booking/customerbookingstatus");

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const cancelBooking = async (bookingId) => {
    try {
      const res = await api.put(`/booking/cancel/${bookingId}`);
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
                src={
                  booking.worker?.documents?.profilePhoto
                    ? `http://localhost:5000/${booking.worker.documents.profilePhoto}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
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
              <div className="flex gap-3 flex-wrap">
                {/* PAY NOW BUTTON */}
                {booking.status === "completed" &&
                  booking.paymentStatus !== "paid" && (
                    <button
                      onClick={() =>
                        navigate("/customer/payment", {
                          state: {
                            worker: booking.worker,
                            date: booking.date,
                            service: booking.worker?.services?.[0],
                            amount: booking.amount,
                            requestId: booking._id,
                          },
                        })
                      }
                      className="px-5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition"
                    >
                      Pay Now
                    </button>
                  )}
                {/* PAID STATUS */}
                {booking.paymentStatus === "paid" && (
                  <button
                    disabled
                    className="px-5 py-2 rounded-xl bg-green-100 text-green-700 font-medium cursor-not-allowed"
                  >
                    Paid Successfully
                  </button>
                )}

                <button
                  disabled={
                    !["accepted", "completed", "in-progress"].includes(
                      booking.status,
                    )
                  }
                  onClick={() => navigate(`/complaint/${booking._id}`)}
                  className={`px-5 py-2 rounded-xl text-white font-medium transition ${
                    ["accepted", "completed", "in-progress"].includes(
                      booking.status,
                    )
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Raise Complaint
                </button>
                {/* CANCEL BOOKING */}
                <button
                  disabled={
                    booking.status === "cancelled" ||
                    booking.status === "completed"
                  }
                  onClick={() => cancelBooking(booking._id)}
                  className={`px-5 py-2 rounded-xl text-white font-medium transition ${
                    booking.status === "cancelled" ||
                    booking.status === "completed"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {booking.status === "cancelled"
                    ? "Cancelled"
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
