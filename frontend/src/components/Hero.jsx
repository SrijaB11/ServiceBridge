import { MapPin } from "lucide-react";

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-10 px-10 py-16 bg-gradient-to-r from-green-50 to-purple-50">
      {/* LEFT */}
      <div>
        <h1 className="text-5xl font-bold leading-tight">
          Quality Services. <br />
          Trusted Professionals. <br />
          <span className="text-green-500">Complete Peace of Mind.</span>
        </h1>

        <p className="text-gray-500 mt-4">Find trusted experts near you.</p>

        {/* Search Box */}
        <div className="flex gap-2 mt-6 bg-white p-2 rounded-xl shadow">
          <input
            placeholder="What service do you need?"
            className="flex-1 outline-none px-3"
          />
          <button className="flex items-center gap-1 px-4 bg-gray-100 rounded">
            <MapPin size={16} /> Location
          </button>
          <button className="bg-green-500 text-white px-4 rounded">
            Find Experts
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex justify-center">
        <img src="/images/worker.png" alt="worker" className="w-[350px]" />
      </div>
    </div>
  );
}
