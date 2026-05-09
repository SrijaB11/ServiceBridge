import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        setError("Please login again. No token found.");
        return;
      }

      console.log("Fetching requests with token:", token ? "Present" : "Missing");

      const response = await axios.get('http://localhost:5000/admin/workers', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log("API Response:", response.data); // For debugging

      // Handle different possible response structures
      const data = response.data.data || response.data.requests || response.data;
      setRequests(Array.isArray(data) ? data : []);

    } catch (err) {
      console.error("Full Error:", err);
      
      if (err.response) {
        console.error("Response Error Data:", err.response.data);
        setError(err.response.data?.message || `Server Error: ${err.response.status}`);
      } else if (err.request) {
        setError("Cannot connect to server. Is backend running?");
      } else {
        setError("Something went wrong while fetching requests");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    if (!window.confirm(`Do you want to ${action} this request?`)) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/worker/requests/${requestId}/status`, {
        status: action === 'accept' ? 'accepted' : 'rejected'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setRequests(prev => prev.filter(req => req._id !== requestId));
      alert(`Request ${action}ed successfully!`);
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
          {requests.map((request) => (
            <li className="requests-details-container" key={request._id}>
              <div className="requests-profile">
                <img 
                  src={request.customer?.profileImage || "/images/male-logo.png"} 
                  alt={request.customer?.name || "Customer"} 
                  className="requests-logo"
                />
                <div>
                  <h1 className="person-name">
                    {request.customer?.name || request.customerName || "New Customer"}
                  </h1>
                  <div className="requests-person-details">
                    <img src="/images/location.png" alt="service" className="location" />
                    <p className="person-work">{request.service || request.workTitle || "Service Request"}</p>
                  </div>
                  <div className="requests-person-details">
                    <img src="/images/location.png" alt="location" className="location" />
                    <p className="person-location">{request.address || request.location || "Location not provided"}</p>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="requests-date">
                  {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "Today"}
                </h1>
                <div className="request-money-container">
                  <img src="/assets/Images/rupee.png" alt="rupee" className="rupee-logo" />
                  <p className="requests-value">₹{request.amount || request.cost || "N/A"}</p>
                </div>
              </div>

              <div className="requests-button-container">
                <button
                  type="button"
                  className="accept accept-button"
                  onClick={() => handleAction(request._id, 'accept')}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="reject reject-button"
                  onClick={() => handleAction(request._id, 'reject')}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Requests;