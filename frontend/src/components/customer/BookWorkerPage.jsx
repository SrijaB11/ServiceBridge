import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, BadgeCheck } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BookWorkerPage() {
  const { workerId } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  // WORKER FROM PREVIOUS PAGE
  const worker = location.state?.worker;

  const [availability, setAvailability] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  // FETCH BOOKED DATES
  const fetchAvailability = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/booking/availability/${workerId}`,
      );

      setAvailability(res.data.unavailableDates || []);
    } catch (error) {
      console.log(error);
    }
  };

  // BOOK WORKER
  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        alert("Please select booking date");
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/booking/book",
        {
          workerId,
          service: worker?.services?.[0],
          date: selectedDate.format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Booking Successful");

      navigate("/customer/bookings");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking Failed");
    }
  };

  // IF PAGE REFRESHED
  if (!worker) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Worker Data Missing
          </h2>

          <p className="text-gray-500 mt-2">
            Please go back and select worker again
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* TOP SECTION */}
        <div className="bg-green-500 p-8 text-white text-center">
          <img
            src={
              worker.image ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="worker"
            className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
          />

          <h2 className="text-3xl font-bold mt-4">{worker.fullName}</h2>

          <p className="mt-2 opacity-90">{worker.location}</p>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* WORKER DETAILS */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Experience</p>

              <h3 className="text-lg font-bold text-gray-800 mt-1">
                {worker.experience || "2+ Years"}
              </h3>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4">
              <p className="text-sm text-gray-500">Rating</p>

              <h3 className="text-lg font-bold text-yellow-500 mt-1">
                ⭐ {worker.rating || "4.5"}
              </h3>
            </div>
          </div>  */}
          <div className="grid grid-cols-2 gap-4">
            {/* Experience */}
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <BadgeCheck size={18} />
                <p className="text-sm">Experience</p>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-2">
                {worker.experience || "2+ Years"}
              </h3>
            </div>

            {/* Service Charge */}
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <Briefcase size={18} />
                <p className="text-sm">Service Charge</p>
              </div>

              <h3 className="text-lg font-bold text-green-600 mt-2">
                Starts from ₹199
              </h3>
            </div>
          </div>

          {/* UNAVAILABLE DATES */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Booked Dates
            </h3>

            <div className="flex flex-wrap gap-3">
              {availability.length > 0 ? (
                availability.map((date, index) => (
                  <div
                    key={index}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm"
                  >
                    {dayjs(date).format("DD MMM YYYY")}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No booked dates</p>
              )}
            </div>
          </div>

          {/* DATE PICKER */}
          <div className="mt-8">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Booking Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                disablePast
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleBooking}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookWorkerPage;
