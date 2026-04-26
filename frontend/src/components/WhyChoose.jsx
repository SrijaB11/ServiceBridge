export default function WhyChoose() {
  return (
    <div className="grid md:grid-cols-2 gap-10 px-10 py-16">
      <img src="/images/house.png" className="rounded-xl" />

      <div>
        <h2 className="text-3xl font-bold mb-4">We Go Beyond Expectations</h2>
        <p className="text-gray-500 mb-4">
          Reliable, transparent, high-quality services.
        </p>

        <button className="bg-green-500 text-white px-5 py-2 rounded">
          Learn More
        </button>
      </div>
    </div>
  );
}
