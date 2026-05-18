import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./index.module.css";

const WorkerComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showJumpInput, setShowJumpInput] = useState(false);
    const [jumpPage, setJumpPage] = useState("");

    const itemsPerPage = 10;

    // Fetch Worker Complaints
    useEffect(() => {
        fetchWorkerComplaints();
    }, []);

    const fetchWorkerComplaints = async () => {
        setLoading(true);
        setError(null);
        
        const JwtToken = localStorage.getItem("token");
        console.log("Token exists:", !!JwtToken);
        
        if (!JwtToken) {
            setError("Authentication token not found. Please login again.");
            setLoading(false);
            return;
        }

        try {
            const endpoint = "http://localhost:5000/complaint/admin";
            console.log(`Fetching from endpoint: ${endpoint}`);
            
            const response = await fetch(endpoint, {
                method: "GET",
                headers: { 
                    Authorization: `Bearer ${JwtToken}`,
                    "Content-Type": "application/json"
                }
            });

            console.log(`Response status:`, response.status);

            if (response.ok) {
                const data = await response.json();
                console.log(`Data from API:`, data);
                
                // Handle different response structures
                let allComplaints = [];
                if (Array.isArray(data)) {
                    allComplaints = data;
                } else if (data.complaints) {
                    allComplaints = data.complaints;
                } else if (data.data) {
                    allComplaints = data.data;
                }
                
                // Filter only worker complaints
                // Adjust the filter condition based on your API response structure
                const workerComplaints = allComplaints.filter(complaint => {
                    // Check if complaint is against worker
                    // You may need to adjust this condition based on your data structure
                    return complaint.complaintType === "worker" || 
                           complaint.against === "worker" ||
                           complaint.type === "worker" ||
                           (complaint.worker && complaint.worker._id) ||
                           (complaint.workerId && complaint.workerId !== null);
                });
                
                console.log("Filtered worker complaints:", workerComplaints);
                setComplaints(workerComplaints);
                setLoading(false);
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.log(`Failed to fetch:`, errorData);
                setError(`API returned ${response.status}: ${response.statusText || "Failed to fetch complaints"}`);
                setLoading(false);
            }
        } catch (err) {
            console.log(`Error fetching complaints:`, err.message);
            setError(`Failed to fetch worker complaints. ${err.message || "Please check your network connection."}`);
            setLoading(false);
        }
    };

    // Handle Resolve Complaint
    const handleResolve = async (id) => {
        const JwtToken = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:5000/complaint/${id}/resolve`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JwtToken}`,
                },
            });

            if (response.ok) {
                alert("Worker complaint resolved successfully!");
                // Update local state instead of reloading
                setComplaints(complaints.map(complaint => 
                    complaint._id === id ? { ...complaint, status: "Resolved" } : complaint
                ));
            } else {
                const errorData = await response.json();
                alert(`Failed to resolve complaint: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Failed to resolve complaint", error);
            alert("Network error while resolving complaint");
        }
    };

    // Pagination functions
    const totalPages = Math.ceil(complaints.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComplaints = complaints.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            setShowJumpInput(false);
            setJumpPage("");
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    if (loading) {
        return (
            <div className={styles["worker-complaints-container"]}>
                <div className={styles["loading-container"]}>
                    <Oval 
                        height={70} 
                        width={70} 
                        color="#10b981" 
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#34d399"
                        strokeWidth={5}
                        strokeWidthSecondary={5}
                    />
                    <p>Loading worker complaints...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["worker-complaints-container"]}>
                <div className={styles["error-container"]}>
                    <p>⚠️ {error}</p>
                    <button onClick={fetchWorkerComplaints} className={styles["retry-btn"]}>
                        🔄 Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["worker-complaints-container"]}>
            <div className={styles["worker-complaints-header-container"]}>
                <h1 className={styles["worker-complaints-title"]}>
                    👷 Worker Complaints
                </h1>
                {totalPages > 1 && (
                    <div className={styles["page-info"]}>
                        Page <strong>{currentPage}</strong> of {totalPages}
                    </div>
                )}
            </div>

            <hr className={styles["horizantal-line"]} />

            {complaints.length === 0 ? (
                <div className={styles["no-complaints"]}>
                    <p>✨ No worker complaints found</p>
                    <button onClick={fetchWorkerComplaints} className={styles["refresh-btn"]}>
                        🔄 Refresh
                    </button>
                </div>
            ) : (
                <>
                    <ul className={styles["complaints-list"]}>
                        {currentComplaints.map((complaint) => (
                            <li key={complaint._id || complaint.id} className={styles["complaint-card"]}>
                                <div className={styles["complaint-main"]}>
                                    <div className={styles["complaint-info"]}>
                                        <div className={styles["worker-name"]}>
                                            <span className={styles["worker-icon"]}>👨‍🔧</span>
                                            {complaint.worker?.fullName || 
                                             complaint.worker?.name || 
                                             complaint.workerName || 
                                             "Unknown Worker"}
                                        </div>
                                        <div className={styles["against"]}>
                                            Against Customer: <strong>
                                                {complaint.customer?.fullName || 
                                                 complaint.customer?.name || 
                                                 complaint.customerName || 
                                                 "Unknown Customer"}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className={styles["complaint-content"]}>
                                        <p className={styles["complaint-text"]}>
                                            "{complaint.complaintText || 
                                              complaint.message || 
                                              complaint.description || 
                                              "No complaint text available"}"
                                        </p>
                                        <div className={styles["complaint-meta"]}>
                                            <span className={styles["complaint-date"]}>
                                                📅 {complaint.createdAt || complaint.date
                                                    ? new Date(complaint.createdAt || complaint.date).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })
                                                    : "N/A"}
                                            </span>
                                            {complaint.service && (
                                                <span className={styles["complaint-service"]}>
                                                    🔧 Service: {complaint.service}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["complaint-actions"]}>
                                    {complaint.status?.toLowerCase() !== "resolved" &&
                                     complaint.status?.toLowerCase() !== "completed" ? (
                                        <>
                                            <span className={styles["status-pending-badge"]}>
                                                ⏳ Pending
                                            </span>
                                            <button
                                                className={styles["btn-resolve"]}
                                                onClick={() => handleResolve(complaint._id || complaint.id)}
                                            >
                                                ✓ Resolve
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <span className={styles["status-resolved-badge"]}>
                                                ✅ Resolved
                                            </span>
                                            <button className={styles["btn-view"]}>
                                                👁️ View Details
                                            </button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={styles.pagination}>
                            <button 
                                onClick={() => goToPage(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className={styles["pagination-btn"]}
                            >
                                ← Previous
                            </button>

                            <div className={styles["page-numbers"]}>
                                {getPageNumbers().map((page, index) => (
                                    page === "..." ? (
                                        <button
                                            key={index}
                                            className={styles.ellipsis}
                                            onClick={() => setShowJumpInput(true)}
                                        >
                                            ...
                                        </button>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() => goToPage(page)}
                                            className={`${styles["page-btn"]} ${currentPage === page ? styles["active-page"] : ""}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            <button 
                                onClick={() => goToPage(currentPage + 1)} 
                                disabled={currentPage === totalPages}
                                className={styles["pagination-btn"]}
                            >
                                Next →
                            </button>

                            {showJumpInput && (
                                <div className={styles.jumpInputContainer}>
                                    <input
                                        type="number"
                                        value={jumpPage}
                                        onChange={(e) => setJumpPage(e.target.value)}
                                        placeholder="Page no."
                                        min="1"
                                        max={totalPages}
                                        onKeyDown={(e) => e.key === 'Enter' && handleJumpToPage()}
                                    />
                                    <button onClick={handleJumpToPage}>Go</button>
                                    <button onClick={() => setShowJumpInput(false)}>Cancel</button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WorkerComplaints;