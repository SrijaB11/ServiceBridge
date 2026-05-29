// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Briefcase, BadgeCheck } from "lucide-react";

// import dayjs from "dayjs";

// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import api from "../../api/axios";

// function BookWorkerPage() {
//   const { workerId } = useParams();

//   const navigate = useNavigate();

//   const location = useLocation();

//   // WORKER FROM PREVIOUS PAGE
//   const worker = location.state?.worker;

//   const [availability, setAvailability] = useState([]);

//   const [selectedDate, setSelectedDate] = useState(null);

//   useEffect(() => {
//     fetchAvailability();
//   }, []);

//   const fetchAvailability = async () => {
//     try {
//       const res = await api.get(`/booking/availability/${workerId}`);

//       setAvailability(res.data.unavailableDates || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleBooking = async () => {
//     try {
//       if (!selectedDate) {
//         alert("Please select booking date");
//         return;
//       }

//       await api.post("/booking/book", {
//         workerId,
//         service: worker?.services?.[0],
//         date: selectedDate.format("YYYY-MM-DD"),
//       });

//       alert("Booking Successful");

//       navigate("/customer/bookings");
//     } catch (error) {
//       console.log(error);

//       alert(error.response?.data?.message || "Booking Failed");
//     }
//   };
//   // IF PAGE REFRESHED
//   if (!worker) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-red-500">
//             Worker Data Missing
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Please go back and select worker again
//           </p>

//           <button
//             onClick={() => navigate(-1)}
//             className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex justify-center items-center">
//       <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden">
//         {/* TOP SECTION */}
//         <div className="bg-green-500 p-8 text-white text-center">
//           <img
//             src={
//               worker.image ||
//               "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             }
//             alt="worker"
//             className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
//           />

//           <h2 className="text-3xl font-bold mt-4">{worker.fullName}</h2>

//           <p className="mt-2 opacity-90">{worker.location}</p>
//         </div>

//         {/* BODY */}
//         <div className="p-6">
//           <div className="grid grid-cols-2 gap-4">
//             {/* Experience */}
//             <div className="bg-gray-100 rounded-2xl p-4">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <BadgeCheck size={18} />
//                 <p className="text-sm">Experience</p>
//               </div>

//               <h3 className="text-lg font-bold text-gray-800 mt-2">
//                 {worker.experience || "2+ Years"}
//               </h3>
//             </div>

//             {/* Service Charge */}
//             <div className="bg-gray-100 rounded-2xl p-4">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <Briefcase size={18} />
//                 <p className="text-sm">Service Charge</p>
//               </div>

//               <h3 className="text-lg font-bold text-green-600 mt-2">
//                 Starts from ₹199
//               </h3>
//             </div>
//           </div>

//           {/* UNAVAILABLE DATES */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               Booked Dates
//             </h3>

//             <div className="flex flex-wrap gap-3">
//               {availability.length > 0 ? (
//                 availability.map((date, index) => (
//                   <div
//                     key={index}
//                     className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm"
//                   >
//                     {dayjs(date).format("DD MMM YYYY")}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No booked dates</p>
//               )}
//             </div>
//           </div>

//           {/* DATE PICKER */}
//           <div className="mt-8">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Booking Date"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 disablePast
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleBooking}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold"
//             >
//               Confirm Booking
//             </button>

//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookWorkerPage;

// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Briefcase, BadgeCheck, MapPin } from "lucide-react";

// import dayjs from "dayjs";

// import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import toast from "react-hot-toast";

// import api from "../../api/axios";

// function BookWorkerPage() {
//   const { workerId } = useParams();

//   const navigate = useNavigate();

//   const location = useLocation();

//   // WORKER FROM PREVIOUS PAGE
//   const worker = location.state?.worker;

//   const [availability, setAvailability] = useState([]);

//   const [selectedDate, setSelectedDate] = useState(null);

//   // ADDRESS STATES
//   const [address, setAddress] = useState("");

//   const [latitude, setLatitude] = useState(null);

//   const [longitude, setLongitude] = useState(null);

//   const [loadingLocation, setLoadingLocation] = useState(false);

//   useEffect(() => {
//     fetchAvailability();
//     fetchCustomerProfile();
//   }, []);

//   // FETCH BOOKED DATES
//   const fetchAvailability = async () => {
//     try {
//       const res = await api.get(`/booking/availability/${workerId}`);

