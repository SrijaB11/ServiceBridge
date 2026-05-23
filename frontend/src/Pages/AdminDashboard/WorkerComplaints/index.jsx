import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const WorkerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showJumpInput, setShowJumpInput] = useState(false);
  const [jumpPage, setJumpPage] = useState("");
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [submittingId, setSubmittingId] = useState(null);

  const itemsPerPage = 5;
  const CACHE_KEY = "admin_complaints_cache";

   
  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      setComplaints(JSON.parse(cachedData));
      setLoading(false);
    }
  }, []);

  const fetchComplaints = async () => {
    const JwtToken = localStorage.getItem("token");
    if (!JwtToken) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/worker/complaint/complaints/admin", {
        method: "GET",
        headers: { Authorization: `Bearer ${JwtToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch complaints");
      const data = await response.json();
      
      setComplaints(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleResolveClick = (complaint) => {
    setEditingComplaintId(complaint._id);
    setAdminResponse(complaint.adminResponse || "");
  };

  const handleSubmitResolve = async (complaintId) => {
    if (!adminResponse.trim()) {
      alert("⚠️ Please write a response before marking as resolved.");
      return;
    }

    const JwtToken = localStorage.getItem("token");
    setSubmittingId(complaintId);

    try {
      const response = await fetch(`http://localhost:5000/complaint/admin/${complaintId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JwtToken}`,
        },
        body: JSON.stringify({ adminResponse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resolve complaint");
      }

      
      const updatedComplaints = complaints.map((item) =>
        item._id === complaintId
          ? {
              ...item,
              status: "resolved",
              adminResponse: adminResponse,
              resolvedAt: data.complaint?.resolvedAt || new Date().toISOString(),
            }
          : item
      );

      setComplaints(updatedComplaints);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedComplaints));

      setEditingComplaintId(null);
      setAdminResponse("");
      alert("✅ Complaint resolved successfully!");
    } catch (err) {
      alert(`❌ ${err.message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  const cancelResolve = () => {
    setEditingComplaintId(null);
    setAdminResponse("");
  };

  
  const totalPages = Math.ceil(complaints.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setShowJumpInput(false);
      setJumpPage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      goToPage(pageNum);
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      if (currentPage <= 3) end = 4;
      if (currentPage >= totalPages - 2) start = totalPages - 3;
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-2xl">
        <Oval height={70} width={70} color="#166534" secondaryColor="#4ade80" strokeWidth={5} strokeWidthSecondary={5} />
        <p className="mt-6 text-[#064e3b] font-medium text-lg">Loading complaints...</p>
      </div>
    );
  }

  if (error && complaints.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#fee2e2] rounded-2xl p-8">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-red-600 font-medium text-lg mb-2">Error: {error}</p>
          <button 
            onClick={fetchComplaints}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#064e3b] to-[#10b981] bg-clip-text text-transparent inline-block">
          Customer Complaints
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full mt-2"></div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d1fae5]">
        
        <div className="bg-gradient-to-r from-[#064e3b] to-[#059669] px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Customer Complaints</h1>
                <p className="text-white/80 text-sm mt-1">Manage and resolve customer issues</p>
              </div>
            </div>
            {totalPages > 1 && (
              <div className="bg-white/20 px-4 py-2 rounded-full text-white text-sm font-medium">
                Page <strong>{currentPage}</strong> of {totalPages}
              </div>
            )}
          </div>
        </div>

        <hr className="border-[#d1fae5]" />

        
        <div className="divide-y divide-[#d1fae5]">
          {currentComplaints.length > 0 ? (
            currentComplaints.map((complaint) => {
              const isEditing = editingComplaintId === complaint._id;
              const isResolved = complaint.status?.toLowerCase() === "resolved";

              return (
                <div key={complaint._id} className="p-6 hover:bg-[#fafff7] transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-6">
                    
                    <div className="flex-1">
                      
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {complaint.customer?.fullName?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#064e3b]">
                            {complaint.customer?.fullName || "Unknown Customer"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Against: <strong className="text-[#059669]">{complaint.worker?.fullName || "Unknown Worker"}</strong>
                          </p>
                        </div>
                      </div>

                      
                      <div className="bg-[#f0fdf4] rounded-xl p-4 mb-4 border-l-4 border-[#10b981]">
                        <p className="text-gray-700 leading-relaxed">
                          {complaint.complaintText || "No complaint text available"}
                        </p>
                      </div>

                      
                      {isEditing ? (
                        <div className="bg-white border-2 border-[#10b981] rounded-xl p-4 shadow-lg">
                          <label className="block text-sm font-semibold text-[#064e3b] mb-2">
                            Resolution Statement
                          </label>
                          <textarea
                            className="w-full px-4 py-3 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all resize-none"
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            placeholder="Write your resolution statement here..."
                            rows={4}
                          />
                          <div className="flex gap-3 mt-4">
                            <button
                              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200"
                              onClick={cancelResolve}
                              disabled={submittingId === complaint._id}
                            >
                              Cancel
                            </button>
                            <button
                              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
                              onClick={() => handleSubmitResolve(complaint._id)}
                              disabled={submittingId === complaint._id}
                            >
                              {submittingId === complaint._id ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  Processing...
                                </div>
                              ) : (
                                "Mark as Resolved"
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        complaint.adminResponse && (
                          <div className="bg-green-50 rounded-xl p-4 border border-[#d1fae5]">
                            <div className="flex items-start gap-2">
                              <svg className="w-5 h-5 text-[#10b981] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              <div className="flex-1">
                                <p className="font-semibold text-[#064e3b] mb-1">Admin Response:</p>
                                <p className="text-gray-700">{complaint.adminResponse}</p>
                              </div>
                            </div>
                          </div>
                        )
                      )}

                      
                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>
                          {complaint.createdAt
                            ? new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    
                    <div className="lg:w-48">
                      {!isEditing && !isResolved && (
                        <div className="space-y-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                            Pending
                          </span>
                          <button
                            className="w-full px-4 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                            onClick={() => handleResolveClick(complaint)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Resolve
                          </button>
                        </div>
                      )}
                      {isResolved && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 w-full justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="bg-[#f0fdf4] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No customer complaints found.</p>
              <p className="text-gray-400 text-sm mt-1">All complaints have been resolved</p>
            </div>
          )}
        </div>

        
        {totalPages > 1 && (
          <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#d1fae5] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-[#047857]">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, complaints.length)} of {complaints.length} complaints
            </div>
            
            <div className="flex gap-2 items-center">
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
              
              
              <div className="flex gap-1">
                {getPageNumbers().map((page, idx) => (
                  page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md'
                          : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#f0fdf4]'
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}
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

              
              <div className="ml-4 relative">
                {showJumpInput ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={jumpPage}
                      onChange={(e) => setJumpPage(e.target.value)}
                      placeholder={`1-${totalPages}`}
                      className="w-20 px-2 py-2 text-sm border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981]"
                      min="1"
                      max={totalPages}
                      onKeyPress={(e) => e.key === 'Enter' && handleJumpToPage()}
                    />
                    <button
                      onClick={handleJumpToPage}
                      className="px-3 py-2 bg-[#10b981] text-white rounded-lg text-sm hover:bg-[#059669] transition-colors"
                    >
                      Go
                    </button>
                    <button
                      onClick={() => setShowJumpInput(false)}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowJumpInput(true)}
                    className="px-4 py-2 bg-white text-[#059669] border border-[#d1fae5] rounded-lg text-sm font-medium hover:bg-[#f0fdf4] transition-all duration-200"
                  >
                    Jump to
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WorkerComplaints;