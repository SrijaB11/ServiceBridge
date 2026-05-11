import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./index.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get fresh headers for every request
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

      // Updated to handle common backend data structures
      const response = await axios.get('http://localhost:5000/booking/worker', getAuthConfig());
      const data = response.data?.data || response.data?.bookings || response.data?.requests || response.data;

      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err.response?.data?.message || "Cannot connect to server. Is backend running?");
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
      const response = await axios.get(`http://localhost:5000/booking/${id}`, getAuthConfig());
      setSelectedRequest(response.data.data || response.data);
    } catch (err) {
      console.error("Error details:", err);
      alert(err.response?.data?.message || "Failed to load details");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    const statusValue = action === 'accept' ? 'accepted' : 'rejected';
    
    if (!window.confirm(`Do you want to ${action} this request?`)) return;

    try {
      // NOTE: Verify this endpoint matches your backend route exactly
      await axios.put(
        `http://localhost:5000/worker/requests/${requestId}/status`,
        { status: statusValue },
        getAuthConfig()
      );

      alert(`Request ${statusValue} successfully!`);

      // Update local state: Remove the item from the list
      setRequests(prev => prev.filter(req => req._id !== requestId));

      if (selectedRequest?._id === requestId) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error("Action Error:", err.response || err);
      const serverMsg = err.response?.data?.message;
      alert(serverMsg || `Failed to ${action} request. Check console for details.`);
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
          {requests.map((request) => (
            <li
              className="requests-details-container"
              key={request._id}
              onClick={() => fetchBookingDetails(request._id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="requests-profile">
                <img
                  src={request.customer?.profileImage || "/images/male-logo.png"}
                  alt="Customer"
                  className="requests-logo"
                />
                <div>
                  <h1 className="person-name">
                    {request.customer?.name || "New Customer"}
                  </h1>
                  <div className="requests-person-details">
                    <p className="person-work">
                      {request.service || "Service Requested"}
                    </p>
                  </div>
                  <div className="requests-person-details">
                    <p className="person-location">
                      {request.address || "Location not provided"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="requests-date">
                  {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "Today"}
                </h1>
                <div className="request-money-container">
                  <p className="requests-value">₹{request.amount || "N/A"}</p>
                </div>
              </div>

              <div className="requests-button-container">
                <button
                  type="button"
                  className="accept accept-button"
                  onClick={(e) => { e.stopPropagation(); handleAction(request._id, 'accept'); }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="reject reject-button"
                  onClick={(e) => { e.stopPropagation(); handleAction(request._id, 'reject'); }}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Booking Details</h2>
            {detailLoading ? (
              <p>Loading details...</p>
            ) : (
              <>
                <p><strong>Customer:</strong> {selectedRequest.customer?.name}</p>
                <p><strong>Service:</strong> {selectedRequest.service}</p>
                <p><strong>Location:</strong> {selectedRequest.address}</p>
                <p><strong>Amount:</strong> ₹{selectedRequest.amount}</p>
                
                <div className="modal-buttons">
                  <button
                    className="accept accept-button"
                    onClick={() => handleAction(selectedRequest._id, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    className="reject reject-button"
                    onClick={() => handleAction(selectedRequest._id, 'reject')}
                  >
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