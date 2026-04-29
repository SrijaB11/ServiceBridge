import { useParams } from "react-router-dom";

function ServiceProviders() {
  const { id } = useParams();

  // Dummy data (replace with API later)
  const providersData = {
    plumbing: [
      { name: "Ramesh", exp: "5 yrs", rating: "4.5⭐" },
      { name: "Suresh", exp: "3 yrs", rating: "4.2⭐" },
    ],
    cleaning: [{ name: "Anita", exp: "4 yrs", rating: "4.6⭐" }],
    electrical: [{ name: "Raj", exp: "6 yrs", rating: "4.7⭐" }],
  };

  const providers = providersData[id] || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">{id} Providers</h2>

      {providers.length === 0 ? (
        <p>No providers available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((p, i) => (
            <div key={i} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{p.name}</h3>
              <p>{p.exp}</p>
              <p>{p.rating}</p>

              <button className="mt-3 bg-blue-500 text-white px-3 py-1 rounded">
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceProviders;
