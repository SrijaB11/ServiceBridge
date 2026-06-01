import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Briefcase, BadgeCheck, MapPin, Phone } from "lucide-react";

import toast from "react-hot-toast";
import dayjs from "dayjs";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import api from "../../api/axios";

function BookWorkerPage() {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const worker = location.state?.worker;

  const [availability, setAvailability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchAvailability();
  }, []);

  /* GET BOOKED DATES */
  const fetchAvailability = async () => {
    try {
      const res = await api.get(`/booking/availability/${workerId}`);
      setAvailability(res.data.unavailableDates || []);
    } catch (err) {
      console.log(err);
    }
  };

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* USE CURRENT LOCATION */
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
          );

          const data = await res.json();
          const addr = data.address || {};

          setAddress((prev) => ({
            ...prev,
            houseNo: addr.house_number || "",
            street: addr.road || addr.suburb || "",
            city: addr.city || addr.town || addr.village || "",
            pincode: addr.postcode || "",
            latitude: lat,
            longitude: lng,
          }));

          toast.success("Location added");
        } catch (err) {
          toast.error("Failed to fetch address");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        toast.error("Location permission denied");
        setLoadingLocation(false);
      },
    );
  };

  /* BOOK WORKER */
  const handleBooking = async () => {
    try {
      if (!selectedDate) {
        toast.error("Please select booking date");
        return;
      }

      if (
        !address.houseNo ||
        !address.street ||
        !address.city ||
        !address.pincode ||
        !address.phone
      ) {
        toast.error("Please fill all address fields");
        return;
      }

      if (!/^[0-9]{6}$/.test(address.pincode)) {
        toast.error("Invalid pincode");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(address.phone)) {
        toast.error("Invalid phone number");
        return;
      }

      await api.post("/booking/book", {
        workerId,
        service: worker?.services?.[0],
        date: selectedDate.format("YYYY-MM-DD"),
        address,
      });

      toast.success("Booking successful");
      navigate("/customer/bookings");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  /* PAGE GUARD */
  if (!worker) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <h2 className="text-xl font-bold text-red-500">
            Worker Data Missing
          </h2>
          <button onClick={() => navigate(-1)} className="mt-4 text-green-600">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex justify-center items-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-green-500 text-white text-center p-8">
          {/* <img
           // src={worker.image}
            alt="worker"
            className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
          /> */}
          <img
            src={
              worker?.documents?.profilePhoto
                ? `http://localhost:5000/${worker.documents.profilePhoto}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="worker"
            className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
          />
          <h2 className="text-3xl font-bold mt-4">{worker.fullName}</h2>
          <p className="mt-2 opacity-90">{worker.location}</p>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <BadgeCheck size={18} />
                <p className="text-sm">Experience</p>
              </div>
              <h3 className="text-lg font-bold mt-2">
                {worker.experience || "2+ Years"}
              </h3>
            </div>

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

          {/* ADDRESS */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Service Address</h3>

              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center gap-2 text-green-600"
              >
                <MapPin size={16} />
                {loadingLocation ? "Fetching..." : "Use Current Location"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="houseNo"
                placeholder="H.No"
                value={address.houseNo}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <div className="col-span-2 flex items-center gap-2">
                <Phone size={16} />
                <input
                  name="phone"
                  placeholder="Phone"
                  value={address.phone}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          </div>

          {/* DATE */}
          <div className="mt-8">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Booking Date"
                value={selectedDate}
                onChange={setSelectedDate}
                disablePast
              />
            </LocalizationProvider>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleBooking}
            className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookWorkerPage;
