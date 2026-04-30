// import { useParams } from "react-router-dom";

// function ServiceProviders() {
//   const { id } = useParams();

//   // Dummy data (replace with API later)
//   const providersData = {
//     plumbing: [
//       { name: "Ramesh", exp: "5 yrs", rating: "4.5⭐" },
//       { name: "Suresh", exp: "3 yrs", rating: "4.2⭐" },
//     ],
//     cleaning: [{ name: "Anita", exp: "4 yrs", rating: "4.6⭐" }],
//     electrical: [{ name: "Raj", exp: "6 yrs", rating: "4.7⭐" }],
//   };

//   const providers = providersData[id] || [];

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 capitalize">{id} Providers</h2>

//       {providers.length === 0 ? (
//         <p>No providers available</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {providers.map((p, i) => (
//             <div key={i} className="bg-white p-4 rounded shadow">
//               <h3 className="font-semibold">{p.name}</h3>
//               <p>{p.exp}</p>
//               <p>{p.rating}</p>

//               <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ServiceProviders;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ServiceProviders() {
  const { id } = useParams(); // service name from URL

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorker, setSelectedWorker] = useState(null);

  // 🔥 Fetch workers from backend
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

  // ✅ Handle booking click
  const handleBook = (worker) => {
    setSelectedWorker(worker);
    alert(`Booking request sent to ${worker.fullName}`);

    // 👉 Later we will connect booking API here
  };

  return (
    <div className="p-6">
      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 capitalize">{id} Providers</h2>

      {/* LOADING */}
      {loading && <p>Loading workers...</p>}

      {/* NO DATA */}
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
              📍 {worker.location || "Not specified"}
            </p>

            <p className="text-gray-500 text-sm">
              💼 {worker.experience || "2+ yrs experience"}
            </p>

            <p className="text-yellow-500 text-sm">
              ⭐ {worker.rating || "4.5"}
            </p>

            <button
              onClick={() => handleBook(worker)}
              className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* SELECTED WORKER (optional preview) */}
      {selectedWorker && (
        <div className="mt-8 p-4 bg-green-50 border rounded-lg">
          <h3 className="font-semibold text-lg">Selected Worker:</h3>
          <p>{selectedWorker.fullName}</p>
        </div>
      )}
    </div>
  );
}

export default ServiceProviders;