//       setAvailability(res.data.unavailableDates || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH PREVIOUS SAVED ADDRESS
//   const fetchCustomerProfile = async () => {
//     try {
//       const res = await api.get("/customer/profile");

//       const customer = res.data.customer;

//       setAddress(customer?.savedAddress || "");

//       setLatitude(customer?.latitude || null);

//       setLongitude(customer?.longitude || null);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // USE CURRENT LOCATION
//   const handleCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     setLoadingLocation(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const lat = position.coords.latitude;

//           const lng = position.coords.longitude;

//           setLatitude(lat);

//           setLongitude(lng);

//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//           );

//           const data = await response.json();

//           const currentAddress = data.display_name || "";

//           setAddress(currentAddress);

//           toast.success("Location fetched successfully");
//         } catch (error) {
//           console.log(error);

//           toast.error("Failed to fetch address");
//         } finally {
//           setLoadingLocation(false);
//         }
//       },
//       () => {
//         toast.error("Location permission denied");
//         setLoadingLocation(false);
//       },
//     );
//   };

//   // BOOKING
//   const handleBooking = async () => {
//     try {
//       if (!selectedDate) {
//         toast.error("Please select booking date");
//         return;
//       }

//       if (!address.trim()) {
//         toast.error("Please enter address");
//         return;
//       }

//       await api.post("/booking/book", {
//         workerId,
//         service: worker?.services?.[0],
//         date: selectedDate.format("YYYY-MM-DD"),

//         // ADDRESS DATA
//         address,
//         latitude,
//         longitude,
//       });

//       toast.success("Booking Successful");

//       navigate("/customer/bookings");
//     } catch (error) {
//       console.log(error);

//       toast.error(error.response?.data?.message || "Booking Failed");
//     }
//   };

//   // IF PAGE REFRESHED
//   if (!worker) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
//           <h2 className="text-2xl font-bold text-red-500">
//             Worker Data Missing
//           </h2>

//           <p className="text-gray-500 mt-2">
//             Please go back and select worker again
//           </p>

//           <button
//             onClick={() => navigate(-1)}
//             className="mt-5 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex justify-center items-center">
//       <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl overflow-hidden">
//         {/* TOP SECTION */}
//         <div className="bg-green-500 p-8 text-white text-center">
//           <img
//             src={
//               worker.image ||
//               "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//             }
//             alt="worker"
//             className="w-28 h-28 rounded-full mx-auto border-4 border-white object-cover"
//           />

//           <h2 className="text-3xl font-bold mt-4">{worker.fullName}</h2>

//           <p className="mt-2 opacity-90">{worker.location}</p>
//         </div>

//         {/* BODY */}
//         <div className="p-6">
//           <div className="grid grid-cols-2 gap-4">
//             {/* Experience */}
//             <div className="bg-gray-100 rounded-2xl p-4">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <BadgeCheck size={18} />
//                 <p className="text-sm">Experience</p>
//               </div>

//               <h3 className="text-lg font-bold text-gray-800 mt-2">
//                 {worker.experience || "2+ Years"}
//               </h3>
//             </div>

//             {/* Service Charge */}
//             <div className="bg-gray-100 rounded-2xl p-4">
//               <div className="flex items-center gap-2 text-gray-500">
//                 <Briefcase size={18} />
//                 <p className="text-sm">Service Charge</p>
//               </div>

//               <h3 className="text-lg font-bold text-green-600 mt-2">
//                 Starts from ₹199
//               </h3>
//             </div>
//           </div>

//           {/* ADDRESS */}
//           <div className="mt-8">
//             <div className="flex justify-between items-center mb-3">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Service Address
//               </h3>

//               <button
//                 onClick={handleCurrentLocation}
//                 disabled={loadingLocation}
//                 className="flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-xl text-sm font-medium transition"
//               >
//                 <MapPin size={16} />

//                 {loadingLocation ? "Fetching..." : "Use Current Location"}
//               </button>
//             </div>

//             <textarea
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               rows={4}
//               placeholder="Enter your address"
//               className="w-full border border-gray-300 rounded-2xl p-4 outline-none focus:border-green-500 resize-none"
//             />
//           </div>

//           {/* UNAVAILABLE DATES */}
//           <div className="mt-8">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">
//               Booked Dates
//             </h3>

//             <div className="flex flex-wrap gap-3">
//               {availability.length > 0 ? (
//                 availability.map((date, index) => (
//                   <div
//                     key={index}
//                     className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm"
//                   >
//                     {dayjs(date).format("DD MMM YYYY")}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No booked dates</p>
//               )}
//             </div>
//           </div>

//           {/* DATE PICKER */}
//           <div className="mt-8">
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Booking Date"
//                 value={selectedDate}
//                 onChange={(newValue) => setSelectedDate(newValue)}
//                 disablePast
//                 slotProps={{
//                   textField: {
//                     fullWidth: true,
//                   },
//                 }}
//               />
//             </LocalizationProvider>
//           </div>

//           {/* BUTTONS */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleBooking}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold"
//             >
//               Confirm Booking
//             </button>

//             <button
//               onClick={() => navigate(-1)}
//               className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookWorkerPage;

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
    fetchSavedAddress();
  }, []);

  /* FETCH BOOKED DATES */
  const fetchAvailability = async () => {
    try {
      const res = await api.get(`/booking/availability/${workerId}`);

      setAvailability(res.data.unavailableDates || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* FETCH SAVED ADDRESS */
  const fetchSavedAddress = async () => {
    try {
      const { data } = await api.get("/customer/address");

      if (data?.address) {
        setAddress({
          houseNo: data.address.houseNo || "",
          street: data.address.street || "",
          city: data.address.city || "",
          pincode: data.address.pincode || "",
          phone: data.address.phone || "",
          latitude: data.address.latitude || "",
          longitude: data.address.longitude || "",
        });
      }
    } catch (error) {
      console.log(error);
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
  // const handleUseCurrentLocation = () => {
  //   if (!navigator.geolocation) {
  //     toast.error("Geolocation not supported");
  //     return;
  //   }

  //   setLoadingLocation(true);

  //   navigator.geolocation.getCurrentPosition(
  //     async (position) => {
  //       try {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;

  //         setAddress((prev) => ({
  //           ...prev,
  //           latitude,
  //           longitude,
  //         }));

  //         toast.success("Location Added");
  //       } catch (error) {
  //         console.log(error);
  //         toast.error("Failed to fetch location");
  //       } finally {
  //         setLoadingLocation(false);
  //       }
  //     },
  //     () => {
  //       toast.error("Location permission denied");
  //       setLoadingLocation(false);
  //     },
  //   );
  // };
  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await response.json();

          const addressData = data.address;

          setAddress({
            houseNo: addressData.house_number || "",
            street: addressData.road || addressData.suburb || "",
            city:
              addressData.city || addressData.town || addressData.village || "",
            pincode: addressData.postcode || "",
            phone: "",
            latitude,
            longitude,
          });

          toast.success("Location Added");
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch address");
        }
      },
      (error) => {
        console.log(error);
        toast.error("Failed to get location");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };
  /* BOOKING */
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
        toast.error("Enter valid pincode");
        return;
      }

      if (!/^[6-9]\d{9}$/.test(address.phone)) {
        toast.error("Enter valid mobile number");
        return;
      }

      /* SAVE ADDRESS */
      await api.put("/customer/save-address", address);

      /* BOOK WORKER */
      await api.post("/booking/book", {
        workerId,
        service: worker?.services?.[0],
        date: selectedDate.format("YYYY-MM-DD"),
        address,
      });

      toast.success("Booking Successful");

      navigate("/customer/bookings");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Booking Failed");
    }
  };

  /* REFRESH ISSUE */
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
        {/* TOP */}
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
          {/* INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <BadgeCheck size={18} />

                <p className="text-sm">Experience</p>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mt-2">
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
              <h3 className="text-xl font-bold text-gray-800">
                Service Address
              </h3>

              <button
                onClick={handleUseCurrentLocation}
                className="flex items-center gap-2 text-sm bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition"
              >
                <MapPin size={16} />

                {loadingLocation ? "Fetching..." : "Use Current Location"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="houseNo"
                placeholder="House No"
                value={address.houseNo}
                onChange={handleChange}
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="street"
                placeholder="Street / Area"
                value={address.street}
                onChange={handleChange}
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleChange}
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleChange}
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              <div className="sm:col-span-2 relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={address.phone}
                  onChange={handleChange}
                  className="w-full border rounded-2xl pl-12 pr-4 py-3 outline-none"
                />
              </div>
            </div>
          </div>

          {/* BOOKED DATES */}
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
