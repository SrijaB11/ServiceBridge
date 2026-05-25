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

const Worker = ({ onTotalWorkersChange }) => {
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
                const workerList = response.data.data || [];
                setWorkers(workerList);

                
                if (onTotalWorkersChange) {
                    onTotalWorkersChange(workerList.length);
                }
            } else {
                setWorkers([]);
                if (onTotalWorkersChange) onTotalWorkersChange(0);
            }
        } catch (err) {
            console.error(err);
            setError("Unable to connect to the server. Please try again.");
            if (onTotalWorkersChange) onTotalWorkersChange(0);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (worker) => {
        setCurrentWorker(worker);
        setFormData({
            fullName: worker.fullName || "",
            location: worker.location || "",
            services: worker.services || ""
        });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            const response = await axios.put(
                `http://localhost:5000/admin/workers/${currentWorker._id}`,
                formData
            );

            setWorkers((prev) =>
                prev.map((w) =>
                    w._id === currentWorker._id ? response.data.worker : w
                )
            );
            setIsEditModalOpen(false);
            alert("✅ Worker updated successfully!");
        } catch (err) {
            alert("❌ Update failed. Please check your connection.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async (workerId, fullName) => {
        if (!window.confirm(`⚠️ Are you sure you want to delete ${fullName}?`)) {
            return;
        }

        try {
            setDeletingId(workerId);
            await axios.delete(`http://localhost:5000/admin/workers/${workerId}`);

            setWorkers((prev) => prev.filter((w) => w._id !== workerId));
            
            
            if (onTotalWorkersChange) {
                onTotalWorkersChange(workers.length - 1);
            }
            alert("🗑️ Worker deleted successfully!");
        } catch (err) {
            alert("❌ Delete failed.");
        } finally {
            setDeletingId(null);
        }
    };

    const filteredWorkers = workers.filter((worker) => {
        const term = searchTerm.toLowerCase().trim();
        if (!term) return true;

        const name = String(worker.fullName || "").toLowerCase();
        const email = String(worker.email || "").toLowerCase();
        const role = String(worker.role || "").toLowerCase();
        const service = String(worker.services || "").toLowerCase();

        return (
            name.includes(term) ||
            email.includes(term) ||
            role.includes(term) ||
            service.includes(term)
        );
    });

    if (loading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-2xl">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#10b981]"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="animate-pulse w-4 h-4 bg-[#10b981] rounded-full"></div>
                    </div>
                </div>
                <p className="mt-6 text-[#064e3b] font-medium text-lg">Syncing Professionals...</p>
                <p className="text-sm text-[#059669] mt-1">Please wait while we load the data</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#fee2e2] rounded-2xl p-8">
                <div className="bg-red-100 p-4 rounded-full mb-4">
                    <AlertCircle size={48} className="text-red-500" />
                </div>
                <p className="text-red-600 font-medium text-lg mb-2">{error}</p>
                <button 
                    onClick={fetchWorkers} 
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                    <RefreshCw size={18} />
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <>
            
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#064e3b] to-[#10b981] bg-clip-text text-transparent inline-block">
                    Worker Professional Details
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full mt-2"></div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d1fae5]">
                
                <div className="bg-gradient-to-r from-[#064e3b] to-[#059669] px-6 py-5">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Briefcase size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-white text-2xl font-bold">Worker Directory</h1>
                                <p className="text-white/80 text-sm mt-1">Manage and monitor all professionals</p>
                            </div>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium ml-2">
                                {workers.length} Total Workers
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80">
                                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or role..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-300"
                                />
                            </div>
                            <button
                                onClick={fetchWorkers}
                                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-200 hover:rotate-180"
                                title="Refresh"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                
                <div className="p-6">
                    {filteredWorkers.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="bg-[#f0fdf4] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={40} className="text-[#10b981]" />
                            </div>
                            <h2 className="text-2xl font-semibold text-[#064e3b] mb-2">No matching workers found</h2>
                            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters.</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredWorkers.map((worker) => (
                                <div 
                                    key={worker._id} 
                                    className="group bg-gradient-to-br from-white to-[#fafff7] rounded-2xl border border-[#d1fae5] overflow-hidden hover:shadow-xl hover:border-[#10b981] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="p-6">
                                        
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                                    {worker.fullName?.charAt(0).toUpperCase() || <UserCheck size={24} />}
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-[#064e3b] group-hover:text-[#10b981] transition-colors">
                                                    {worker.fullName}
                                                </h3>
                                                <p className="text-sm text-[#059669] font-medium mt-1">
                                                    {worker.role || 'Professional'}
                                                </p>
                                            </div>
                                        </div>

                                        
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-2 text-gray-600 group-hover:bg-[#f0fdf4] p-2 rounded-lg transition-colors">
                                                <Mail size={16} className="text-[#10b981]" />
                                                <span className="text-sm truncate flex-1">{worker.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 group-hover:bg-[#f0fdf4] p-2 rounded-lg transition-colors">
                                                <MapPin size={16} className="text-[#10b981]" />
                                                <span className="text-sm">{worker.location || 'Not Specified'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 group-hover:bg-[#f0fdf4] p-2 rounded-lg transition-colors">
                                                <Briefcase size={16} className="text-[#10b981]" />
                                                <span className="text-sm truncate flex-1">{worker.services || 'General Service'}</span>
                                            </div>
                                        </div>

                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-[#d1fae5]">
                                            <button
                                                className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-medium hover:bg-[#059669] transform hover:scale-105 transition-all duration-200"
                                                onClick={() => openEditModal(worker)}
                                            >
                                                <Edit2 size={14} />
                                                Edit Profile
                                            </button>
                                            <button
                                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => handleDelete(worker._id, worker.fullName)}
                                                disabled={deletingId === worker._id}
                                            >
                                                {deletingId === worker._id ? (
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                                                ) : (
                                                    <Trash2 size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-slideDown">
                        <div className="bg-gradient-to-r from-[#064e3b] to-[#059669] px-6 py-4 rounded-t-2xl flex justify-between items-center">
                            <h2 className="text-white text-xl font-bold">Update Information</h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#064e3b] mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#064e3b] mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#064e3b] mb-2">
                                            Services
                                        </label>
                                        <input
                                            type="text"
                                            name="services"
                                            value={formData.services}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="flex-1 px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {updating ? "Updating..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slideDown {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default Worker;