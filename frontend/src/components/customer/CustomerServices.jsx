// import React from "react";
// //import { useNavigate } from "react-router-dom";

// const services = [
//   {
//     id: "cleaning",
//     title: "House Cleaning",
//     image: "/images/services/cleaning.jpg",
//   },
//   { id: "plumbing", title: "Plumbing", image: "/images/services/plumber.jpg" },
// ];

// function CustomerServices() {
//  // const navigate = useNavigate();
//   const [workers, setWorkers] = useState([]);
//   const [selectedService, setSelectedService] = useState("");
//   const handleBookService = async (service) => {
//     try {
//       setSelectedService(service);

//       const res = await axios.get(
//         `http://localhost:5000/workerslist/${service}`,
//       );

//       setWorkers(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
//           {services.map((service) => (
//             <div key={service.id} className="bg-white rounded-2xl p-6 border">
//               <img src={service.image} alt={service.title} />

//               <h3>{service.title}</h3>

//               <button
//                 // onClick={() => navigate(`/service/${service.id}`)}
//                 onClick={() => handleBookService("plumber")}
//                 className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Book Service
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default CustomerServices;
import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "cleaning",
    title: "House Cleaning",
    image: "/images/services/cleaning.jpg",
  },
  {
    id: "plumber",
    title: "Plumbing",
    image: "/images/services/plumber.jpg",
  },
];

function CustomerServices() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 border">
              <img src={service.image} alt={service.title} />

              <h3 className="mt-2 font-semibold">{service.title}</h3>

              <button
                onClick={() => navigate(`/service/${service.id}`)}
                className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
              >
                Book Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerServices;
