import { Component } from "react";
import styles from "./index.module.css";

class RecentRequests extends Component {
    state = {
        RecentRequestsDetails: [],
        loading: true,
        error: null,
        currentPage: 1,
        itemsPerPage: 10
    };

    componentDidMount() {
        this.fetchRecentRequests();
    }

    fetchRecentRequests = async () => {
        this.setState({ loading: true, error: null });
        const JwtToken = localStorage.getItem("token");
        
        try {
            const response = await fetch("http://localhost:5000/booking/customerbookingstatusforadmin", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${JwtToken}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            
            if (response.ok === true && data.success === true) {
                const formattedRequests = data.bookings.map((booking, index) => ({
                    UniqueId: booking._id || index,
                    User: booking.customer?.fullName || "Unknown Customer",
                    Worker: booking.worker?.fullName || "Unknown Worker",
                    Service: booking.worker?.services?.[0] || "Service",
                    Status: this.getRandomStatus(),
                    Date: this.formatDate(new Date()),
                    Email: booking.customer?.email || "N/A",
                    Phone: booking.customer?.phone || "N/A",
                    BookingId: booking._id || `TEMP${String(index + 1).padStart(3, '0')}`
                }));
                
                this.setState({ RecentRequestsDetails: formattedRequests, loading: false });
            } else {
                this.setState({ error: "Failed to fetch requests", loading: false });
            }
        } catch (error) {
            console.error("Error fetching recent requests:", error);
            this.setState({ error: "Network error occurred", loading: false });
        }
    };

    getRandomStatus = () => {
        const statuses = ["Pending", "Accepted", "In Progress", "Completed", "Cancelled"];
        return statuses[Math.floor(Math.random() * statuses.length)];
    };

    formatDate = (date) => {
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    getStatusButtonStyle = (status) => {
        switch(status) {
            case "Completed":
                return { backgroundColor: "#E8F5E9", color: "#2E7D32", border: "1px solid #C8E6C9" };
            case "Cancelled":
                return { backgroundColor: "#FFEBEE", color: "#C62828", border: "1px solid #FFCDD2" };
            case "Accepted":
                return { backgroundColor: "#E8F5E9", color: "#2E7D32", border: "1px solid #A5D6A7" };
            case "Pending":
                return { backgroundColor: "#FFF8E1", color: "#F57C00", border: "1px solid #FFE082" };
            case "In Progress":
                return { backgroundColor: "#E3F2FD", color: "#1565C0", border: "1px solid #90CAF9" };
            default:
                return { backgroundColor: "#F5F5F5", color: "#616161", border: "1px solid #E0E0E0" };
        }
    };

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    handlePreviousPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    };

    handleNextPage = () => {
        const { currentPage, RecentRequestsDetails, itemsPerPage } = this.state;
        const totalPages = Math.ceil(RecentRequestsDetails.length / itemsPerPage);
        if (currentPage < totalPages) {
            this.setState({ currentPage: currentPage + 1 });
        }
    };

    getCurrentPageData = () => {
        const { RecentRequestsDetails, currentPage, itemsPerPage } = this.state;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return RecentRequestsDetails.slice(startIndex, endIndex);
    };

    getTotalPages = () => {
        const { RecentRequestsDetails, itemsPerPage } = this.state;
        return Math.ceil(RecentRequestsDetails.length / itemsPerPage);
    };

    getPageNumbers = () => {
        const totalPages = this.getTotalPages();
        const { currentPage } = this.state;
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert(`Booking ID ${text} copied to clipboard!`);
    };

    render() {
        const { loading, error, currentPage, itemsPerPage, RecentRequestsDetails } = this.state;
        const currentData = this.getCurrentPageData();
        const totalPages = this.getTotalPages();
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, RecentRequestsDetails.length);

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
                        <button onClick={this.fetchRecentRequests} className={styles["retry-btn"]}>
                            Retry
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <>
                <h1 style={{marginTop:"10px",marginBottom:"20px",marginLeft:"10px",fontSize:"28px",color:"#10b981"}}>Recent Requests</h1>
                <div className={styles["recent-requests-container"]}>
                    <div className={styles["recent-requests-header-container"]}>
                        <h1 className={styles["recent-requests-title"]}>
                            Recent Requests
                        </h1>
                        <div className={styles["page-indicator"]}>
                            <span className={styles["page-label"]}>Page</span>
                            <div className={styles["header-page-numbers"]}>
                                {this.getPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof page === 'number' && this.handlePageChange(page)}
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

                    {RecentRequestsDetails.length === 0 ? (
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
                                                            {request.BookingId.length > 12 
                                                                ? `${request.BookingId.substring(0, 10)}...` 
                                                                : request.BookingId}
                                                        </span>
                                                        <button 
                                                            className={styles["copy-btn"]}
                                                            onClick={() => this.copyToClipboard(request.BookingId)}
                                                            title="Copy Booking ID"
                                                        >
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
                                                    <span className={styles["service-badge"]}>
                                                        {request.Service}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className={styles["status-btn"]}
                                                        style={this.getStatusButtonStyle(request.Status)}
                                                    >
                                                        {request.Status}
                                                    </button>
                                                </td>
                                                <td className={styles["date-cell"]}>{request.Date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bottom Pagination Section */}
                            {totalPages > 1 && (
                                <div className={styles["pagination-container"]}>
                                    <div className={styles["pagination-info"]}>
                                        Showing {startItem} to {endItem} of {RecentRequestsDetails.length} requests
                                    </div>
                                    
                                    <div className={styles["pagination-controls"]}>
                                        <button
                                            onClick={this.handlePreviousPage}
                                            disabled={currentPage === 1}
                                            className={styles["pagination-btn"]}
                                        >
                                            ← Previous
                                        </button>
                                        
                                        <div className={styles["page-numbers"]}>
                                            {this.getPageNumbers().map((page, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => typeof page === 'number' && this.handlePageChange(page)}
                                                    className={`${styles["page-btn"]} ${currentPage === page ? styles["active-page"] : ''}`}
                                                    disabled={page === '...'}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                        
                                        <button
                                            onClick={this.handleNextPage}
                                            disabled={currentPage === totalPages}
                                            className={styles["pagination-btn"]}
                                        >
                                            Next →
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
    }
}

export default RecentRequests;