// // import React from "react";
// // import { useNavigate } from "react-router-dom";

// // const services = [
// //   {
// //     id: 1,
// //     title: "House Cleaning",
// //     desc: "Professional cleaning for a sparkling home.",
// //     image: "/images/services/cleaning.jpg",
// //   },
// //   {
// //     id: "plumber",
// //     title: "Plumber",
// //     desc: "Expert plumbing services at your door.",
// //     image: "/images/services/plumber.jpg",
// //   },
// //   {
// //     id: "electrician",
// //     title: "Electrician",
// //     desc: "Safe and reliable electrical solutions.",
// //     image: "/images/services/electrician.jpg",
// //   },
// //   {
// //     id: 4,
// //     title: "Painting",
// //     desc: "Transform your space with a fresh look.",
// //     image: "/images/services/painter.jpg",
// //   },
// //   {
// //     id: 5,
// //     title: "Pest Control",
// //     desc: "Keep your home pest-free & safe.",
// //     image: "/images/services/pests.jpg",
// //   },
// //   {
// //     id: 6,
// //     title: "Appliance Repair",
// //     desc: "Fix and service all major appliances.",
// //     image: "/images/services/appliance.jpg",
// //   },
// // ];

// // function CustomerServices() {
// //   const navigate = useNavigate();

// //   return (
// //     <section className="py-16 bg-gray-50">
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
// //         {services.map((s) => (
// //           <div
// //             key={s.id}
// //             className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
// //             onClick={() => navigate(`/service/${s.id}`)}
// //           >
// //             <img
// //               className="w-40 h-40 object-cover"
// //               src={s.image}
// //               alt={s.title}
// //             />
// //             <h3 className="font-semibold mt-2">{s.title}</h3>
// //             <p className="text-gray-500 text-sm mt-1">{s.desc}</p>

// //             <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
// //               Book Now
// //             </button>
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

// function CustomerServices() {
//   const navigate = useNavigate();

//   return (
//     <section className="py-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {services.map((service) => (
//           <div
//             key={service.id}
//             className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
//           >
//             <img
//               src={service.image}
//               alt={service.title}
//               className="w-full h-52 object-cover"
//             />

//             <div className="p-5">
//               <h3 className="text-lg font-bold text-gray-800">
//                 {service.title}
//               </h3>

//               <p className="text-sm text-gray-500 mt-2">{service.desc}</p>

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
import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "Plumber",
    title: "Plumbing",
    desc: "Expert plumbing services at your door.",
    image: "/images/services/plumber.jpg",
  },
  {
    id: "Cleaning",
    title: "House Cleaning",
    desc: "Professional cleaning for a sparkling home.",
    image: "/images/services/cleaning.jpg",
  },
  {
    id: "Electrician",
    title: "Electrician",
    desc: "Safe electrical solutions.",
    image: "/images/services/electrician.jpg",
  },
  {
    id: "Painting",
    title: "Painting",
    desc: "Transform your walls beautifully.",
    image: "/images/services/painter.jpg",
  },
];

function CustomerServices({ searchService = "" }) {
  const navigate = useNavigate();

  // FILTER SERVICES
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchService.toLowerCase()) ||
      service.id.toLowerCase().includes(searchService.toLowerCase()),
  );

  return (
    <section className="py-6">
      {/* SEARCH TITLE */}
      {searchService && (
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Search Results for "{searchService}"
          </h2>
        </div>
      )}

      {/* NO RESULTS */}
      {filteredServices.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-red-500">
            No services found
          </h2>

          <p className="text-gray-500 mt-2">Try searching another service</p>
        </div>
      )}

      {/* SERVICES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
          >
            {/* IMAGE */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-52 object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {service.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">{service.desc}</p>

              {/* BUTTON */}
              <button
                onClick={() => navigate(`/service/${service.id}`)}
                className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl font-medium transition"
              >
                View Providers
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CustomerServices;
