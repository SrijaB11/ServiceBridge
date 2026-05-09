import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";

const Profile = () => {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const workerId = localStorage.getItem('workerId'); 

      if (!workerId) {
        setError("Worker ID not found. Please login again.");
        return;
      }

      
      const response = await axios.get('http://localhost:5000/admin/workers', {
        data: {
          email: "harshap3112@gmail.com",
          password: "123456"
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const allWorkers = response.data?.data || [];
      const myProfile = allWorkers.find(w => w._id === workerId);

      if (myProfile) {
        setWorker(myProfile);
      } else {
        setError("Your profile could not be found.");
      }
    } catch (err) {
      console.error("Profile Error:", err);
      setError("Failed to load profile. Please check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  if (error) {
    return (
      <div className="profile-error">
        <h3>Oops!</h3>
        <p>{error}</p>
        <button onClick={fetchMyProfile} className="retry-btn">Try Again</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={fetchMyProfile} className="refresh-btn"><img src="" alt=""/></button>
      </div>

      <div className="profile-card">
        
        <img src="" alt="" className="profile-avatar"/>

        <div className="profile-info">
          <h2 className="worker-name">{worker.fullName}</h2>
          <p className="worker-role">{worker.role?.toUpperCase()}<img src="" alt=""/>{worker.services}</p>
        </div>

        <div className="status-badge active">
          Active Worker
        </div>

        <div className="profile-details-grid">
          <div className="detail-row">
            <span className="label">Email</span>
            <span className="value">{worker.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Phone</span>
            <span className="value">{worker.phone}</span>
          </div>
          <div className="detail-row">
            <span className="label">Location</span>
            <span className="value">{worker.location}</span>
          </div>
          <div className="detail-row">
            <span className="label">Address</span>
            <span className="value">{worker.address || "Not Provided"}</span>
          </div>
          <div className="detail-row">
            <span className="label">Service</span>
            <span className="value">{worker.services}</span>
          </div>
        </div>

        <div className="documents-section">
          <h3>Documents Status</h3>
          <div className="documents-grid">
            <div className={`doc-item ${worker.documents?.profilePhoto ? 'uploaded' : ''}`}>
              Profile Photo
            </div>
            <div className={`doc-item ${worker.documents?.panCard ? 'uploaded' : ''}`}>
              PAN Card
            </div>
            <div className={`doc-item ${worker.documents?.skillDoc ? 'uploaded' : ''}`}>
              Skill Certificate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;