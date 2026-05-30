import { createContext, useContext, useState, useEffect } from "react";

import axios from "axios";

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // Check cache first
      const cachedServices = localStorage.getItem("services");

      if (cachedServices) {
        setServices(JSON.parse(cachedServices));
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/service/allServices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const servicesData = res.data.services || [];

      setServices(servicesData);

      // Save to cache
      localStorage.setItem("services", JSON.stringify(servicesData));
    } catch (error) {
      console.log("Service Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh services manually
  const refreshServices = async () => {
    localStorage.removeItem("services");
    await fetchServices();
  };

  return (
    <ServiceContext.Provider
      value={{
        services,
        loading,
        refreshServices,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useServices = () => useContext(ServiceContext);
