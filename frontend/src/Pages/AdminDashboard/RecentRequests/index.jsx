import { useState, useEffect, useCallback } from "react";
import styles from "./index.module.css";

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

  
  const getStatusButtonStyle = (status) => {
    const statusStyles = {
      Completed: { backgroundColor: "#E8F5E9", color: "#2E7D32", border: "1px solid #C8E6C9" },
      Cancelled: { backgroundColor: "#FFEBEE", color: "#C62828", border: "1px solid #FFCDD2" },
      Accepted: { backgroundColor: "#E8F5E9", color: "#2E7D32", border: "1px solid #A5D6A7" },
      Pending: { backgroundColor: "#FFF8E1", color: "#F57C00", border: "1px solid #FFE082" },
      "In Progress": { backgroundColor: "#E3F2FD", color: "#1565C0", border: "1px solid #90CAF9" },
    };
    return statusStyles[status] || { backgroundColor: "#F5F5F5", color: "#616161", border: "1px solid #E0E0E0" };
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
    alert(`Booking ID ${text} copied to clipboard!`);
  };

  if (loading) {
    return (
      <div className={styles["recent-requests-container"]}>
        <div className={styles["loading-container"]}>
          <div className={styles["spinner"]}></div>
          <p>Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["recent-requests-container"]}>
        <div className={styles["error-container"]}>
          <p>{error}</p>
          <button onClick={fetchRecentRequests} className={styles["retry-btn"]}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ marginTop: "10px", marginBottom: "20px", marginLeft: "10px", fontSize: "28px", color: "#10b981" }}>
        Recent Requests
      </h1>
      <div className={styles["recent-requests-container"]}>
        <div className={styles["recent-requests-header-container"]}>
          <h1 className={styles["recent-requests-title"]}>Recent Requests</h1>
          <div className={styles["page-indicator"]}>
            <span className={styles["page-label"]}>Page</span>
            <div className={styles["header-page-numbers"]}>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  className={`${styles["header-page-btn"]} ${currentPage === page ? styles["header-active-page"] : ''}`}
                  disabled={page === '...'}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className={styles["horizantal-line"]} />

        {requestsDetails.length === 0 ? (
          <div className={styles["no-data"]}>
            <p>No requests found</p>
          </div>
        ) : (
          <>
            <div className={styles["table-wrapper"]}>
              <table className={styles["requests-table"]}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Worker</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((request) => (
                    <tr key={request.UniqueId}>
                      <td className={styles["booking-id"]}>
                        <div className={styles["booking-id-container"]}>
                          <span className={styles["booking-id-text"]}>
                            {request.BookingId.length > 12 ? `${request.BookingId.substring(0, 10)}...` : request.BookingId}
                          </span>
                          <button className={styles["copy-btn"]} onClick={() => copyToClipboard(request.BookingId)} title="Copy Booking ID">
                            📋
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className={styles["customer-info"]}>
                          <span className={styles["customer-name"]}>{request.User}</span>
                          <span className={styles["customer-email"]}>{request.Email}</span>
                        </div>
                      </td>
                      <td className={styles["worker-name"]}>
                        <div className={styles["worker-info"]}>
                          <span>{request.Worker}</span>
                          <span className={styles["worker-phone"]}>{request.Phone}</span>
                        </div>
                      </td>
                      <td>
                        <span className={styles["service-badge"]}>{request.Service}</span>
                      </td>
                      <td>
                        <button className={styles["status-btn"]} style={getStatusButtonStyle(request.Status)}>
                          {request.Status}
                        </button>
                      </td>
                      <td className={styles["date-cell"]}>{request.Date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className={styles["pagination-container"]}>
                <div className={styles["pagination-info"]}>
                  Showing {startItem} to {endItem} of {requestsDetails.length} requests
                </div>
                <div className={styles["pagination-controls"]}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={styles["pagination-btn"]}
                  >
                    ← Previous
                  </button>
                  <div className={styles["page-numbers"]}>
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        className={`${styles["page-btn"]} ${currentPage === page ? styles["active-page"] : ''}`}
                        disabled={page === '...'}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={styles["pagination-btn"]}
                  >
                    Next
                  </button>
                </div>
                <div className={styles["items-per-page"]}>
                  <span>Items per page: {itemsPerPage}</span>
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