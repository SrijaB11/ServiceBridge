// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";

// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// export default function SearchServices() {
//   const navigate = useNavigate();

//   const [service, setService] = useState("");

//   const [servicesList, setServicesList] = useState([]);

//   // FETCH SERVICES
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("http://localhost:5000/service/allServices", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const serviceNames = res.data.services.map((item) => item.name);
//       setServicesList(serviceNames);
//     } catch (error) {
//       console.log(error);

//       if (error.response?.status === 401) {
//         navigate("/login");
//       }
//     }
//   };

//   return (
//     // <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
//     <div className="w-full ">
//       <Autocomplete
//         freeSolo
//         options={servicesList}
//         inputValue={service}
//         onInputChange={(event, newInputValue) => {
//           setService(newInputValue);
//         }}
//         // SELECT SERVICE
//         onChange={(event, newValue) => {
//           if (!newValue) return;

//           navigate(`/service/${encodeURIComponent(newValue)}`);
//         }}
//         // FILTER
//         filterOptions={(options, state) => {
//           return options.filter((option) =>
//             option.toLowerCase().includes(state.inputValue.toLowerCase()),
//           );
//         }}
//         // INPUT
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder="Search services..."
//             fullWidth
//             // ENTER KEY
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 event.preventDefault();

//                 if (!service.trim()) return;

//                 navigate(`/service/${encodeURIComponent(service)}`);
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
//         // DROPDOWN OPTION
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
//     </div>
//   );
// }

import { Search } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchServices() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [servicesList, setServicesList] = useState([]);

  // FETCH SERVICES
  const fetchServices = useCallback(async () => {
    try {
      performance.mark("services-start");

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/service/allServices",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      performance.mark("services-end");

      performance.measure("services-api", "services-start", "services-end");

      console.log(performance.getEntriesByName("services-api")[0].duration);
      setServicesList(data.services?.map((item) => item.name) || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  }, [navigate]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // REUSE NAVIGATION LOGIC
  const handleNavigate = useCallback(
    (value) => {
      const searchValue = value?.trim();

      if (!searchValue) return;

      navigate(`/service/${searchValue}`);
    },
    [navigate],
  );

  // MEMOIZED FILTER
  const filterOptions = useMemo(
    () => (options, state) =>
      options.filter((option) =>
        option.toLowerCase().includes(state.inputValue.toLowerCase()),
      ),
    [],
  );

  return (
    <div className="w-full">
      <Autocomplete
        freeSolo
        options={servicesList}
        inputValue={service}
        filterOptions={filterOptions}
        onInputChange={(_, value) => setService(value)}
        onChange={(_, value) => handleNavigate(value)}
        noOptionsText="No services found"
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search services..."
            fullWidth
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleNavigate(service);
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
      />
    </div>
  );
}
