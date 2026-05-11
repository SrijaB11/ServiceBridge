import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ServiceProviders() {
  const { id } = useParams();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWorker, setSelectedWorker] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [availability, setAvailability] = useState([]);
  const navigate = useNavigate();

  /* FETCH WORKERS */
  useEffect(() => {
    fetchWorkers();
  }, [id]);

  const fetchWorkers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/customer/workerslist/${id}`,
      );

      setProviders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /* FETCH AVAILABILITY */
  const fetchAvailability = async (workerId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/booking/availability/${workerId}`,
      );

      setAvailability(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* SELECT WORKER */
  const handleSelectWorker = async (worker) => {
    setSelectedWorker(worker);

    await fetchAvailability(worker._id);
  };

  /* BOOK WORKER */
  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        alert("Please select date");
        return;
      }

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/booking/book",
        {
          workerId: selectedWorker._id,
          service: id,
          date: selectedDate.format("YYYY-MM-DD"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);
      navigate("/customer");

      setSelectedWorker(null);
      setSelectedDate(null);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold capitalize text-gray-800 mb-8">
        {id} Providers
      </h2>

      {loading && <p>Loading workers...</p>}

      {!loading && providers.length === 0 && <p>No workers available</p>}

      {/* WORKERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={worker.image || "https://i.pravatar.cc/150?img=3"}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {worker.fullName}
                </h3>

                <p className="text-sm text-gray-500">{worker.location}</p>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-sm text-gray-600">
                Experience:
                <span className="font-medium ml-1">
                  {worker.experience || "2+ Years"}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Rating:
                <span className="text-yellow-500 ml-1">
                  ⭐ {worker.rating || "4.5"}
                </span>
              </p>
            </div>

            <button
              onClick={() => handleSelectWorker(worker)}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedWorker && (
        <div className="mt-10 bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800">
            Book {selectedWorker.fullName}
          </h3>

          {/* AVAILABILITY */}
          <div className="mt-5">
            <h4 className="font-semibold mb-3">Availability</h4>

            <div className="flex flex-wrap gap-3">
              {availability?.length > 0 ? (
                availability.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No availability data</p>
              )}
            </div>
          </div>

          {/* DATE PICKER */}
          <div className="mt-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
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
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleBooking}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => {
                setSelectedWorker(null);
                setSelectedDate(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceProviders;
