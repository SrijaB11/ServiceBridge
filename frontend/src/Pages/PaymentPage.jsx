// import axios from "axios";

// import { useLocation, useNavigate } from "react-router-dom";

// function PaymentPage() {
//   const navigate = useNavigate();

//   const location = useLocation();
//   console.log("LOCATION STATE:", location.state);
//   const { worker, date, service, amount, requestId } = location.state || {};

//   const totalAmount = amount || 499;

//   const handlePayment = async () => {
//     try {
//       /* CREATE ORDER */

//       const { data } = await axios.post(
//         "http://localhost:5000/payment/create-order",
//         {
//           amount: totalAmount,
//         },
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,

//         amount: data.order.amount,

//         currency: "INR",

//         name: "ServiceBridge",

//         description: "Service Payment",

//         order_id: data.order.id,

//         handler: async function (response) {
//           try {
//             const verifyData = {
//               ...response,

//               totalAmount,

//               bookingId: requestId,
//             };

//             const verifyResponse = await axios.post(
//               "http://localhost:5000/payment/verify-payment",
//               verifyData,
//             );

//             if (verifyResponse.data.success) {
//               alert("Payment Successful");

//               navigate("/customer/review", {
//                 state: {
//                   bookingId: requestId,
//                   workerName: worker?.fullName,
//                   serviceName: service,
//                 },
//               });
//             }
//           } catch (error) {
//             console.log(error);

//             alert("Payment verification failed");
//           }
//         },

//         prefill: {
//           name: "Customer",
//           email: "customer@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#22c55e",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.open();
//     } catch (error) {
//       console.log(error);

//       alert("Payment Failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

//         {/* BOOKING DETAILS */}

//         <div className="mb-4 border-b pb-4">
//           <p className="text-gray-600">Service:</p>

//           <p className="font-semibold capitalize">{service}</p>

//           <p className="text-gray-600 mt-2">Worker:</p>

//           <p className="font-semibold">{worker?.fullName}</p>

//           <p className="text-gray-600 mt-2">Date:</p>

//           <p className="font-semibold">{new Date(date).toLocaleDateString()}</p>
//         </div>

//         {/* AMOUNT */}

//         <div className="mb-5">
//           <p className="text-gray-600">Total Amount</p>

//           <p className="text-3xl font-bold text-green-600">₹{totalAmount}</p>
//         </div>

//         <button
//           onClick={handlePayment}
//           className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { worker, date, service, amount, requestId } = location.state || {};

  console.log("PaymentPage State:", location.state);
  console.log("Request ID:", requestId);

  // Safety check
  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-500 mb-3">
            Booking information not found
          </h2>

          <button
            onClick={() => navigate("/customer/bookings")}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const totalAmount = amount || 499;

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/payment/create-order",
        {
          amount: totalAmount,
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: "INR",

        name: "ServiceBridge",

        description: "Service Payment",

        order_id: data.order.id,

        handler: async function (response) {
          try {
            const verifyData = {
              ...response,
              totalAmount,
              bookingId: requestId,
            };

            const verifyResponse = await axios.post(
              "http://localhost:5000/payment/verify-payment",
              verifyData,
            );

            if (verifyResponse.data.success) {
              alert("Payment Successful");

              console.log("Passing to Review:", {
                bookingId: requestId,
                workerName: worker?.fullName,
                serviceName: service,
              });

              navigate("/customer/review", {
                state: {
                  bookingId: requestId,
                  workerName: worker?.fullName,
                  serviceName: service,
                },
              });
            }
          } catch (error) {
            console.log(error);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "Customer",
          email: "customer@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#22c55e",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

        {/* BOOKING DETAILS */}
        <div className="mb-4 border-b pb-4">
          <p className="text-gray-600">Service:</p>

          <p className="font-semibold capitalize">{service}</p>

          <p className="text-gray-600 mt-2">Worker:</p>

          <p className="font-semibold">{worker?.fullName}</p>

          <p className="text-gray-600 mt-2">Date:</p>

          <p className="font-semibold">{new Date(date).toLocaleDateString()}</p>
        </div>

        {/* AMOUNT */}
        <div className="mb-5">
          <p className="text-gray-600">Total Amount</p>

          <p className="text-3xl font-bold text-green-600">₹{totalAmount}</p>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
