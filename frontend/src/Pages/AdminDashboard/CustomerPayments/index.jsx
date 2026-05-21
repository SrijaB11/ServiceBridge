import { useState, useEffect } from "react";
import styles from "./index.module.css";

const CustomerPayments = () => {
    const [customerPaymentDetails, setCustomerPaymentDetails] = useState([]);

    const getCustomerPaymentDetails = async () => {
        const jwtToken = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/admin/customer-payments", {
            method: "GET",
            headers: { Authorization: `Bearer ${jwtToken}` }
        });

        const fetchedData = await response.json();

        if (response.ok === true && response.status === 200) {
            const updatedPaymentDetails = fetchedData["data"].map((payment) => ({
                bookingId: payment.bookingId,
                customerName: payment["customer"].fullName,
                email: payment["customer"].email,
                amountPaid: payment.amountPaid,
                paymentDate: payment.paymentDate,
                paymentStatus: payment.paymentStatus,
                adminCommission: payment.adminCommission,
            }));
            setCustomerPaymentDetails(updatedPaymentDetails);
        }
    };

    useEffect(() => {
        getCustomerPaymentDetails();
    }, []);

    return (
        <>
            <h1 style={{ fontFamily: "Roboto", fontSize: "28px", fontWeight: "bold", color: "green", marginBottom: "20px" }}>
                Customer Payment Details
            </h1>
            <div className="table-container">
                <div className="wrap">
                    <div className="table-card">
                        <table>
                            <thead>
                                <tr>
                                    <th>BookingId</th>
                                    <th>Customer Name</th>
                                    <th>Email</th>
                                    <th>Amount Paid</th>
                                    <th>Payment Date</th>
                                    <th>Payment Status</th>
                                    <th>AdminCommission</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerPaymentDetails.map((payment) => (
                                    <tr key={payment.bookingId}>
                                        <th scope="row">{payment.bookingId}</th>
                                        <td>{payment.customerName}</td>
                                        <td className="email">{payment.email}</td>
                                        <td className="amount">₹{payment.amountPaid}</td>
                                        <td>{payment.paymentDate}</td>
                                        <td><span className="status">{payment.paymentStatus}</span></td>
                                        <td className="commission">{payment.adminCommission}</td>
                                        <td><button className="">Pay Now</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerPayments;