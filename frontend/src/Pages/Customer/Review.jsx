import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const Review = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const bookingId = state?.bookingId;
  const workerName = state?.workerName;
  const serviceName = state?.serviceName;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log("Sending Review:", {
        bookingId,
        rating,
        comment,
      });

      await axios.post(
        "http://localhost:5000/review/add",
        {
          bookingId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Review submitted successfully");

      setTimeout(() => {
        navigate("/customer/history");
      }, 1200);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-3xl w-full max-w-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-center text-green-700">
          Service Review
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Share your experience with the service provider
        </p>

        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <p>
            <span className="font-semibold">Worker:</span> {workerName}
          </p>

          <p>
            <span className="font-semibold">Service:</span> {serviceName}
          </p>

          <p>
            <span className="font-semibold">Booking ID:</span> {bookingId}
          </p>
        </div>

        <div className="mt-8">
          <label className="font-semibold block mb-3">Rate Service *</label>

          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={40}
                  className={`transition-all ${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <p className="text-center mt-2 text-gray-600">
            {rating ? `${rating} / 5` : "Select rating"}
          </p>
        </div>

        <div className="mt-8">
          <label className="font-semibold block mb-2">Review (Optional)</label>

          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your experience..."
            className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={submitReview}
          disabled={loading}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default Review;
