// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const services = [
// // //   {
// // //     id: 1,
// // //     title: "House Cleaning",
// // //     desc: "Professional cleaning for a sparkling home.",
// // //     image: "/images/services/cleaning.jpg",
// // //   },
// // //   {
// // //     id: "plumber",
// // //     title: "Plumber",
// // //     desc: "Expert plumbing services at your door.",
// // //     image: "/images/services/plumber.jpg",
// // //   },
// // //   {
// // //     id: "electrician",
// // //     title: "Electrician",
// // //     desc: "Safe and reliable electrical solutions.",
// // //     image: "/images/services/electrician.jpg",
// // //   },
// // //   {
// // //     id: 4,
// // //     title: "Painting",
// // //     desc: "Transform your space with a fresh look.",
// // //     image: "/images/services/painter.jpg",
// // //   },
// // //   {
// // //     id: 5,
// // //     title: "Pest Control",
// // //     desc: "Keep your home pest-free & safe.",
// // //     image: "/images/services/pests.jpg",
// // //   },
// // //   {
// // //     id: 6,
// // //     title: "Appliance Repair",
// // //     desc: "Fix and service all major appliances.",
// // //     image: "/images/services/appliance.jpg",
// // //   },
// // // ];

// // // function CustomerServices() {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <section className="py-16 bg-gray-50">
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
// // //         {services.map((s) => (
// // //           <div
// // //             key={s.id}
// // //             className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
// // //             onClick={() => navigate(`/service/${s.id}`)}
// // //           >
// // //             <img
// // //               className="w-40 h-40 object-cover"
// // //               src={s.image}
// // //               alt={s.title}
// // //             />
// // //             <h3 className="font-semibold mt-2">{s.title}</h3>
// // //             <p className="text-gray-500 text-sm mt-1">{s.desc}</p>

// // //             <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
// // //               Book Now
// // //             </button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }

// // // export default CustomerServices;
// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const services = [
// //   {
// //     id: "Plumber",
// //     title: "Plumbing",
// //     desc: "Expert plumbing services at your door.",
// //     image: "/images/services/plumber.jpg",
// //   },
// //   {
// //     id: "Cleaning",
// //     title: "House Cleaning",
// //     desc: "Professional cleaning for a sparkling home.",
// //     image: "/images/services/cleaning.jpg",
// //   },
// //   {
// //     id: "Electrician",
// //     title: "Electrician",
// //     desc: "Safe electrical solutions.",
// //     image: "/images/services/electrician.jpg",
// //   },
// //   {
// //     id: "Painting",
// //     title: "Painting",
// //     desc: "Transform your walls beautifully.",
// //     image: "/images/services/painter.jpg",
// //   },
// // ];

// // function CustomerServices() {
// //   const navigate = useNavigate();

