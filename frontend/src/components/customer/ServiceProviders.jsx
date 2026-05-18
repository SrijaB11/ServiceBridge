import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ServiceProviders() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, [id]);

  const fetchWorkers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/customer/workerslist/${id}`,
      );

      setProviders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/customer")}
          className="px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{id} Professionals</h1>

        <p className="text-gray-500 mt-2">
          Choose the best worker for your service
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && providers.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <h2 className="text-2xl font-bold text-gray-700">
            No Workers Available
          </h2>

          <p className="text-gray-500 mt-2">Please check again later</p>
        </div>
      )}

      {/* WORKERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((worker) => (
          <div
            key={worker._id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="bg-green-50 flex justify-center py-6">
              <img
                src={
                  worker.image ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="worker"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800">
                {worker.fullName}
              </h2>

              <p className="text-gray-500 mt-1">{worker.location}</p>

              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  Experience:
                  <span className="font-semibold ml-1">
                    {worker.experience || "2+ Years"}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  Rating:
                  <span className="text-yellow-500 ml-1">
                    ⭐ {worker.rating || "4.5"}
                  </span>
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/book-worker/${worker._id}`, {
                    state: { worker },
                  })
                }
                className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition"
              >
                Continue Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceProviders;
