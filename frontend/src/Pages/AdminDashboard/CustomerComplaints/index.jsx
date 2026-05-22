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
  const [editingComplaintId, setEditingComplaintId] = useState(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [submittingId, setSubmittingId] = useState(null);

  const itemsPerPage = 5;
  const CACHE_KEY = "admin_complaints_cache";

  // Load from cache
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

  const handleResolveClick = (complaint) => {
    setEditingComplaintId(complaint._id);
    setAdminResponse(complaint.adminResponse || "");
  };

  const handleSubmitResolve = async (complaintId) => {
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
              status: data.complaint?.status || "resolved",
              adminResponse: data.complaint?.adminResponse || adminResponse,
              resolvedAt: data.complaint?.resolvedAt || item.resolvedAt,
            }
          : item
      );

      setComplaints(updatedComplaints);
      localStorage.setItem(CACHE_KEY, JSON.stringify(updatedComplaints));
      setEditingComplaintId(null);
      setAdminResponse("");
      alert("Complaint resolved successfully");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingId(null);
    }
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
      <div className={styles["recent-complaints-container"]}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <Oval height={70} width={70} color="#166534" secondaryColor="#4ade80" strokeWidth={5} strokeWidthSecondary={5} />
        </div>
      </div>
    );
  }

  if (error && complaints.length === 0) {
    return <div className={styles["recent-complaints-container"]}>Error: {error}</div>;
  }

  return (
    <>
      <h1 style={{ marginTop: "10px", marginBottom: "20px", marginLeft: "10px", fontSize: "28px", color: "#10b981" }}>
        Customer Complaints
      </h1>

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
            currentComplaints.map((complaint) => {
              const isEditing = editingComplaintId === complaint._id;
              const isResolved = complaint.status?.toLowerCase() === "resolved";

              return (
                <li key={complaint._id} className={styles["complaint-card"]}>
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
                      {!isEditing ? (
                        <>
                          <p className={styles["complaint-text"]}>
                            {complaint.complaintText || "No complaint text available"}
                          </p>
                          {complaint.adminResponse && (
                            <div className={styles["admin-response"]}>
                              <strong>Admin Response:</strong>
                              <p>{complaint.adminResponse}</p>
                            </div>
                          )}
                          <div className={styles["complaint-date"]}>
                            {complaint.createdAt
                              ? new Date(complaint.createdAt).toLocaleDateString("en-IN")
                              : "N/A"}
                          </div>
                        </>
                      ) : (
                        <div className={styles["resolve-box"]}>
                          <p className={styles["complaint-text"]}>
                            {complaint.complaintText || "No complaint text available"}
                          </p>
                          <textarea
                            className={styles["resolve-textarea"]}
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            placeholder="Write your response here..."
                            rows={4}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={styles["complaint-actions"]}>
                    {!isEditing && !isResolved && (
                      <>
                        <button className={styles["status-pending"]}>Pending</button>
                        <button
                          className={styles["btn-resolve"]}
                          onClick={() => handleResolveClick(complaint)}
                          disabled={submittingId === complaint._id}
                        >
                          {submittingId === complaint._id ? "Processing..." : "Resolve"}
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })
          ) : (
            <li className={styles["no-complaints"]}>No customer complaints found.</li>
          )}
        </ul>

        {/* ==================== PAGINATION ==================== */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles["page-btn"]}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            <div className={styles["page-numbers"]}>
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  className={`${styles["page-btn"]} ${page === currentPage ? styles["active"] : ""}`}
                  onClick={() => (typeof page === "number" ? goToPage(page) : null)}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              className={styles["page-btn"]}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>

            <div className={styles["jump-to-page"]}>
              <button
                className={styles["jump-btn"]}
                onClick={() => setShowJumpInput(!showJumpInput)}
              >
                Jump to
              </button>
              {showJumpInput && (
                <div className={styles["jump-input"]}>
                  <input
                    type="number"
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    placeholder="Page"
                    min="1"
                    max={totalPages}
                  />
                  <button onClick={handleJumpToPage}>Go</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerComplaints;