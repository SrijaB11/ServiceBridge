import { useState } from "react";

function History() {
  const [history, setHistory] = useState([
    { id: 1, service: "Cleaner", date: "01 Apr 2026", status: "Completed" },
    { id: 2, service: "Painter", date: "25 Mar 2026", status: "Completed" },
  ]);
  const handleDelete = (id) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {history.map((items, ind) => (
        <div key={ind} className="border-b py-2">
          <p>{items.service}</p>
          <p className="text-sm text-gray-500">{items.date}</p>
          <span className="text-blue-500">{items.status}</span>
          <div>
            <button
              onClick={() => handleDelete(items.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;
