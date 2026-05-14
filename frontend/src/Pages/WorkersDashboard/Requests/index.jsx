import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from "./index.module.css";

const Requests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuthConfig = useCallback(() => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    }, []);

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please login again. No token found.");
                return;
            }

            const response = await axios.get(
                'http://localhost:5000/booking/worker',
                getAuthConfig()
            );

            const data =
                response.data?.data ||
                response.data?.bookings ||
                response.data?.requests ||
                response.data;

            setRequests(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching requests:", err);
            setError(err.response?.data?.message || "Failed to load requests");
        } finally {
            setLoading(false);
        }
    }, [getAuthConfig]);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const fetchBookingDetails = async (id) => {
        try {
            setDetailLoading(true);
            const response = await axios.get(
                `http://localhost:5000/booking/${id}`,
                getAuthConfig()
            );
            setSelectedRequest(response.data.data || response.data);
        } catch (err) {
            console.error("Error fetching details:", err);
            alert("Failed to load details");
        } finally {
            setDetailLoading(false);
        }
    };

    const handleAction = async (requestId, action) => {
        const statusValue = action === 'accept' ? 'accepted' : 'rejected';

        if (!window.confirm(`Do you want to ${action} this request?`)) return;

        try {
            await axios.put(
                `http://localhost:5000/worker/requests/${requestId}/status`,
                { status: statusValue },
                getAuthConfig()
            );

            alert(`Request ${statusValue} successfully!`);
            setRequests(prev => prev.filter(req => req._id !== requestId));
            if (selectedRequest?._id === requestId) setSelectedRequest(null);
        } catch (err) {
            alert(err.response?.data?.message || `Failed to ${action} request`);
        }
    };

    if (loading) {
        return <div className={styles["requests-loading"]}>Loading Incoming Requests...</div>;
    }

    return (
        <div className={styles["requests-container"]}>
            <div className={styles["requests-header-container"]}>
                <h1 className={styles["requests-title"]}>Incoming Requests</h1>
                <button
                    onClick={fetchRequests}
                    className={styles["requests-details"]}
                >
                    Refresh
                </button>
            </div>

            <hr className={styles["horizantal-line"]} />

            {error ? (
                <div className={styles["requests-error"]}>
                    <p>{error}</p>
                    <button onClick={fetchRequests} className={styles["retry-btn"]}>
                        Try Again
                    </button>
                </div>
            ) : requests.length === 0 ? (
                <p className={styles["no-requests"]}>No new requests at the moment.</p>
            ) : (
                <ul className={styles["requests-list"]}>
                    {requests.map((req) => {
                        const customer = req.customer || req;
                        const workerBooking = req;

                        return (
                            <li
                                key={req._id}
                                className={styles["requests-details-container"]}
                                onClick={() => fetchBookingDetails(req._id)}
                            >
                                <div className={styles["requests-profile"]}>
                                    <img
                                        src={
                                            customer.documents?.profilePhoto ||
                                            customer.profileImage ||
                                            "/images/male-logo.png"
                                        }
                                        alt="Customer"
                                        className={styles["requests-logo"]}
                                    />

                                    <div>
                                        <h1 className={styles["person-name"]}>
                                            {customer.fullName || customer.name || "New Customer"}
                                        </h1>

                                        <div className={styles["requests-person-details"]}>
                                            <p className={styles["person-work"]}>
                                                {req.service || "Service Requested"}
                                            </p>
                                        </div>

                                        <div className={styles["requests-person-details"]}>
                                            <p className={styles["person-location"]}>
                                                {req.address || customer.location || "Location not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className={styles["requests-date"]}>
                                        {workerBooking.date
                                            ? new Date(workerBooking.date).toLocaleDateString()
                                            : workerBooking.createdAt
                                            ? new Date(workerBooking.createdAt).toLocaleDateString()
                                            : "Today"}
                                    </h1>

                                    <div className={styles["request-money-container"]}>
                                        <p className={styles["requests-value"]}>
                                            ₹{req.amount || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles["requests-button-container"]}>
                                    <button
                                        className={`${styles["accept"]} ${styles["accept-button"]}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAction(req._id, 'accept');
                                        }}
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className={`${styles["reject"]} ${styles["reject-button"]}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAction(req._id, 'reject');
                                        }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {selectedRequest && (
                <div
                    className={styles["modal-overlay"]}
                    onClick={() => setSelectedRequest(null)}
                >
                    <div
                        className={styles["modal-content"]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Booking Details</h2>

                        {detailLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <p>
                                    <strong>Customer:</strong>{" "}
                                    {selectedRequest.customer?.fullName ||
                                        selectedRequest.fullName}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {new Date(selectedRequest.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selectedRequest.status}
                                </p>

                                <div className={styles["modal-buttons"]}>
                                    <button
                                        className={`${styles["accept"]} ${styles["accept-button"]}`}
                                        onClick={() =>
                                            handleAction(selectedRequest._id, 'accept')
                                        }
                                    >
                                        Accept
                                    </button>

                                    <button
                                        className={`${styles["reject"]} ${styles["reject-button"]}`}
                                        onClick={() =>
                                            handleAction(selectedRequest._id, 'reject')
                                        }
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => setSelectedRequest(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Requests;