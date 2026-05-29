import { useState, useEffect } from "react";

const CustomerPayments = () => {
  const [customerPaymentDetails, setCustomerPaymentDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCustomerPaymentDetails = async () => {
    const jwtToken = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/admin/customer-payments", {
      method: "GET",
      headers: { Authorization: `Bearer ${jwtToken}` }
    });

    const fetchedData = await response.json();

    if (response.ok && response.status === 200) {
      const updatedPaymentDetails = fetchedData["data"].map((payment) => ({
        bookingId: payment.bookingId,
        customerName: payment.customer?.fullName || "Unknown",
        email: payment.customer?.email || "N/A",
        amountPaid: payment.amountPaid,
        paymentDate: payment.paymentDate,
        paymentStatus: payment.paymentStatus,
        adminCommission: payment.adminCommission,
        workerPayment: payment.amountPaid - payment.adminCommission,
        workerPaid: payment.workerPaid || false,
      }));
      setCustomerPaymentDetails(updatedPaymentDetails);
      console.log(fetchedData.data);
    }
  };

  useEffect(() => {
    getCustomerPaymentDetails();
  }, []);

<<<<<<< HEAD
  
=======


  const loadRazorpay = () => {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      resolve(true);
      return;
    }

    const script =
      document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () =>
      resolve(true);

    script.onerror = () =>
      resolve(false);

    document.body.appendChild(
      script
    );
  });
};

const payWorker = async (payment) => {
  try {
    const jwtToken =
      localStorage.getItem("token");

    // Create Razorpay Order
    const response = await fetch(
      "http://localhost:5000/admin/create-worker-payment-order",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          amount:
            payment.workerPayment,
          bookingId:
            payment.bookingId,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount:
        data.order.amount,

      currency: "INR",

      name: "Service Bridge",

      description:
        "Worker Payment",

      order_id:
        data.order.id,

      handler: async function (
        response
      ) {
        const verifyResponse =
          await fetch(
            "http://localhost:5000/admin/verify-worker-payment",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${jwtToken}`,
              },

              body: JSON.stringify({
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,

                bookingId:
                  payment.bookingId,
              }),
            }
          );

        const verifyData =
          await verifyResponse.json();

        if (
          verifyResponse.ok
        ) {
          alert(
            "Worker Payment Successful"
          );

          getCustomerPaymentDetails();
        } else {
          alert(
            verifyData.message
          );
        }
      },

      theme: {
        color: "#22c55e",
      },
    };


    const razorpayLoaded =
  await loadRazorpay();

if (!razorpayLoaded) {
  alert(
    "Razorpay SDK failed to load"
  );
  return;
}

console.log(
  "Razorpay:",
  window.Razorpay
);

    const razor =
      new window.Razorpay(
        options
      );

    razor.open();
  } catch (error) {
    console.log(error);

    alert("Payment Failed");
  }
};


  // Search filter logic
>>>>>>> 73b1a7b5806afc614579c3c720c12df0fafe42f8
  const lowerSearch = searchTerm.toLowerCase();
  const filteredPayments = customerPaymentDetails.filter((p) =>
    [
      p.bookingId?.toString(),
      p.customerName,
      p.amountPaid?.toString(),
      p.workerPayment?.toString()
    ].some((field) => field?.toLowerCase().includes(lowerSearch))
  );

  if (filteredPayments.length === 0 && searchTerm) {
    return (
      <div className="min-h-screen bg-white px-4 py-6 font-Poppins">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Customer Payment Details
          </h1>
          <div className="w-full sm:w-96">
            <input
              type="text"
              placeholder="Search by booking ID, customer name, amount paid or worker payment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center text-gray-500">
          No matching payments found.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 font-Poppins">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Customer Payment Details
        </h1>
        <div className="w-full sm:w-96">
          <input
            type="text"
            placeholder="Search by booking ID, customer name, amount paid or worker payment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Amount Paid
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Admin Commission
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Worker Payment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => {
                  const isSuccessful =
                    p.paymentStatus?.toLowerCase().includes("success") ||
                    p.paymentStatus?.toLowerCase() === "completed";

                  return (
                    <tr
                      key={p.bookingId}
                      className="hover:bg-green-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                        {p.bookingId}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {p.customerName}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {p.email}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-800">
                        ₹{p.amountPaid.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {p.paymentDate}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                            isSuccessful
                              ? "bg-green-100 text-green-800 border border-green-300"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {p.paymentStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        ₹{p.adminCommission.toFixed(2)}
                      </td>
                            <td className="px-4 py-4">
                          <div className="flex flex-col gap-2">

                            <p className="text-sm font-semibold text-gray-800">
                              ₹{p.workerPayment.toFixed(2)}
                            </p>

                            <span
                              className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${
                                p.workerPaid
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                                              }`}
                    >
                      {p.workerPaid ? "Paid" : "Pending"}
                    </span>

                    <button
                      disabled={p.workerPaid}
                      onClick={() => payWorker(p)}
                      className={`text-white text-sm px-3 py-1 rounded-lg transition w-fit ${
                        p.workerPaid
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                  {p.workerPaid ? "Paid" : "Pay Now"}
                </button>

              </div>
            </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayments;