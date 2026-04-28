// const services = [
//   "Cleaning",
//   "Plumbing",
//   "Electrical",
//   "Painting",
//   "Pest Control",
// ];

// export default function Services() {
//   return (
//     <div className="py-16 px-10">
//       <h2 className="text-center text-2xl font-bold mb-10">
//         Our Popular Services
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//         {services.map((s) => (
//           <div
//             key={s}
//             className="bg-white p-6 rounded-xl shadow hover:shadow-lg text-center"
//           >
//             <p className="font-semibold">{s}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// ✅ WRITE HERE (top of file)

const services = [
  {
    title: "House Cleaning",
    desc: "Professional cleaning for a sparkling home.",
    image: "/images/services/cleaning.jpg",
  },
  {
    title: "Plumbing",
    desc: "Expert plumbing services at your door.",
    image: "/images/services/plumber.jpg",
  },
  {
    title: "Electrical",
    desc: "Safe and reliable electrical solutions.",
    image: "/images/services/electrician.jpg",
  },
  {
    title: "Painting",
    desc: "Transform your space with a fresh look.",
    image: "/images/services/painter.jpg",
  },
  {
    title: "Pest Control",
    desc: "Keep your home pest-free & safe.",
    image: "/images/services/pests.jpg",
  },
  {
    title: "Appliance Repair",
    desc: "Fix and service all major appliances.",
    image: "/images/services/appliance.jpg",
  },
];

function Services() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-green-500 text-sm font-semibold">WHAT WE OFFER</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            Our Popular Services
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-800 text-center">
                {service.title}
              </h3>

              <p className="text-xs text-gray-500 text-center mt-1">
                {service.desc}
              </p>

              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-teal-500 transition">
                  <span className="text-gray-400 group-hover:text-white text-sm">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
