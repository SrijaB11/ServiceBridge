import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import styles from "./index.module.css";

const CustomerComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showJumpInput, setShowJumpInput] = useState(false);
    const [jumpPage, setJumpPage] = useState("");

    const itemsPerPage = 5; 

    useEffect(() => {
        const JwtToken = localStorage.getItem("token");
        const fetchComplaints = async () => {
            try {
                const response = await fetch("http://localhost:5000/complaint/admin", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${JwtToken}` }
                });
                if (!response.ok) throw new Error("Failed to fetch complaints");
                const data = await response.json();
                setComplaints(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    // Handle Resolve
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
                alert("Complaint resolved successfully!");
                window.location.reload();
            } else {
                alert("Failed to resolve complaint");
            }
        } catch (error) {
            console.error("Failed to resolve complaint", error);
        }
    };

    // Pagination Logic
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

    // Page numbers with ellipsis
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

    if (loading) return (
        <div className={styles["recent-complaints-container"]}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
                <Oval height={70} width={70} color="#166534" secondaryColor="#4ade80" strokeWidth={5} strokeWidthSecondary={5} />
            </div>
        </div>
    );

    if (error) return <div className={styles["recent-complaints-container"]}>Error: {error}</div>;

    return (
        <>
            <h1 style={{marginTop:"10px",marginBottom:"20px",marginLeft:"10px",fontSize:"28px",color:"#10b981"}}>Customer Complaints</h1>
            <div className={styles.container}></div>
            <div className={styles["recent-complaints-container"]}>
                <div className={styles["recent-complaints-header-container"]}>
                    <h1 className={styles["recent-complaints-title"]}>Customer Complaints</h1>
                    {totalPages > 1 && (
                        <div className={styles["page-info"]}>
                            Page <strong>{currentPage}</strong> of {totalPages}
                        </div>
                    )}
                </div>

                <hr className={styles["horizantal-line"]} />

                <ul className={styles["complaints-list"]}>
                    {currentComplaints.length > 0 ? (
                        currentComplaints.map((complaint) => (
                            <li key={complaint._id || complaint.id} className={styles["complaint-card"]}>
                                <div className={styles["complaint-main"]}>
                                    <div className={styles["complaint-info"]}>
                                        <div className={styles["customer-name"]}>
                                            {complaint.customer?.fullName || "Unknown Customer"}
                                        </div>
                                        <div className={styles["against"]}>
                                            Against: <strong>{complaint.worker?.fullName || "Unknown Worker"}</strong>
                                        </div>
                                    </div>
                                    <div className={styles["complaint-content"]}>
                                        <p className={styles["complaint-text"]}>
                                            {complaint.complaintText || "No complaint text available"}
                                        </p>
                                        <div className={styles["complaint-date"]}>
                                            {complaint.createdAt
                                                ? new Date(complaint.createdAt).toLocaleDateString('en-IN')
                                                : "N/A"}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles["complaint-actions"]}>
                                    {complaint.status?.toLowerCase() !== "resolved" ? (
                                        <>
                                            <button className={styles["status-pending"]}>Pending</button>
                                            <button
                                                className={styles["btn-resolve"]}
                                                onClick={() => handleResolve(complaint._id)}
                                            >
                                                Resolve
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className={styles["status-resolved"]}>Resolved</button>
                                            <button className={styles["btn-view"]}>View</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className={styles["no-complaints"]}>No complaints found</li>
                    )}
                </ul>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>

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
                                    className={currentPage === page ? styles.activePage : ""}
                                >
                                    {page}
                                </button>
                            )
                        ))}

                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>

                        {/* Jump to Page */}
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
            </div>
        </>
    );
};

export default CustomerComplaints;