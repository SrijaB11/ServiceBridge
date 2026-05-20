import { useParams } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import {
  AlertTriangle,
  Send,
} from "lucide-react";

function WorkerComplaintPage() {

  const { bookingId } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      subject: "",
      message: "",
    });

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /* =========================
     SUBMIT COMPLAINT
  ========================= */

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    /* VALIDATIONS */

    if (
      !formData.subject.trim()
    ) {

      toast.error(
        "Subject is required"
      );

      return;
    }

    if (
      formData.subject.trim()
        .length < 5
    ) {

      toast.error(
        "Subject must be at least 5 characters"
      );

      return;
    }

    if (
      !formData.message.trim()
    ) {

      toast.error(
        "Complaint details are required"
      );

      return;
    }

    if (
      formData.message.trim()
        .length < 10
    ) {

      toast.error(
        "Please explain complaint properly"
      );

      return;
    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.post(
        "http://localhost:5000/worker/complaint/addworker",
         {
           bookingId,

          message:
      `${formData.subject} - ${formData.message}`,
  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Complaint submitted against customer"
      );

      setFormData({
        subject: "",
        message: "",
      });

      navigate(
        "/worker/requests"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to submit complaint"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/40 p-8">

        {/* HEADER */}

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

            <AlertTriangle
              size={28}
              className="text-red-500"
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-gray-800">
              Report Customer
            </h2>

            <p className="text-gray-500 mt-1">
              Booking ID:
              {" "}
              {bookingId}
            </p>

          </div>
        </div>

        {/* INFO BOX */}

        <div className="mt-6 bg-red-50 border border-red-100 rounded-2xl p-4">

          <p className="text-sm text-red-600 leading-relaxed">

            Please provide accurate complaint details.
            False complaints may affect your worker account.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="mt-8 space-y-6"
        >

          {/* SUBJECT */}

          <div>

            <label className="font-semibold text-gray-700">
              Complaint Subject
            </label>

            <input
              type="text"
              name="subject"
              maxLength={60}
              value={
                formData.subject
              }
              onChange={
                handleChange
              }
              placeholder="Customer unavailable / Wrong address / Payment issue"
              className="w-full mt-3 border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-red-200 transition bg-white"
            />

            <div className="text-right text-sm text-gray-400 mt-2">

              {
                formData.subject
                  .length
              }
              /60

            </div>

          </div>

          {/* MESSAGE */}

          <div>

            <label className="font-semibold text-gray-700">
              Complaint Details
            </label>

            <textarea
              rows="6"
              name="message"
              maxLength={500}
              value={
                formData.message
              }
              onChange={
                handleChange
              }
              placeholder="Explain the issue with customer..."
              className="w-full mt-3 border border-gray-200 rounded-2xl px-5 py-4 resize-none outline-none focus:ring-4 focus:ring-red-200 transition bg-white"
            />

            <div className="text-right text-sm text-gray-400 mt-2">

              {
                formData.message
                  .length
              }
              /500

            </div>

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 hover:scale-[1.01] shadow-lg"
            }`}
          >

            {loading ? (
              "Submitting..."
            ) : (
              <>
                <Send size={20} />
                Submit Complaint
              </>
            )}

          </button>

        </form>
      </div>
    </div>
  );
}

export default WorkerComplaintPage;