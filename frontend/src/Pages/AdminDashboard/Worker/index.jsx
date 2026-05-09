import React, {useState,useEffect } from 'react';
import axios from 'axios';
import './index.css';

const Worker = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);

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


  const openEditModal = (worker) => {
    setCurrentWorker(worker);
    setFormData({
      fullName: worker.fullName || "",
      phone: worker.phone || "",
      location: worker.location || "",
      address: worker.address || "",
      services: worker.services || "",
    });
    setIsEditModalOpen(true);
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentWorker) return;

    try {
      setUpdating(true);
      const response = await axios.put(
        `http://localhost:5000/admin/workers/${currentWorker._id}`,
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      
      setWorkers(prev =>
        prev.map(worker =>
          worker._id === currentWorker._id ? response.data.worker : worker
        )
      );

      alert("Worker updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update worker");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (workerId, fullName) => {
    if (!window.confirm(`Delete worker "${fullName}"?`)) return;

    try {
      setDeletingId(workerId);
      await axios.delete(`http://localhost:5000/admin/workers/${workerId}`, {
        data: { fullName },
        headers: { 'Content-Type': 'application/json' }
      });

      setWorkers(prev => prev.filter(w => w._id !== workerId));
      alert("Worker deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete worker");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.services?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="worker-loading">Loading Workers...</div>;
  if (error) return <div className="worker-error">{error}</div>;

  return (
    <div className="worker-container">
      <div className="worker-header">
        <h1 className="worker-title">Workers Management</h1>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Search workers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={fetchWorkers} className="refresh-btn"><img src="" alt=""/> Refresh</button>
        </div>
      </div>

      <div className="workers-grid">
        {filteredWorkers.length === 0 ? (
          <div className="no-results">No workers found</div>
        ) : (
          filteredWorkers.map((worker) => (
            <div key={worker._id} className="worker-card">
              <img src="" alt="worker avatar" className="worker-avatar"/>

              <div className="worker-info">
                <h3 className="worker-name">{worker.fullName}</h3>
                <p className="worker-role">{worker.role}<img src="" alt=""/>{worker.services}</p>
              </div>

              <div className="worker-details">
                <div className="detail-row"><span className="label">Email</span><span className="value">{worker.email}</span></div>
                <div className="detail-row"><span className="label">Phone</span><span className="value">{worker.phone}</span></div>
                <div className="detail-row"><span className="label">Location</span><span className="value">{worker.location}</span></div>
                <div className="detail-row"><span className="label">Address</span><span className="value">{worker.address}</span></div>
              </div>

              <div className="worker-actions">
                <button className="edit-btn" onClick={() => openEditModal(worker)}>
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(worker._id, worker.fullName)}
                  disabled={deletingId === worker._id}
                >
                  {deletingId === worker._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isEditModalOpen && currentWorker && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Worker</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Services</label>
                <input type="text" name="services" value={formData.services} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows="2" />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={updating}>
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Worker;