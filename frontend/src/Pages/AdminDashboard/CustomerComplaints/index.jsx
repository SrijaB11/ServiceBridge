import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const CustomerComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showJumpInput, setShowJumpInput] = useState(false);
  const [jumpPage, setJumpPage] = useState("");
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [submittingId, setSubmittingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;
  const CACHE_KEY = "admin_complaints_cache";

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      setComplaints(parsed);
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
      const response = await fetch("http://localhost:5000/complaint/admin", {
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

  const lowerSearch = searchTerm.toLowerCase();
  const filteredComplaints = complaints.filter((c) => {
    const customer = c.customer?.fullName || "";
    const worker = c.worker?.fullName || "";
    const complaintText = c.complaintText || "";
    const adminResp = c.adminResponse || "";
    return (
      customer.toLowerCase().includes(lowerSearch) ||
      worker.toLowerCase().includes(lowerSearch) ||
      complaintText.toLowerCase().includes(lowerSearch) ||
      adminResp.toLowerCase().includes(lowerSearch)
    );
  });

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = filteredComplaints.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setShowJumpInput(false);
      setJumpPage("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleJumpToPage = () => {
    const pageNum = parseInt(jumpPage, 10);
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
      
      if (currentPage <= 3) {
        end = 4;
      }
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }
      
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  const handleResolveClick = (complaint) => {
    setEditingComplaintId(complaint._id);
    setAdminResponse(complaint.adminResponse || "");
  };

  const handleSubmitResolve = async (complaintId) => {
    if (!adminResponse.trim()) {
      alert("Please write a response before marking as resolved.");
      return;
    }

    const JwtToken = localStorage.getItem("token");
    setSubmittingId(complaintId);

    try {
      const response = await fetch(
        `http://localhost:5000/complaint/admin/${complaintId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JwtToken}`,
          },
          body: JSON.stringify({ adminResponse }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to resolve complaint");
      }

      const updatedComplaints = complaints.map((item) =>
        item._id === complaintId
          ? {
              ...item,
              status: "resolved",
              adminResponse,
              resolvedAt: data.complaint?.resolvedAt || new Date().toISOString(),
            }
          : item
      );

      setComplaints(updatedComplaints);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedComplaints));

      setEditingComplaintId(null);
      setAdminResponse("");
      alert("Complaint resolved successfully!");
    } catch (err) {
      alert(`${err.message}`);
    } finally {
      setSubmittingId(null);
    }
  };

  const cancelResolve = () => {
    setEditingComplaintId(null);
    setAdminResponse("");
  };

  if (loading && complaints.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7]">
        <Oval
          height={70}
          width={70}
          color="#166534"
          secondaryColor="#4ade80"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
        <p className="mt-6 text-[#064e3b] font-medium text-lg">Loading complaints...</p>
      </div>
    );
  }

  if (error && complaints.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#fee2e2]">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
          <button
            onClick={fetchComplaints}
            className="px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-white p-6">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#064e3b] to-[#10b981] bg-clip-text text-transparent inline-block">
          Customer Complaints
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full mt-2"></div>
      </div>

      
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by customer, worker, complaint or response..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border-2 border-[#d1fae5] rounded-xl focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all text-gray-700"
          />
        </div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d1fae5]">
        {filteredComplaints.length === 0 ? (
          <div className="py-16 text-center">
            <div className="bg-[#f0fdf4] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No complaints found matching your search.</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#064e3b] to-[#059669]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Worker
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Complaint
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Complaint Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Admin Response
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d1fae5] bg-white">
                  {currentComplaints.map((complaint, idx) => {
                    const isEditing = editingComplaintId === complaint._id;
                    const isResolved = complaint.status?.toLowerCase() === "resolved";

                    return (
                      <tr
                        key={complaint._id}
                        className={`hover:bg-[#f0fdf4] transition-all duration-200 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#fafff7]'
                        }`}
                      >
                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              {complaint.customer?.fullName?.charAt(0) || "U"}
                            </div>
                            <span className="text-sm font-medium text-gray-800">
                              {complaint.customer?.fullName || "Unknown Customer"}
                            </span>
                          </div>
                        </td>

                        
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {complaint.worker?.fullName || "Unknown Worker"}
                          </span>
                        </td>

                        
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {complaint.complaintText || "No complaint text"}
                            </p>
                          </div>
                        </td>

                        
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span>
                              {complaint.createdAt
                                ? new Date(complaint.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                  })
                                : "N/A"}
                            </span>
                          </div>
                        </td>

                        
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <div className="space-y-2">
                              <textarea
                                className="w-full px-3 py-2 border-2 border-[#d1fae5] rounded-lg focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all text-sm resize-none"
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                                placeholder="Write resolution details..."
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={cancelResolve}
                                  disabled={submittingId === complaint._id}
                                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSubmitResolve(complaint._id)}
                                  disabled={submittingId === complaint._id}
                                  className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg hover:shadow-md transition-all disabled:opacity-50"
                                >
                                  {submittingId === complaint._id ? (
                                    <div className="flex items-center gap-1">
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                      Processing...
                                    </div>
                                  ) : (
                                    "Resolve"
                                  )}
                                </button>
                              </div>
                            </div>
                          ) : complaint.adminResponse ? (
                            <div className="bg-green-50 p-2 rounded-lg border-l-4 border-[#10b981]">
                              <p className="text-sm text-gray-700">{complaint.adminResponse}</p>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic text-sm">No response yet</span>
                          )}
                        </td>

                        
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isResolved
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              isResolved ? "bg-green-500" : "bg-yellow-500"
                            }`}></span>
                            {isResolved ? "Resolved" : "Pending"}
                          </span>
                        </td>

                        
                        <td className="px-6 py-4">
                          {!isEditing && !isResolved && (
                            <button
                              onClick={() => handleResolveClick(complaint)}
                              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#10b981] to-[#059669] rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              Resolve
                            </button>
                          )}
                          {isResolved && (
                            <span className="inline-flex items-center gap-1 text-sm text-green-700 font-medium">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            
            {totalPages > 1 && (
              <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#d1fae5]">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  
                  <div className="text-sm text-[#047857]">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredComplaints.length)} of {filteredComplaints.length} complaints
                  </div>

                  
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    
                    <button
                      onClick={() => goToPage(1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#059669] hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path>
                      </svg>
                    </button>

                    
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent hover:shadow-md'
                      }`}
                    >
                      Previous
                    </button>

                    
                    <div className="flex gap-1">
                      {getPageNumbers().map((page, idx) =>
                        page === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500 select-none">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md transform scale-105'
                                : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#f0fdf4] hover:shadow-md'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent hover:shadow-md'
                      }`}
                    >
                      Next
                    </button>

                    
                    <button
                      onClick={() => goToPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-[#059669] hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                      </svg>
                    </button>

                    
                    <div className="ml-2 relative">
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
                            className="px-3 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
                          >
                            Go
                          </button>
                          <button
                            onClick={() => setShowJumpInput(false)}
                            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowJumpInput(true)}
                          className="px-4 py-2 bg-white text-[#059669] border border-[#d1fae5] rounded-lg text-sm font-medium hover:bg-[#f0fdf4] hover:shadow-md transition-all duration-200"
                        >
                          Jump to Page
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerComplaints;