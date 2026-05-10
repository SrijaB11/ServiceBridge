import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

// MUI Date Picker
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function ServiceProviders() {
  const { id } = useParams();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchProviders();
  }, [id]);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/customer/workerslist/${id}`,
      );
      setProviders(res.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoading(false);
    }
  };

  //  Booking function
  const handleBook = async () => {
    try {
      if (!selectedDate || !selectedWorker) {
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

      // reset after booking
      setSelectedWorker(null);
      setSelectedDate(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">{id} Providers</h2>

      {loading && <p>Loading workers...</p>}
      {!loading && providers.length === 0 && <p>No providers available</p>}

      {/* WORKERS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {providers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{worker.fullName}</h3>

            <p className="text-gray-500 text-sm">
              {worker.location || "Not specified"}
            </p>

            <p className="text-gray-500 text-sm">
              {worker.experience || "2+ yrs experience"}
            </p>

            <p className="text-yellow-500 text-sm">
              ⭐ {worker.rating || "4.5"}
            </p>

            <button
              onClick={() => setSelectedWorker(worker)}
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* BOOKING SECTION */}
      {selectedWorker && (
        <div className="mt-8 p-6 bg-white shadow rounded-xl">
          <h3 className="text-lg font-semibold mb-3">
            Book {selectedWorker.fullName}
          </h3>

          {/* DATE PICKER */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              disablePast
              slotProps={{
                textField: {
                  // fullWidth: true,
                  sx: { width: "30%" },
                },
              }}
            />
          </LocalizationProvider>

          {/* SHOW SELECTED DATE */}
          {selectedDate && (
            <p className="mt-3 text-gray-600">
              Selected: {selectedDate.format("DD MMM YYYY")}
            </p>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBook}
              disabled={!selectedDate}
              className="w-40 bg-green-500 text-white py-2 rounded-lg"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => {
                setSelectedWorker(null);
                setSelectedDate(null);
              }}
              className="w-40 bg-red-500 text-white py-2 rounded-lg"
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
