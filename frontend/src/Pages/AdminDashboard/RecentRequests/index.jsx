import { useState, useEffect, useCallback } from "react";

const RecentRequests = () => {
  const [requestsDetails, setRequestsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getRandomStatus = () => {
    const statuses = ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const fetchRecentRequests = useCallback(async () => {
    setLoading(true);
    setError(null);
    const jwtToken = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/booking/customerbookingstatusforadmin", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const formattedRequests = data.bookings.map((booking, index) => ({
          UniqueId: booking._id || index,
          User: booking.customer?.fullName || "Unknown Customer",
          Worker: booking.worker?.fullName || "Unknown Worker",
          Service: booking.worker?.services?.[0] || "Service",
          Status: getRandomStatus(),
          Date: formatDate(new Date()),
          Email: booking.customer?.email || "N/A",
          Phone: booking.customer?.phone || "N/A",
          BookingId: booking._id || `TEMP${String(index + 1).padStart(3, '0')}`
        }));

        setRequestsDetails(formattedRequests);
      } else {
        setError("Failed to fetch requests");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentRequests();
  }, [fetchRecentRequests]);

  const getStatusStyles = (status) => {
    const statusStyles = {
      Completed: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
      Accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
    };
    return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <img src="/images/ok.png" alt="Success" style={{height:"15px",width:"15px"}}/>
      case "Cancelled": return <img src="/images/failure.png" alt="Failure" style={{height:"15px",width:"15px"}}/>
      case "Accepted": return <img src="/images/accepted.png" alt="Accepted" style={{height:"15px",width:"15px"}}/>
      case "Pending": return <img src="/images/pending.png" alt="pending" style={{height:"15px",width:"15px"}}/>
      case "In Progress": return <img src="/images/in-progress.gif" alt="In Progress" style={{height:"15px",width:"15px"}}/>;
      default: return <img src="/images/warning.png" alt="Warning" style={{height:"15px",width:"15px"}}/>;
    }
  };

  const totalPages = Math.ceil(requestsDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = requestsDetails.slice(startIndex, startIndex + itemsPerPage);
  
  const startItem = requestsDetails.length > 0 ? startIndex + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, requestsDetails.length);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`✅ Booking ID ${text} copied to clipboard!`);
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-2xl">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#10b981]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="animate-pulse w-4 h-4 bg-[#10b981] rounded-full"></div>
          </div>
        </div>
        <p className="mt-6 text-[#064e3b] font-medium text-lg">Loading requests...</p>
        <p className="text-sm text-[#059669] mt-1">Please wait while we fetch the data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f0fdf4] to-[#fee2e2] rounded-2xl p-8">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p className="text-red-600 font-medium text-lg mb-4">{error}</p>
        <button 
          onClick={fetchRecentRequests} 
          className="px-6 py-2 bg-gradient-to-r from-[#10b981] to-[#059669] text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#064e3b] to-[#10b981] bg-clip-text text-transparent inline-block">
          Recent Requests
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full mt-2"></div>
      </div>

      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#d1fae5]">
        
        <div className="bg-gradient-to-r from-[#064e3b] to-[#059669] px-6 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-white text-2xl font-bold">Recent Requests</h1>
                <p className="text-white/80 text-sm mt-1">Track and manage all service requests</p>
              </div>
            </div>
            
            
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm">Jump to:</span>
                <div className="flex gap-1">
                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === page 
                          ? 'bg-white text-[#059669] shadow-md' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      disabled={page === '...'}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="border-[#d1fae5]" />

        {requestsDetails.length === 0 ? (
          <div className="py-16 text-center">
            <div className="bg-[#f0fdf4] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No requests found</p>
            <p className="text-gray-400 text-sm mt-1">No service requests available at the moment</p>
          </div>
        ) : (
          <>
           
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f0fdf4] border-b-2 border-[#d1fae5]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Worker
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#047857] uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d1fae5] bg-white">
                  {currentData.map((request, idx) => (
                    <tr 
                      key={request.UniqueId} 
                      className={`hover:bg-[#f0fdf4] transition-all duration-200 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-[#fafff7]'
                      }`}
                    >
                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-medium text-gray-700">
                            {request.BookingId.length > 12 ? `${request.BookingId.substring(0, 10)}...` : request.BookingId}
                          </span>
                          <button 
                            onClick={() => copyToClipboard(request.BookingId)} 
                            className="p-1 hover:bg-[#d1fae5] rounded-md transition-all duration-200"
                            title="Copy Booking ID"
                          >
                            <svg className="w-4 h-4 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                            </svg>
                          </button>
                        </div>
                      </td>

                      
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{request.User}</p>
                          <p className="text-xs text-gray-500">{request.Email}</p>
                        </div>
                      </td>

                      
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-800">{request.Worker}</p>
                          <p className="text-xs text-gray-500">{request.Phone}</p>
                        </div>
                      </td>

                      
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-[#f0fdf4] text-[#059669] border border-[#d1fae5]">
                          {request.Service}
                        </span>
                      </td>

                      
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusStyles(request.Status)}`}>
                          <span>{getStatusIcon(request.Status)}</span>
                          <span>{request.Status}</span>
                        </span>
                      </td>

                      
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span>{request.Date}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            {totalPages > 1 && (
              <div className="bg-[#f0fdf4] px-6 py-4 border-t border-[#d1fae5]">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  
                  <div className="text-sm text-[#047857]">
                    Showing {startItem} to {endItem} of {requestsDetails.length} requests
                  </div>

                  
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent hover:shadow-md'
                      }`}
                    >
                      ← Previous
                    </button>

                    
                    <div className="flex gap-1">
                      {getPageNumbers().map((page, idx) => (
                        page === "..." ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500 select-none">
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-[#10b981] to-[#059669] text-white shadow-md transform scale-105'
                                : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#f0fdf4] hover:shadow-md'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}
                    </div>

                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-[#059669] border border-[#d1fae5] hover:bg-[#10b981] hover:text-white hover:border-transparent hover:shadow-md'
                      }`}
                    >
                      Next →
                    </button>

                    
                    <div className="ml-2 px-3 py-1.5 bg-white rounded-lg border border-[#d1fae5] text-xs text-[#059669] font-medium">
                      {itemsPerPage} per page
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RecentRequests;