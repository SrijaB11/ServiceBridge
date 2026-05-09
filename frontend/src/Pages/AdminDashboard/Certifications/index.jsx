import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const WorkerVerification = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/admin/workers', {
        data: { email: "harshap3112@gmail.com", password: "123456" },
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setWorkers(response.data.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load workers");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (workerId, action, fullName) => {
    if (!window.confirm(`Are you sure you want to ${action} this worker?`)) return;

    try {
      setActionLoading({ id: workerId, action });

      await axios.put(`http://localhost:5000/admin/workers/${workerId}/verify`, {
        status: action === 'approve' ? 'approved' : 'rejected'
      });

      setWorkers(prev =>
        prev.map(worker =>
          worker._id === workerId
            ? { ...worker, verificationStatus: action === 'approve' ? 'approved' : 'rejected' }
            : worker
        )
      );

      alert(`Worker ${action}d successfully!`);
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} worker`);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.services?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasDocuments = (worker) => {
    const docs = worker.documents || {};
    return docs.skillDoc || docs.panCard || docs.profilePhoto;
  };

  if (loading) return <div className="verification-loading">Loading verification requests...</div>;
  if (error) return <div className="verification-error">{error}</div>;

  return (
    <div className="verification-container">
      <div className="verification-header">
        <h1>Document Verification</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchWorkers} className="refresh-btn">Refresh</button>
        </div>
      </div>

      <div className="verification-grid">
        {filteredWorkers.length === 0 ? (
          <p className="no-data">No workers pending for verification</p>
        ) : (
          filteredWorkers.map((worker) => (
            <div key={worker._id} className="verification-card">
              <div className="worker-header-info">
                <div className="avatar"><img src="" alt=""/></div>
                <div>
                  <h3>{worker.fullName}</h3>
                  <p>{worker.services} <img src="" alt=""/> {worker.location}</p>
                </div>
              </div>

              {/* Documents */}
              <div className="documents-section">
                <h4>Uploaded Documents</h4>
                <div className="document-list">
                  {worker.documents?.skillDoc && (
                    <div className="document-item">
                      <strong>Skill Certificate:</strong>
                      <a href={worker.documents.skillDoc} target="_blank" rel="noopener noreferrer" className="view-link">
                        View Document <img src="" alt=""/>
                      </a>
                    </div>
                  )}
                  {worker.documents?.panCard && (
                    <div className="document-item">
                      <strong>PAN Card:</strong>
                      <a href={worker.documents.panCard} target="_blank" rel="noopener noreferrer" className="view-link">
                        View Document <img src="" alt=""/>
                      </a>
                    </div>
                  )}
                  {worker.documents?.profilePhoto && (
                    <div className="document-item">
                      <strong>Profile Photo:</strong>
                      <a href={worker.documents.profilePhoto} target="_blank" rel="noopener noreferrer" className="view-link">
                        View Photo <img src="" alt=""/>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              
              <div className="verification-actions">
                <button
                  className="approve-btn"
                  onClick={() => handleVerify(worker._id, 'approve', worker.fullName)}
                  disabled={actionLoading?.id === worker._id}
                >
                <img src="" alt=""/> Approve Worker
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleVerify(worker._id, 'reject', worker.fullName)}
                  disabled={actionLoading?.id === worker._id}
                >
                <img src="" alt=""/>Reject Worker
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerVerification;