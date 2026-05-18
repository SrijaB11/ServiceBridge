// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";

// import axios from "axios";

// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// export default function SearchServices() {
//   // SEARCH VALUE
//   const [service, setService] = useState("");

//   // SERVICES LIST
//   const [servicesList, setServicesList] = useState([]);

//   // WORKERS
//   const [workers, setWorkers] = useState([]);

//   // LOADING
//   const [loading, setLoading] = useState(false);

//   // SEARCHED
//   const [searched, setSearched] = useState(false);

//   // FETCH SERVICES
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/service/allServices");

//       console.log("SERVICES =>", res.data);

//       // ONLY SERVICE NAMES
//       const serviceNames = res.data.services.map((item) => item.name);

//       setServicesList(serviceNames);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // FETCH WORKERS
//   const fetchWorkers = async (selectedService) => {
//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         `http://localhost:5000/customer/workerslist/${encodeURIComponent(selectedService)}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       console.log("WORKERS =>", res.data);

//       setWorkers(res.data || []);
//     } catch (error) {
//       console.log(error);

//       setWorkers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
//       {/* SEARCH BOX */}
//       <Autocomplete
//         freeSolo
//         options={servicesList}
//         inputValue={service}
//         onInputChange={(event, newInputValue) => {
//           setService(newInputValue);
//         }}
//         onChange={(event, newValue) => {
//           if (!newValue) return;

//           setService(newValue);

//           fetchWorkers(newValue);
//         }}
//         filterOptions={(options, state) => {
//           return options.filter((option) =>
//             option.toLowerCase().includes(state.inputValue.toLowerCase()),
//           );
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder="Search services..."
//             fullWidth
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 event.preventDefault();

//                 fetchWorkers(service);
//               }
//             }}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "12px",
//                 backgroundColor: "#f9fafb",

//                 "& fieldset": {
//                   borderColor: "#e5e7eb",
//                 },

//                 "&:hover fieldset": {
//                   borderColor: "#22c55e",
//                 },

//                 "&.Mui-focused fieldset": {
//                   borderColor: "#22c55e",
//                   borderWidth: "2px",
//                 },
//               },
//             }}
//           />
//         )}
//         renderOption={(props, option) => (
//           <li
//             {...props}
//             key={option}
//             className="px-4 py-3 hover:bg-green-50 cursor-pointer"
//           >
//             <div className="flex items-center gap-2">
//               <Search size={16} className="text-green-500" />

//               <span>{option}</span>
//             </div>
//           </li>
//         )}
//         noOptionsText="No services found"
//       />

//       {/* LOADING */}
//       {loading && (
//         <div className="flex justify-center mt-5">
//           <div className="h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* WORKERS LIST */}
//       <div className="mt-5 space-y-3">
//         {/* NO WORKERS */}
//         {searched && !loading && workers.length === 0 && (
//           <p className="text-center text-gray-500">No workers found</p>
//         )}

//         {/* WORKERS */}
//         {workers.map((worker) => (
//           <div
//             key={worker._id}
//             className="p-4 border rounded-xl hover:shadow-md transition"
//           >
//             <h3 className="font-semibold text-lg text-gray-800">
//               {worker.fullName || worker.name}
//             </h3>

//             <p className="text-gray-500 mt-1">
//               {Array.isArray(worker.services)
//                 ? worker.services.join(", ")
//                 : worker.service}
//             </p>

//             {worker.location && (
//               <p className="text-sm text-gray-400 mt-1">{worker.location}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchServices() {
  // NAVIGATE
  const navigate = useNavigate();

  // SEARCH VALUE
  const [service, setService] = useState("");

  // SERVICES LIST
  const [servicesList, setServicesList] = useState([]);

  // FETCH SERVICES
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/service/allServices");

      console.log("SERVICES =>", res.data);

      // ONLY SERVICE NAMES
      const serviceNames = res.data.services.map((item) => item.name);

      setServicesList(serviceNames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
    <div className="w-full ">
      {/* SEARCH BOX */}
      <Autocomplete
        freeSolo
        options={servicesList}
        inputValue={service}
        // TYPING
        onInputChange={(event, newInputValue) => {
          setService(newInputValue);
        }}
        // SELECT SERVICE
        onChange={(event, newValue) => {
          if (!newValue) return;

          navigate(`/service/${encodeURIComponent(newValue)}`);
        }}
        // FILTER
        filterOptions={(options, state) => {
          return options.filter((option) =>
            option.toLowerCase().includes(state.inputValue.toLowerCase()),
          );
        }}
        // INPUT
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search services..."
            fullWidth
            // ENTER KEY
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();

                if (!service.trim()) return;

                navigate(`/service/${encodeURIComponent(service)}`);
              }
            }}
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
        // DROPDOWN OPTION
        renderOption={(props, option) => (
          <li
            {...props}
            key={option}
            className="px-4 py-3 hover:bg-green-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search size={16} className="text-green-500" />

              <span>{option}</span>
            </div>
          </li>
        )}
        noOptionsText="No services found"
      />
    </div>
  );
}
