import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [showAppRating, setShowAppRating] = useState(false);

  const [appRating, setAppRating] = useState(0);

  const [appHover, setAppHover] = useState(0);

  const [appReview, setAppReview] = useState("");

  const [hasExistingAppRating, setHasExistingAppRating] = useState(false);
  useEffect(() => {
    fetchAppRating();
  }, []);

  const fetchAppRating = async () => {
    try {
      const { data } = await api.get("/apprating/customerappreview");

      if (data?.data) {
        setHasExistingAppRating(true);

        setAppRating(data.data.rating);

        setAppReview(data.data.review || "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitReview = async () => {
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setLoading(true);

      await api.post("/review/add", {
        bookingId,
        rating,
        comment,
      });

      toast.success("Review submitted successfully");

      setShowAppRating(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };
  const submitAppRating = async () => {
    try {
      if (!appRating) {
        toast.error("Please select app rating");
        return;
      }

      await api.post("/apprating/rate", {
        rating: appRating,
        review: appReview,
      });

      toast.success(
        hasExistingAppRating ? "App rating updated" : "App rating submitted",
      );

      navigate("/customer/history");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to submit app rating",
      );
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
      {showAppRating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-center text-green-700">
              {hasExistingAppRating
                ? "Update ServiceBridge Rating"
                : "Rate ServiceBridge"}
            </h2>

            <p className="text-center text-gray-500 mt-2">
              Share your overall experience using our platform
            </p>

            <div className="flex justify-center gap-2 mt-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setAppRating(star)}
                  onMouseEnter={() => setAppHover(star)}
                  onMouseLeave={() => setAppHover(0)}
                >
                  <Star
                    size={38}
                    className={`transition-all ${
                      star <= (appHover || appRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className="text-center mt-2 text-gray-600">
              {appRating ? `${appRating} / 5` : "Select Rating"}
            </p>

            <textarea
              rows="4"
              value={appReview}
              onChange={(e) => setAppReview(e.target.value)}
              placeholder="Write about ServiceBridge..."
              className="w-full mt-5 border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate("/customer/history")}
                className="flex-1 border border-gray-300 rounded-xl py-3"
              >
                Skip
              </button>

              <button
                onClick={submitAppRating}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
              >
                {hasExistingAppRating ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