// //   return (
// //     <section className="py-6">
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {services.map((service) => (
// //           <div
// //             key={service.id}
// //             className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
// //           >
// //             <img
// //               src={service.image}
// //               alt={service.title}
// //               className="w-full h-52 object-cover"
// //             />

// //             <div className="p-5">
// //               <h3 className="text-lg font-bold text-gray-800">
// //                 {service.title}
// //               </h3>

// //               <p className="text-sm text-gray-500 mt-2">{service.desc}</p>

// //               <button
// //                 onClick={() => navigate(`/service/${service.id}`)}
// //                 className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition"
// //               >
// //                 View Providers
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // export default CustomerServices;
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const services = [
//   {
//     id: "Plumber",
//     title: "Plumbing",
//     desc: "Expert plumbing services at your door.",
//     image: "/images/services/plumber.jpg",
//   },
//   {
//     id: "Cleaning",
//     title: "House Cleaning",
//     desc: "Professional cleaning for a sparkling home.",
//     image: "/images/services/cleaning.jpg",
//   },
//   {
//     id: "Electrician",
//     title: "Electrician",
//     desc: "Safe electrical solutions.",
//     image: "/images/services/electrician.jpg",
//   },
//   {
//     id: "Painting",
//     title: "Painting",
//     desc: "Transform your walls beautifully.",
//     image: "/images/services/painter.jpg",
//   },
// ];

// function CustomerServices({ searchService = "" }) {
//   const navigate = useNavigate();

//   // FILTER SERVICES
//   const filteredServices = services.filter(
//     (service) =>
//       service.title.toLowerCase().includes(searchService.toLowerCase()) ||
//       service.id.toLowerCase().includes(searchService.toLowerCase()),
//   );

//   return (
//     <section className="py-6">
//       {/* SEARCH TITLE */}
//       {searchService && (
//         <div className="mb-5">
//           <h2 className="text-xl font-bold text-gray-800">
//             Search Results for "{searchService}"
//           </h2>
//         </div>
//       )}

//       {/* NO RESULTS */}
//       {filteredServices.length === 0 && (
//         <div className="bg-white p-6 rounded-2xl shadow text-center">
//           <h2 className="text-lg font-semibold text-red-500">
//             No services found
//           </h2>

//           <p className="text-gray-500 mt-2">Try searching another service</p>
//         </div>
//       )}

//       {/* SERVICES */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {filteredServices.map((service) => (
//           <div
//             key={service.id}
//             className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
//           >
//             {/* IMAGE */}
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-full h-52 object-cover"
//             />

//             {/* CONTENT */}
//             <div className="p-5">
//               <h3 className="text-lg font-bold text-gray-800">
//                 {service.title}
//               </h3>

//               <p className="text-sm text-gray-500 mt-2">{service.desc}</p>

//               {/* BUTTON */}
//               <button
//                 onClick={() => navigate(`/service/${service.id}`)}
//                 className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition"
//               >
//                 View Providers
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default CustomerServices;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// function CustomerServices({ searchService = "" }) {
//   const navigate = useNavigate();

//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API = import.meta.env.VITE_API_BASE_URL;

//   /* FETCH SERVICES */
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(`${API}/service/allServices`);

//       console.log(res.data);

//       setServices(res.data.services);
//     } catch (error) {
//       console.log(error);

//       toast.error("Failed to load services");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* FILTER SERVICES */
//   const filteredServices = services.filter(
//     (service) =>
//       service.title.toLowerCase().includes(searchService.toLowerCase()) ||
//       service.id.toLowerCase().includes(searchService.toLowerCase()),
//   );

//   return (
//     <section className="py-6">
//       {/* SEARCH TITLE */}
//       {searchService && (
//         <div className="mb-5">
//           <h2 className="text-xl font-bold text-gray-800">
//             Search Results for "{searchService}"
//           </h2>
//         </div>
//       )}

//       {/* LOADING */}
//       {loading && (
//         <div className="flex justify-center items-center py-20">
//           <p className="text-lg font-semibold text-gray-500">
//             Loading services...
//           </p>
//         </div>
//       )}

//       {/* NO SERVICES */}
//       {!loading && filteredServices.length === 0 && (
//         <div className="bg-white p-6 rounded-2xl shadow text-center">
//           <h2 className="text-lg font-semibold text-red-500">
//             No services found
//           </h2>

//           <p className="text-gray-500 mt-2">Try searching another service</p>
//         </div>
//       )}

//       {/* SERVICES */}
//       {!loading && filteredServices.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredServices.map((service) => (
//             <div
//               key={service.id}
//               className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
//             >
//               {/* IMAGE */}
//               <div className="overflow-hidden">
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
//                 />
//               </div>

//               {/* CONTENT */}
//               <div className="p-5">
//                 <h3 className="text-lg font-bold text-gray-800">
//                   {service.title}
//                 </h3>

//                 <p className="text-sm text-gray-500 mt-2 line-clamp-2">
//                   {service.desc}
//                 </p>

//                 {/* BUTTON */}
//                 <button
//                   onClick={() => navigate(`/service/${service.id}`)}
//                   className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition"
//                 >
//                   View Providers
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// export default CustomerServices;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Wrench } from "lucide-react";

function CustomerServices({ searchService = "" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH SERVICES FROM BACKEND
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/service/allServices");

      console.log(res.data);

      setServices(res.data.services || []);
    } catch (error) {
      console.log("Fetch Services Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // FILTER SERVICES
  const filteredServices = services.filter((service) => {
    const serviceName = service?.name || "";
    const serviceDescription = service?.description || "";

    return (
      serviceName.toLowerCase().includes(searchService.toLowerCase()) ||
      serviceDescription.toLowerCase().includes(searchService.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Services</h1>

        <p className="text-gray-500 mt-2">
          Find trusted professionals for your home needs
        </p>
      </div>

      {/* SEARCH RESULT */}
      {searchService && (
        <div className="mb-6 flex items-center gap-2 bg-white px-4 py-3 rounded-2xl shadow-sm">
          <Search className="text-green-500" size={20} />

          <p className="text-gray-700 font-medium">
            Search Results for:
            <span className="text-green-600 ml-1">"{searchService}"</span>
          </p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredServices.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center shadow-sm">
          <Wrench size={50} className="mx-auto text-red-400" />

          <h2 className="text-2xl font-bold text-gray-700 mt-4">
            No Services Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another keyword
          </p>
        </div>
      )}

      {/* SERVICES GRID */}
      {!loading && filteredServices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 group"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">
                  {service.name}
                </h2>

                <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                  {service.description}
                </p>

                {/* BUTTON */}
                <button
                  onClick={() => navigate(`/service/${service.name}`)}
                  className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  View Providers
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerServices;
