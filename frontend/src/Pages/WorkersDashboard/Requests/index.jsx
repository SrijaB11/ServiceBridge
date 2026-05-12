import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./index.css";

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

            // Try both endpoints if needed
            const response = await axios.get('http://localhost:5000/booking/worker', getAuthConfig())

            const Fdata = response.json()
            console.log(Fdata)

            const data = response.data?.data || 
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

    // ================== FETCH DETAILS ==================
    const fetchBookingDetails = async (id) => {
        try {
            setDetailLoading(true);
            const response = await axios.get(`http://localhost:5000/booking/${id}`, getAuthConfig());
            setSelectedRequest(response.data.data || response.data);
        } catch (err) {
            console.error("Error fetching details:", err);
            alert("Failed to load details");
        } finally {
            setDetailLoading(false);
        }
    };

    // ================== ACCEPT / REJECT ==================
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

    if (loading) return <div className="requests-loading">Loading Incoming Requests...</div>;

    return (
        <div className="requests-container">
            <div className="requests-header-container">
                <h1 className="requests-title">Incoming Requests</h1>
                <button onClick={fetchRequests} className="requests-details">Refresh</button>
            </div>
            <hr className="horizantal-line" />

            {error ? (
                <div className="requests-error">
                    <p>{error}</p>
                    <button onClick={fetchRequests} className="retry-btn">Try Again</button>
                </div>
            ) : requests.length === 0 ? (
                <p className="no-requests">No new requests at the moment.</p>
            ) : (
                <ul className="requests-list">
                    {requests.map((req) => {
                        const customer = req.customer || req;
                        const workerBooking = req; // for date, status etc.

                        return (
                            <li
                                className="requests-details-container"
                                key={req._id}
                                onClick={() => fetchBookingDetails(req._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="requests-profile">
                                    <img
                                        src={customer.documents?.profilePhoto || customer.profileImage || "/images/male-logo.png"}
                                        alt="Customer"
                                        className="requests-logo"
                                    />
                                    <div>
                                        <h1 className="person-name">
                                            {customer.fullName || customer.name || "New Customer"}
                                        </h1>
                                        <div className="requests-person-details">
                                            <p className="person-work">
                                                {req.service || "Service Requested"}
                                            </p>
                                        </div>
                                        <div className="requests-person-details">
                                            <p className="person-location">
                                                {req.address || customer.location || "Location not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="requests-date">
                                        {workerBooking.date ? new Date(workerBooking.date).toLocaleDateString() : 
                                         workerBooking.createdAt ? new Date(workerBooking.createdAt).toLocaleDateString() : "Today"}
                                    </h1>
                                    <div className="request-money-container">
                                        <p className="requests-value">₹{req.amount || "N/A"}</p>
                                    </div>
                                </div>

                                <div className="requests-button-container">
                                    <button
                                        className="accept accept-button"
                                        onClick={(e) => { e.stopPropagation(); handleAction(req._id, 'accept'); }}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="reject reject-button"
                                        onClick={(e) => { e.stopPropagation(); handleAction(req._id, 'reject'); }}
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* Modal */}
            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>Booking Details</h2>
                        {detailLoading ? <p>Loading...</p> : (
                            <>
                                <p><strong>Customer:</strong> {selectedRequest.customer?.fullName || selectedRequest.fullName}</p>
                                <p><strong>Date:</strong> {new Date(selectedRequest.date).toLocaleDateString()}</p>
                                <p><strong>Status:</strong> {selectedRequest.status}</p>

                                <div className="modal-buttons">
                                    <button className="accept accept-button" onClick={() => handleAction(selectedRequest._id, 'accept')}>
                                        Accept
                                    </button>
                                    <button className="reject reject-button" onClick={() => handleAction(selectedRequest._id, 'reject')}>
                                        Reject
                                    </button>
                                    <button onClick={() => setSelectedRequest(null)}>Close</button>
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