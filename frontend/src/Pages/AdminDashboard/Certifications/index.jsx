import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import styles from "./index.module.css";

const WorkerVerification = () => {
  const [workersDetailsList, setWorkersDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getWorkerDetails();
  }, []);

  // Helper function to fix Windows backslashes and encode URLs properly
  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;
    
    // First, replace backslashes with forward slashes
    let normalized = docPath.replace(/\\/g, '/');
    
    // Split the path into parts
    const parts = normalized.split('/');
    
    // Encode each part individually (this handles spaces and special characters)
    const encodedParts = parts.map(part => encodeURIComponent(part));
    
    // Join back with forward slashes
    const encodedPath = encodedParts.join('/');
    
    // Return the full URL
    return `http://localhost:5000/${encodedPath}`;
  };

  // Alternative simpler version if the above doesn't work
  const getDocumentUrlSimple = (docPath) => {
    if (!docPath) return null;
    
    // Replace backslashes with forward slashes
    let normalized = docPath.replace(/\\/g, '/');
    
    // Encode the entire path (spaces become %20, parentheses become %28 and %29)
    const encodedPath = encodeURI(normalized);
    
    return `http://localhost:5000/${encodedPath}`;
  };

  const getWorkerDetails = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      toast.error("Please login again");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/admin/workers", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        const updatedWorkersList = (data.data || []).map((worker) => {
          // Debug log to see original paths
          console.log("Worker:", worker.fullName);
          console.log("Profile Photo Path:", worker.documents?.profilePhoto);
          console.log("Skill Docs Path:", worker.documents?.skillDocs);
          console.log("Pan Card Path:", worker.documents?.panCard);
          
          return {
            workerId: worker._id,
            workerName: worker.fullName || worker.WorkerName || "Unknown Worker",
            services: worker.services?.[0]?.name || worker.services?.[0] || "N/A",
            profilePicture: worker.documents?.profilePhoto || worker.profilePhoto,
            skillDocs: worker.documents?.skillDocs,
            panCard: worker.documents?.panCard || worker.panCard,
            aadharCard: worker.documents?.aadharCard || worker.aadharCard,
            workerVerificationStatus: worker.workerVerificationStatus || "pending",
          };
        });

        setWorkersDetailsList(updatedWorkersList);
      } else {
        toast.error(data.message || "Failed to fetch workers");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading worker data");
    }
  };

  const updateWorkerStatus = async (workerId, status) => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return;

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/admin/verifyworkerskillcertificates",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({ workerId, status }),
        }
      );

      const responseData = await response.json().catch(() => ({}));

      if (response.ok || responseData.success) {
        const successMessage = status === "approved"
          ? "Worker approved successfully"
          : "Worker rejected successfully";

        setWorkersDetailsList((prevList) =>
          prevList.map((w) =>
            w.workerId === workerId ? { ...w, workerVerificationStatus: status } : w
          )
        );
        toast.success(successMessage);
      } else {
        toast.error(responseData?.message || `Failed to ${status} worker`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (workerId) => {
    const worker = workersDetailsList.find((w) => w.workerId === workerId);
    if (!worker) return;

    // Check all required documents
    if (!worker.skillDocs || !worker.panCard || !worker.aadharCard) {
      toast.error("All documents must be uploaded before approval!");
      return;
    }

    updateWorkerStatus(workerId, "approved");
  };

  const handleReject = (workerId) => {
    const worker = workersDetailsList.find((w) => w.workerId === workerId);
    if (!worker) {
      toast.error("Worker not found");
      return;
    }
    if (window.confirm(`Reject ${worker.workerName}?`)) {
      updateWorkerStatus(workerId, "rejected");
    }
  };

  const viewDocument = (docPath) => {
    if (!docPath) {
      toast.error("Document not available");
      return;
    }
    
    const fullUrl = getDocumentUrl(docPath);
    console.log("Opening document URL:", fullUrl);
    
    // Test if the URL is valid by trying to fetch it
    fetch(fullUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.open(fullUrl, "_blank");
        } else {
          toast.error("Document file not found on server");
        }
      })
      .catch(() => {
        toast.error("Cannot access document. Please check if file exists.");
      });
  };

  // Helper to render document link with better debugging
  const renderDocumentLink = (docPath, label, emoji) => {
    const hasDoc = !!docPath;
    const url = hasDoc ? getDocumentUrl(docPath) : null;
    
    return (
      <div
        onClick={() => hasDoc && viewDocument(docPath)}
        style={{
          color: hasDoc ? "#007bff" : "#999",
          cursor: hasDoc ? "pointer" : "default",
          textDecoration: "underline",
          marginBottom: "6px",
          fontSize: "13px"
        }}
        title={hasDoc ? url : "No document available"}
      >
        {emoji} {label}
        {hasDoc && " 🔗"}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Certificate Verification</h2>

      <input
        type="text"
        placeholder="Search by worker name or service..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px 12px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "14px",
          marginBottom: "15px",
        }}
      />

      {workersDetailsList.length === 0 ? (
        <p>No workers available.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Service</th>
              <th>Certificates Uploaded</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workersDetailsList
              .filter((worker) => {
                const lowerSearch = searchTerm.toLowerCase();
                return (
                  worker.workerName.toLowerCase().includes(lowerSearch) ||
                  worker.services.toLowerCase().includes(lowerSearch)
                );
              })
              .map((worker) => {
                const status = worker.workerVerificationStatus;
                const isApproved = status === "approved";
                const isRejected = status === "rejected";
                
                // Get profile image URL
                const profileImageUrl = worker.profilePicture 
                  ? getDocumentUrl(worker.profilePicture)
                  : null;

                return (
                  <tr key={worker.workerId}>
                    <td>
                      {profileImageUrl ? (
                        <img
                          src={profileImageUrl}
                          alt={worker.workerName}
                          onError={(e) => {
                            console.error(`Failed to load image: ${profileImageUrl}`);
                            e.target.style.display = "none";
                            const parent = e.target.parentElement;
                            if (parent && !parent.querySelector('.fallback-avatar')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'fallback-avatar';
                              fallback.style.width = "50px";
                              fallback.style.height = "50px";
                              fallback.style.borderRadius = "50%";
                              fallback.style.backgroundColor = "#007bff";
                              fallback.style.color = "white";
                              fallback.style.display = "flex";
                              fallback.style.alignItems = "center";
                              fallback.style.justifyContent = "center";
                              fallback.style.fontSize = "20px";
                              fallback.style.fontWeight = "bold";
                              fallback.textContent = worker.workerName?.charAt(0)?.toUpperCase() || "?";
                              parent.appendChild(fallback);
                            }
                          }}
                          style={{ 
                            width: "50px", 
                            height: "50px", 
                            borderRadius: "50%", 
                            objectFit: "cover" 
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          backgroundColor: "#007bff",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          fontWeight: "bold"
                        }}>
                          {worker.workerName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                    </td>
                    <td>
                      <strong>{worker.workerName}</strong>
                      <br />
                      <small style={{ fontSize: "11px", color: "#666" }}>{worker.workerId}</small>
                    </td>
                    <td>{worker.services}</td>

                    {/* Clickable Documents */}
                    <td>
                      {renderDocumentLink(worker.skillDocs, "Skill Certificate", "📄")}
                      {renderDocumentLink(worker.aadharCard, "Aadhar Card", "🆔")}
                      {renderDocumentLink(worker.panCard, "Pan Card", "📇")}
                    </td>

                    <td>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          backgroundColor: 
                            status === "approved" ? "#d4edda" :
                            status === "rejected" ? "#f8d7da" :
                            "#fff3cd",
                          color:
                            status === "approved" ? "#155724" :
                            status === "rejected" ? "#721c24" :
                            "#856404",
                        }}
                      >
                        {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending"}
                      </span>
                    </td>

                    <td>
                      {isApproved ? (
                        <span style={{ color: "green", fontWeight: "bold" }}>✓ Verified</span>
                      ) : isRejected ? (
                        <span style={{ color: "red", fontWeight: "bold" }}>✕ Rejected</span>
                      ) : (
                        <div>
                          <button
                            onClick={() => handleApprove(worker.workerId)}
                            disabled={loading}
                            style={{
                              background: "#28a745",
                              color: "white",
                              border: "none",
                              marginRight: "8px",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: loading ? "not-allowed" : "pointer",
                              opacity: loading ? 0.6 : 1
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(worker.workerId)}
                            disabled={loading}
                            style={{
                              background: "#dc3545",
                              color: "white",
                              border: "none",
                              padding: "6px 12px",
                              borderRadius: "4px",
                              cursor: loading ? "not-allowed" : "pointer",
                              opacity: loading ? 0.6 : 1
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkerVerification;