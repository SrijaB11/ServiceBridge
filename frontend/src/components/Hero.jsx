import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchServices from "./customer/SearchServices";

export default function Hero() {
  const navigate = useNavigate();

  // const [service, setService] = useState("");
  // const [location, setLocation] = useState("");

  // SERVICES
  // const servicesList = [
  //   "Plumber",
  //   "Electrician",
  //   "Carpenter",
  //   "AC Repair",
  //   "Painting",
  //   "Floor Cleaning",
  //   "Washroom Cleaning",
  //   "Washing Machine Repair",
  //   "Refrigerator Repair",
  //   "TV Repair",
  //   "Pest Control",
  //   "Water Purifier Repair",
  //   "Stove & Microwave Repair",
  //   "Salon Men and Women",
  // ];

  // LOCATIONS
  // const cityNames = [
  //   "Hyderabad",
  //   "Secunderabad",
  //   "Madhapur",
  //   "Hitech City",
  //   "Gachibowli",
  //   "Kukatpally",
  //   "Ameerpet",
  //   "Banjara Hills",
  //   "Jubilee Hills",
  //   "Warangal",
  //   "Karimnagar",
  //   "Nizamabad",
  // ];

  // SEARCH
  // const handleSearch = () => {
  //   const token = localStorage.getItem("token");

  //   // NOT LOGGED IN
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   // LOGGED IN
  //   if (!service) {
  //     alert("Please select service");
  //     return;
  //   }

  //   navigate(`/service/${service.toLowerCase()}`);
  // };

  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="text-center lg:text-left">
            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Trusted Home Services
            </div>

            {/* HEADING */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-800">
              Quality Services.
              <br />
              Trusted Professionals.
              <br />
              <span className="text-green-500">Complete Peace of Mind.</span>
            </h1>

            {/* DESC */}
            <p className="mt-5 text-gray-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
              Book trusted experts near you for plumbing, cleaning, electrical
              work and more.
            </p>
            <SearchServices />
            {/* SEARCH BOX */}
            {/* <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
              <div className="flex flex-col lg:flex-row gap-3">
                {/* SERVICE SEARCH */}
            {/* <div className="flex-1">
                  <Autocomplete
                    options={servicesList}
                    value={service}
                    onChange={(event, newValue) => setService(newValue || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Service"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f9fafb",

                            "& fieldset": {
                              borderColor: "#e5e7eb",
                            },

                            "&:hover fieldset": {
                              borderColor: "#22c55e",
                            },

                            "&.Mui-focused fieldset": {
                              borderColor: "#22c55e",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </div> */}

            {/* LOCATION */}
            {/* <div className="flex-1 relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                  />

                  <Autocomplete
                    options={cityNames}
                    value={location}
                    onChange={(event, newValue) => setLocation(newValue || "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Location"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                            backgroundColor: "#f9fafb",
                            paddingLeft: "34px",

                            "& fieldset": {
                              borderColor: "#e5e7eb",
                            },

                            "&:hover fieldset": {
                              borderColor: "#22c55e",
                            },

                            "&.Mui-focused fieldset": {
                              borderColor: "#22c55e",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    )}
                  />
                </div> */}

            {/* BUTTON */}
            {/* <button
                  onClick={handleSearch}
                  className="h-14 lg:h-auto px-6 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-2 transition"
                >
                  <Search size={18} />
                  Find Experts
                </button> */}
            {/* </div>
            </div> */}

            {/* STATS */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">500+</h3>

                <p className="text-gray-500 text-sm">Verified Workers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800">10K+</h3>

                <p className="text-gray-500 text-sm">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800">24/7</h3>

                <p className="text-gray-500 text-sm">Customer Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end relative">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-green-100 rounded-full blur-3xl opacity-40"></div>

            <img
              src="/images/service_bridge_illustration.png"
              alt="Service Worker"
              className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
