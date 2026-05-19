import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "./index.module.css";

const WorkerVerification = () => {
  const [workersDetailsList, setWorkersDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getWorkerDetails();
  }, []);

  const getWorkerDetails = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return;

    try {
      const response = await fetch("http://localhost:5000/admin/workers", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedWorkersList = data.data.map((worker) => ({
          workerId: worker._id,
          workerName: worker.fullName || worker.WorkerName,
          workerEmail: worker.email,
          services: worker.services?.[0] || "N/A",
          profilePicture: worker.profilePhoto,
          skillCertificate: worker.documents?.skillDoc,
          panCard: worker.panCard,
          aadharCard: worker.aadharCard || worker.documents?.aadharCard,
          workerVerificationStatus: worker.workerVerificationStatus,
        }));

        setWorkersDetailsList(updatedWorkersList);
      }
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const hasAllDocuments = (worker) => {
    return !!(worker.skillCertificate && worker.panCard && worker.aadharCard);
  };

  const updateWorkerStatus = async (workerId, status, workerName) => {
    const jwtToken = localStorage.getItem("token");
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/admin/verifyworkerskillcertificates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          workerId: workerId,
          status: status,
        }),
      });

      if (response.ok) {
        setMessage(
          status === "approved"
            ? `✅ ${workerName} verified successfully!`
            : `🚫 ${workerName} has been rejected.`
        );
        setWorkersDetailsList((prevList) =>
          prevList.map((w) =>
            w.workerId === workerId ? { ...w, workerVerificationStatus: status } : w
          )
        );
      } else {
        // setMessage(` Failed to ${status} worker`);
        toast.error(` Failed to ${status} worker`)
      }
    } catch (error) {
      console.error(error);
      setMessage(` Error while ${status === "approved" ? "approving" : "rejecting"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (workerId) => {
    const worker = workersDetailsList.find((w) => w.workerId === workerId);
    if (!worker) return;

    if (!hasAllDocuments(worker)) {
      toast.error(" All documents must be uploaded before approval!")
      // setMessage("❌ All documents must be uploaded before approval!");
      return;
    }
    updateWorkerStatus(workerId, "approved", worker.workerName);
  };

  const handleReject = (workerId) => {
    const worker = workersDetailsList.find((w) => w.workerId === workerId);
    if (!worker) return;
    updateWorkerStatus(workerId, "rejected", worker.workerName);
  };

  return (
    <>
    <h1 style={{marginTop:"10px",marginBottom:"20px",marginLeft:"10px",fontSize:"28px",color:"#10b981"}}>Certificate Verification</h1>
      <div className={styles.container}>
        {message && (
          <div
            style={{
              padding: "12px 16px",
              margin: "10px 0",
              borderRadius: "6px",
              background: message.includes("✅") ? "#d4edda" : "#f8d7da",
              color: message.includes("✅") ? "#155724" : "#721c24",
              fontWeight: "500",
            }}
          >
            {message}
          </div>
        )}

        <ul className={styles["cards-container"]}>
          {workersDetailsList.map((worker) => {
            const status = worker.workerVerificationStatus;
            const isApproved = status === "approved";
            const isRejected = status === "rejected";

            return (
              <li key={worker.workerId} className={styles["worker-card"]}>
                <div className={styles["worker-card-body"]}>
                  <div className={styles["worker-header"]}>
                    {worker.profilePicture ? (
                      <img
                        src={`http://localhost:5000/${worker.profilePicture.replace(/\\/g, "/")}`}
                        alt="Profile"
                        className={styles["worker-avatar"]}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <div className={styles["worker-avatar"]}>
                        {worker.workerName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}

                    <div className={styles["worker-info"]}>
                      <h3>{worker.workerName}</h3>
                      <p>{worker.services}</p>
                    </div>
                  </div>

                  <div className={styles["certificates-section"]}>
                    <p className={styles["certificates-title"]}>Certificates Uploaded</p>
                    <div className={styles["certificates-list"]}>
                      <span className={styles["certificate-badge"]}>Skill Certificate</span>
                      <span className={styles["certificate-badge"]}>Aadhar Card</span>
                      <span className={styles["certificate-badge"]}>Pan Card</span>
                    </div>
                  </div>

                  <div className={styles["action-buttons"]}>
                    {isApproved ? (
                      <p style={{ color: "green", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                        <CheckIcon /> Verified Successfully
                      </p>
                    ) : isRejected ? (
                      <p style={{ color: "red", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}>
                        <XIcon /> Worker Rejected
                      </p>
                    ) : (
                      <>
                        <button
                          className={`${styles.btn} ${styles["approve-btn"]}`}
                          onClick={() => handleApprove(worker.workerId)}
                          disabled={loading}
                          style={{ display: "flex", alignItems: "center", gap: "8px" }}
                        >
                          <CheckIcon /> Approve
                        </button>
                        <button
                          className={`${styles.btn} ${styles["reject-btn"]}`}
                          onClick={() => handleReject(worker.workerId)}
                          disabled={loading}
                          style={{ display: "flex", alignItems: "center", gap: "8px" }}
                        >
                          <XIcon /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

// Internal SVG Components for clean UI
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default WorkerVerification;