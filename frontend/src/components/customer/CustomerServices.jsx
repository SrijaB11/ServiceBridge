import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Search, Wrench } from "lucide-react";

import api from "../../api/axios";

function CustomerServices({ searchService = "" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH SERVICES
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/service/allServices");

      setServices(res.data.services || []);
    } catch (error) {
      console.log("Fetch Services Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // FILTER SERVICES
  const filteredServices = useMemo(() => {
    const search = searchService.toLowerCase();

    return services.filter((service) => {
      const serviceName = service?.name || "";
      const serviceDescription = service?.description || "";

      return (
        serviceName.toLowerCase().includes(search) ||
        serviceDescription.toLowerCase().includes(search)
      );
    });
  }, [services, searchService]);

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
          {filteredServices.map((service) => (
            <div
              key={service._id || service.name}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 group"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  loading="lazy"
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

export default memo(CustomerServices);
