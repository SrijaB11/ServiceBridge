// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import api from "../../api/axios";

// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";

// export default function SearchServices() {
//   const navigate = useNavigate();

//   const [service, setService] = useState("");
//   const [servicesList, setServicesList] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         // Cache first
//         const cachedServices = localStorage.getItem("services");

//         if (cachedServices) {
//           setServicesList(JSON.parse(cachedServices));
//           return;
//         }

//         const { data } = await api.get("/service/allServices");

//         const services = data.services?.map((item) => item.name) || [];

//         setServicesList(services);

//         localStorage.setItem("services", JSON.stringify(services));
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleNavigate = (value) => {
//     const searchValue = value?.trim();

//     if (!searchValue) return;

//     navigate(`/service/${searchValue}`);
//   };

//   const filterOptions = (options, state) =>
//     options.filter((option) =>
//       option.toLowerCase().includes(state.inputValue.toLowerCase()),
//     );

//   return (
//     <div className="w-full">
//       <Autocomplete
//         freeSolo
//         options={servicesList}
//         inputValue={service}
//         filterOptions={filterOptions}
//         onInputChange={(_, value) => setService(value)}
//         onChange={(_, value) => handleNavigate(value)}
//         noOptionsText="No services found"
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             placeholder="Search services..."
//             fullWidth
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 event.preventDefault();
//                 handleNavigate(service);
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
//       />
//     </div>
//   );
// }

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function SearchServices() {
  const navigate = useNavigate();

  const [service, setService] = useState("");
  const [servicesList, setServicesList] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Cache first
        const cachedServices = localStorage.getItem("services");

        if (cachedServices) {
          setServicesList(JSON.parse(cachedServices));
          return;
        }

        const { data } = await api.get("/service/allServices");

        const services = data.services?.map((item) => item.name) || [];

        setServicesList(services);

        localStorage.setItem("services", JSON.stringify(services));
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  const handleNavigate = (value) => {
    const searchValue = value?.trim();

    if (!searchValue) return;

    navigate(`/service/${searchValue}`);
  };

  const filterOptions = (options, state) =>
    options.filter((option) =>
      option.toLowerCase().includes(state.inputValue.toLowerCase()),
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
