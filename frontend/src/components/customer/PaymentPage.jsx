import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const worker = location.state?.worker;
  const date = location.state?.date;
  const service = location.state?.service;

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No payment details found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        <div className="mb-4 border-b pb-4">
          <p className="text-gray-600">Service:</p>
          <p className="font-semibold capitalize">{service}</p>

          <p className="text-gray-600 mt-2">Worker:</p>
          <p className="font-semibold">{worker?.fullName}</p>

          <p className="text-gray-600 mt-2">Date:</p>
          <p className="font-semibold">{date}</p>
        </div>

        <button
          onClick={() => {
            alert("Payment Successful");
            navigate("/customer/bookings");
          }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
