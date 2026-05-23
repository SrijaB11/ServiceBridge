import React, { useState, useEffect } from "react";

const Users = () => {
    
    const [userDetailsList, setUserDetailsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    
    useEffect(() => {
        getCustomersData();
    }, []);

    const getCustomersData = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5000/admin/customers", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                const list = (data.data || data).map(user => ({
                    id: user.id || user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    location: user.location
                }));
                setUserDetailsList(list);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (user) => {
        setEditingId(user.id);
        setEditForm({ ...user });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const saveEdit = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/admin/customers/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (res.ok) {
                setEditingId(null);
                setEditForm({});
                getCustomersData();
                alert("✅ Updated successfully!");
            } else {
                alert("❌ Failed to update");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error updating customer");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("⚠️ Delete this customer?")) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/admin/customers/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                setUserDetailsList(prev => prev.filter(u => String(u.id) !== String(id)));
                alert("🗑️ Customer deleted successfully!");
            }
        } catch (err) {
            console.error(err);
            alert("❌ Error deleting customer");
        }
    };

    
    const filteredUsers = userDetailsList.filter(user =>
        (user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const currentUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] p-6 font-['Roboto',sans-serif]">
            
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#064e3b] to-[#10b981] bg-clip-text text-transparent inline-block">
                    Customer Details
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full mt-2"></div>
            </div>

            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d1fae5]">
                
                <div className="bg-gradient-to-r from-[#064e3b] to-[#059669] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">👥</span>
                        <h3 className="text-white text-xl font-semibold">Customer Directory</h3>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                            {filteredUsers.length} Total
                        </span>
                    </div>
                    
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="🔍 Search by name or email..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full md:w-80 px-4 py-2 pl-10 rounded-full border-2 border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all duration-300"
                        />
                        <svg className="absolute left-3 top-2.5 w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10b981]"></div>
                        <p className="mt-4 text-[#064e3b] font-medium">Loading customers...</p>
                    </div>
                ) : (
                    <>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#f0fdf4] border-b-2 border-[#d1fae5]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                                            Customer Name
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                                            Mobile No
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user, index) => (
                                            <tr 
                                                key={user.id} 
                                                className={`border-b border-[#d1fae5] hover:bg-[#f0fdf4] transition-all duration-200 ${
                                                    index % 2 === 0 ? 'bg-white' : 'bg-[#fafff7]'
                                                }`}
                                            >
                                                {/* Customer Name */}
                                                <td className="px-6 py-4">
                                                    {editingId === user.id ? (
                                                        <input
                                                            name="fullName"
                                                            value={editForm.fullName}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                                {user.fullName?.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-gray-700 font-medium">{user.fullName}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                
                                                
                                                <td className="px-6 py-4">
                                                    {editingId === user.id ? (
                                                        <input
                                                            name="email"
                                                            value={editForm.email}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                                        />
                                                    ) : (
                                                        <a href={`mailto:${user.email}`} className="text-[#059669] hover:text-[#064e3b] hover:underline transition-colors">
                                                            {user.email}
                                                        </a>
                                                    )}
                                                </td>
                                                
                                                
                                                <td className="px-6 py-4">
                                                    {editingId === user.id ? (
                                                        <input
                                                            name="phone"
                                                            value={editForm.phone}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                                        />
                                                    ) : (
                                                        <a href={`tel:${user.phone}`} className="text-gray-600 hover:text-[#059669] transition-colors">
                                                            {user.phone}
                                                        </a>
                                                    )}
                                                </td>
                                                
                                                
                                                <td className="px-6 py-4">
                                                    {editingId === user.id ? (
                                                        <input
                                                            name="location"
                                                            value={editForm.location}
                                                            onChange={handleEditChange}
                                                            className="w-full px-3 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center gap-1">
                                                            <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                            </svg>
                                                            <span className="text-gray-600">{user.location || "Not specified"}</span>
                                                        </div>
                                                    )}
                                                </td>
                                                
                                                
                                                <td className="px-6 py-4">
                                                    {editingId === user.id ? (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={saveEdit}
                                                                className="px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                                            >
                                                                💾 Save
                                                            </button>
                                                            <button
                                                                onClick={cancelEditing}
                                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transform hover:scale-105 transition-all duration-200"
                                                            >
                                                                ✖ Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => startEditing(user)}
                                                                className="px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-medium hover:bg-[#059669] transform hover:scale-105 transition-all duration-200 flex items-center gap-1"
                                                            >
                                                                ✏️ Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(user.id)}
                                                                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transform hover:scale-105 transition-all duration-200 flex items-center gap-1"
                                                            >
                                                                🗑️ Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <svg className="w-16 h-16 text-[#d1fae5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                    </svg>
                                                    <p className="text-gray-500 text-lg">No customers found</p>
                                                    <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        
                        {filteredUsers.length > 0 && (
                            <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#d1fae5] flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-[#047857]">
                                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} customers
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            currentPage === 1
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent'
                                        }`}
                                    >
                                        ← Previous
                                    </button>
                                    
                                    {/* Page Numbers */}
                                    <div className="flex gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            let pageNum;
                                            if (totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (currentPage <= 3) {
                                                pageNum = i + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNum = totalPages - 4 + i;
                                            } else {
                                                pageNum = currentPage - 2 + i;
                                            }
                                            
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                        currentPage === pageNum
                                                            ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md'
                                                            : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#f0fdf4]'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            currentPage === totalPages
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent'
                                        }`}
                                    >
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Users;