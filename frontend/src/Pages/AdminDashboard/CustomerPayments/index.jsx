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
      }));
      setCustomerPaymentDetails(updatedPaymentDetails);
    }
  };

  useEffect(() => {
    getCustomerPaymentDetails();
  }, []);

  // Search filter logic
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
                      <td className="px-4 py-4 text-sm text-gray-800 font-medium">
                        ₹{p.workerPayment.toFixed(2)}
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