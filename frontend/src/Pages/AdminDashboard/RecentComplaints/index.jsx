import { useState, useEffect } from "react";
import styles from "./index.module.css";

const RecentComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch complaints from backend
    useEffect(() => {
        const JwtToken=localStorage.getItem("token")
        const fetchComplaints = async () => {
            try {
                const response = await fetch("http://localhost:5000/complaint/admin",{method:"GET",headers:{Authorization:`Bearer ${JwtToken}`}});
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch complaints");
                }

                const data = await response.json();
                console.log(data)
                setComplaints(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching complaints:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return (
            <div className={styles["recent-complaints-container"]}>
                Loading complaints...
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles["recent-complaints-container"]}>
                Error: {error}
            </div>
        );
    }

    return (
        <div className={styles["recent-complaints-container"]}>
            <div className={styles["recent-complaints-header-container"]}>
                <h1 className={styles["recent-complaints-title"]}>
                    Recent Complaints
                </h1>

                <h1 className={styles["recent-complaints-details"]}>
                    View All
                </h1>
            </div>

            <hr className={styles["horizantal-line"]} />

            <ul className={styles["active-jobs-container"]}>
                {complaints.length > 0 ? (
                    complaints.map((complaint) => (
                        <li
                            key={complaint.UniqueId || complaint.id}
                            className={styles["recent-complaints-list-container"]}
                        >
                            <div>
                                <h1 className={styles["complaint-id"]}>
                                    {complaint.CustomerName}
                                </h1>

                                <h1 className={styles["complaint-name"]}>
                                    {`Against : ${complaint.EmployeeName}`}
                                </h1>
                            </div>

                            <div>
                                <h1 className={styles["complaint-title"]}>
                                    {complaint.ComplaintTitle}
                                </h1>

                                <h1 className={styles["complaint-date"]}>
                                    {complaint.ComplaintDate}
                                </h1>
                            </div>

                            {complaint.Status !== "Resolved" ? (
                                <>
                                    <button
                                        className={styles["complaint-request-status"]}
                                        style={{
                                            border: "2px solid #FFF7ED",
                                            color: "#EA580C",
                                            backgroundColor: "#FFF7ED",
                                        }}
                                    >
                                        Pending
                                    </button>

                                    <button
                                        className={styles["complaint-request-status"]}
                                        style={{
                                            border: "2px solid #166534",
                                            color: "#FFFFFF",
                                            backgroundColor: "#166534",
                                        }}
                                        onClick={() =>
                                            handleResolve(complaint.UniqueId)
                                        }
                                    >
                                        Resolve
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={styles["complaint-request-status"]}
                                        style={{
                                            border: "2px solid #90EE90",
                                            color: "#166534",
                                            backgroundColor: "#90EE90",
                                        }}
                                    >
                                        Resolved
                                    </button>

                                    <button
                                        className={styles["complaint-request-status"]}
                                        style={{
                                            border: "2px solid #166534",
                                            color: "#166534",
                                            backgroundColor: "#ffffff",
                                        }}
                                    >
                                        View
                                    </button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <li>No complaints found</li>
                )}
            </ul>
        </div>
    )
}

// Optional: Handle resolve action
const handleResolve = async (id) => {
    try {
        const response = await fetch(
            `http://localhost:5000/complaint/${id}/resolve`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            alert("Complaint resolved successfully!");
            window.location.reload();
        }
    } catch (error) {
        console.error("Failed to resolve complaint", error);
    }
};

export default RecentComplaints;
