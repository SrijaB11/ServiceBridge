import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, 
  RefreshCw, 
  Edit2, 
  Trash2, 
  MapPin, 
  Mail, 
  Briefcase, 
  X, 
  AlertCircle,
  UserCheck
} from 'lucide-react';
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
      setError(null);
      const response = await axios.get('http://localhost:5000/admin/workers');
      if (response.data.success) {
        setWorkers(response.data.data || []);
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (worker) => {
    setCurrentWorker(worker);
    setFormData({
      fullName: worker.fullName || "",
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
    try {
      setUpdating(true);
      const response = await axios.put(
        `http://localhost:5000/admin/workers/${currentWorker._id}`,
        formData
      );
      setWorkers(prev => prev.map(w => w._id === currentWorker._id ? response.data.worker : w));
      setIsEditModalOpen(false);
      alert("Worker updated successfully!");
    } catch (err) {
      alert("Update failed. Please check your connection.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (workerId, fullName) => {
    if (!window.confirm(`Are you sure you want to delete ${fullName}?`)) return;
    try {
      setDeletingId(workerId);
      await axios.delete(`http://localhost:5000/admin/workers/${workerId}`);
      setWorkers(prev => prev.filter(w => w._id !== workerId));
    } catch (err) {
      alert("Delete failed.");
    } finally {
      setDeletingId(null);
    }
  };

  // ROBUST FILTER LOGIC (Prevents White Screen)
  const filteredWorkers = workers.filter(worker => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;

    // We only search string fields to prevent numeric errors
    const name = String(worker.fullName || "").toLowerCase();
    const email = String(worker.email || "").toLowerCase();
    const role = String(worker.role || "").toLowerCase();
    const service = String(worker.services || "").toLowerCase();

    return name.includes(term) || email.includes(term) || role.includes(term) || service.includes(term);
  });

  if (loading) return (
    <div className="status-container">
      <div className="loader"></div>
      <p>Syncing Professionals...</p>
    </div>
  );

  if (error) return (
    <div className="status-container">
      <AlertCircle size={48} color="#ef4444" />
      <p className="error-text">{error}</p>
      <button onClick={fetchWorkers} className="retry-btn">Retry Connection</button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="brand">
          <h1>Professional Directory</h1>
          <span className="stats-badge">{workers.length} Total Workers</span>
        </div>
        
        <div className="header-actions">
          <div className="search-pill">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={fetchWorkers} className="icon-action-btn" title="Refresh">
            <RefreshCw size={18} />
          </button>
        </div>
      </header>

      <main className="grid-layout">
        {filteredWorkers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon-box">
              <Search size={40} />
            </div>
            <h2>No matching workers found</h2>
            <p>Try adjusting your search terms or filters.</p>
            <button onClick={() => setSearchTerm("")} className="clear-btn">Clear Search</button>
          </div>
        ) : (
          filteredWorkers.map((worker) => (
            <div key={worker._id} className="worker-card">
              <div className="card-inner">
                <div className="card-header">
                  <div className="avatar-wrapper">
                    {worker.fullName?.charAt(0) || <UserCheck size={20}/>}
                  </div>
                  <div className="title-box">
                    <h3>{worker.fullName}</h3>
                    <p className="role-label">{worker.role || 'Professional'}</p>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-row"><Mail size={14}/> <span>{worker.email}</span></div>
                  <div className="info-row"><MapPin size={14}/> <span>{worker.location || 'Not Specified'}</span></div>
                  <div className="info-row"><Briefcase size={14}/> <span>{worker.services || 'General Service'}</span></div>
                </div>

                <div className="card-footer">
                  <button className="edit-link" onClick={() => openEditModal(worker)}>
                    <Edit2 size={14} /> Edit Profile
                  </button>
                  <button 
                    className="delete-link" 
                    onClick={() => handleDelete(worker._id, worker.fullName)}
                    disabled={deletingId === worker._id}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Update Information</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="close-x"><X/></button>
            </div>
            <form onSubmit={handleUpdate} className="modal-form">
              <div className="form-field">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                </div>
                <div className="form-field">
                  <label>Services</label>
                  <input type="text" name="services" value={formData.services} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-field">
                <label>Detailed Address</label>
                <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" />
              </div>
              <button type="submit" className="save-button" disabled={updating}>
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Worker;