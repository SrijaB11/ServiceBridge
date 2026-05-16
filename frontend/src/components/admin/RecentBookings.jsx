import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/bookings/bookingSlice";

const RecentBookings = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  // show only latest 5 bookings
  const recent = [...(list || [])].slice(-5).reverse();

  const statusColor = {
    pending: "text-yellow-600",
    approved: "text-blue-600",
    completed: "text-green-600",
    cancelled: "text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

      {recent.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent bookings available</p>
      ) : (
        <div className="space-y-3">
          {recent.map((b) => (
            <div
              key={b.id}
              className="flex flex-col md:flex-row md:justify-between border-b pb-2"
            >
              {/* LEFT SIDE */}
              <div>
                <p className="font-medium">{b.service || "Service"}</p>

                <p className="text-sm text-gray-500">
                  {b.customerName} → {b.workerName}
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-sm mt-1 md:mt-0">
                <span className={statusColor[b.status] || "text-gray-500"}>
                  {b.status || "unknown"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentBookings;
