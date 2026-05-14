import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./index.module.css";

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

      const workerId = localStorage.getItem('workerId');

      if (!workerId) {
        setError("Worker ID not found. Please login again.");
        return;
      }

      const response = await axios.get('http://localhost:5000/admin/workers', {
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
    return <div className={styles["profile-loading"]}>Loading your profile...</div>;
  }

  if (error) {
    return (
      <div className={styles["profile-error"]}>
        <h3>Oops!</h3>
        <p>{error}</p>
        <button onClick={fetchMyProfile} className={styles["retry-btn"]}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-header"]}>
        <h1>My Profile</h1>
        <button onClick={fetchMyProfile} className={styles["refresh-btn"]}>
          Refresh
        </button>
      </div>

      <div className={styles["profile-card"]}>
        <div className={styles["profile-avatar"]} />

        <div className={styles["profile-info"]}>
          <h2 className={styles["worker-name"]}>{worker.fullName}</h2>
          <p className={styles["worker-role"]}>
            {worker.role?.toUpperCase()} - {worker.services}
          </p>
        </div>

        <div className={styles["status-badge"]}>
          Active Worker
        </div>

        <div className={styles["profile-details-grid"]}>
          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Email</span>
            <span className={styles["value"]}>{worker.email}</span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Phone</span>
            <span className={styles["value"]}>{worker.phone}</span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Location</span>
            <span className={styles["value"]}>{worker.location}</span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Address</span>
            <span className={styles["value"]}>
              {worker.address || "Not Provided"}
            </span>
          </div>

          <div className={styles["detail-row"]}>
            <span className={styles["label"]}>Service</span>
            <span className={styles["value"]}>{worker.services}</span>
          </div>
        </div>

        <div className={styles["documents-section"]}>
          <h3>Documents Status</h3>

          <div className={styles["documents-grid"]}>
            <div className={`${styles["doc-item"]} ${worker.documents?.profilePhoto ? styles["uploaded"] : ""}`}>
              Profile Photo
            </div>

            <div className={`${styles["doc-item"]} ${worker.documents?.panCard ? styles["uploaded"] : ""}`}>
              PAN Card
            </div>

            <div className={`${styles["doc-item"]} ${worker.documents?.skillDoc ? styles["uploaded"] : ""}`}>
              Skill Certificate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;