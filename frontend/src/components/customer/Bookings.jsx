function Bookings() {
  const bookings = [
    { service: "Electrician", date: "10 Apr 2026", status: "Pending" },
    { service: "Plumber", date: "12 Apr 2026", status: "Completed" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      {bookings.map((b, i) => (
        <div key={i} className="border-b py-2">
          <p>{b.service}</p>
          <p className="text-sm text-gray-500">{b.date}</p>
          <span className="text-green-500">{b.status}</span>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
