import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/complaint/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Complaints</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {complaints.map((complaint) => (
          <div
            key={complaint._id}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-red-500">
                {complaint.subject || "Complaint"}
              </h3>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Pending
              </span>
            </div>

            <p className="text-gray-600 mt-4">{complaint.complaintText}</p>

            <div className="mt-5 space-y-2 text-sm text-gray-500">
              <p>
                Worker:
                <span className="text-gray-700 ml-2">
                  {complaint.worker?.fullName}
                </span>
              </p>

              <p>
                Date:
                <span className="text-gray-700 ml-2">
                  {dayjs(complaint.createdAt).format("DD MMM YYYY")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;
