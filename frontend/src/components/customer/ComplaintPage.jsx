import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ComplaintPage() {
  const { bookingId } = useParams();
  // console.log("Booking ID:", bookingId);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!formData.subject.trim()) {
      toast.error("Subject is required");
      return;
    }

    if (formData.subject.trim().length < 5) {
      toast.error("Subject must be at least 5 characters");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Complaint details are required");
      return;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Please explain complaint properly");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/complaint/add",
        {
          bookingId,
          complaintText: `${formData.subject} - ${formData.message}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Complaint sent to admin");
      navigate("/customer");

      setFormData({
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-red-500">Raise Complaint</h2>

        <p className="text-gray-500 mt-2">Booking ID: {bookingId}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="font-semibold text-gray-700">Subject</label>

            <input
              type="text"
              name="subject"
              maxLength={60}
              value={formData.subject}
              onChange={handleChange}
              placeholder="Worker late / Extra money / Bad service"
              className="w-full mt-2 border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">
              Complaint Details
            </label>

            <textarea
              rows="5"
              name="message"
              maxLength={500}
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your issue..."
              className="w-full mt-2 border rounded-xl px-4 py-3 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default ComplaintPage;
