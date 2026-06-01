import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { Star } from "lucide-react";

function ServiceProviders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const workersPerPage = 12;
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/customer/workerslist/${id}`);

        setProviders(data);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Failed to load service providers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [id]);
  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;

  const currentWorkers = providers.slice(indexOfFirstWorker, indexOfLastWorker);

  const totalPages = Math.ceil(providers.length / workersPerPage);
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Back Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/customer")}
          className="px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-medium shadow-sm hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-200"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {decodeURIComponent(id)} Professionals
        </h1>

        <p className="text-gray-500 mt-2">
          Choose the best worker for your service
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 animate-pulse">
              <div className="w-28 h-28 mx-auto rounded-full bg-gray-200"></div>

              <div className="h-5 bg-gray-200 rounded mt-6"></div>

              <div className="h-4 bg-gray-200 rounded mt-3"></div>

              <div className="h-4 bg-gray-200 rounded mt-3"></div>

              <div className="h-10 bg-gray-200 rounded-2xl mt-6"></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && providers.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center shadow">
          <h2 className="text-2xl font-bold text-gray-700">
            No Workers Available
          </h2>

          <p className="text-gray-500 mt-2">Please check again later</p>
        </div>
      )}

      {/* Workers */}
      {/* Workers */}
      {!loading && providers.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWorkers.map((worker) => (
              <div
                key={worker._id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* Profile Image */}
                <div className="bg-green-50 flex justify-center py-6">
                  <img
                    loading="lazy"
                    src={
                      worker?.documents?.profilePhoto
                        ? `http://localhost:5000/${worker.documents.profilePhoto}`
                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={worker.fullName}
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {worker.fullName}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {worker.location || "Location not available"}
                  </p>

                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">
                      Experience:
                      <span className="font-semibold ml-1">
                        {worker.experience || "2+ Years"}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      Rating:
                      <span className="flex items-center gap-1 text-yellow-500 ">
                        <Star size={16} fill="currentColor" />
                        {worker.rating || "4.5"}
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

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              <span className="font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ServiceProviders;
