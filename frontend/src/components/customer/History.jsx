function History() {
  const history = [
    { service: "Cleaner", date: "01 Apr 2026", status: "Completed" },
    { service: "Painter", date: "25 Mar 2026", status: "Completed" },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      {history.map((h, i) => (
        <div key={i} className="border-b py-2">
          <p>{h.service}</p>
          <p className="text-sm text-gray-500">{h.date}</p>
          <span className="text-blue-500">{h.status}</span>
        </div>
      ))}
    </div>
  );
}

export default History;
