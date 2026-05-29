import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WorkerVerification = ({ onProfileMap }) => {
  const [workersDetailsList, setWorkersDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  useEffect(() => {
    getWorkerDetails();
  }, []);

  const getDocumentUrl = (docPath) => {
    if (!docPath) return null;

    let normalized = docPath.replace(/\\/g, "/");
    const parts = normalized.split("/");
    const encodedParts = parts.map((part) => encodeURIComponent(part));
    const encodedPath = encodedParts.join("/");
    return `http://localhost:5000/${encodedPath}`;
  };

  const getWorkerDetails = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      toast.error("Please login again");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/admin/workers", {
        method: "GET",
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      const data = await response.json();

      if (response.ok) {
        const updatedWorkersList = (data.data || []).map((worker) => {
          return {
            workerId: worker._id,
            workerName: worker.fullName || worker.WorkerName || "Unknown Worker",
            services:
              worker.services?.[0]?.name ||
              worker.services?.[0] ||
              "N/A",
            profilePicture:
              worker.documents?.profilePhoto || worker.profilePhoto,
            skillDocs: worker.documents?.skillDocs,
            panCard: worker.documents?.panCard || worker.panCard,
            workerVerificationStatus:
              worker.workerVerificationStatus || "pending",
          };
        });

        setWorkersDetailsList(updatedWorkersList);

        const profileMap = {};
        updatedWorkersList.forEach((w) => {
          if (w.profilePicture) {
            profileMap[w.workerId] = getDocumentUrl(w.profilePicture);
          }
        });

        if (typeof onProfileMap === "function") {
          onProfileMap(profileMap);
        }
      } else {
        toast.error(data.message || "Failed to fetch workers");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading worker data");
    } finally {
      setLoading(false);
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
        const successMessage =
          status === "approved"
            ? "Worker approved successfully"
            : "Worker rejected successfully";

        setWorkersDetailsList((prevList) =>
          prevList.map((w) =>
            w.workerId === workerId
              ? { ...w, workerVerificationStatus: status }
              : w
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

    if (!worker.skillDocs || !worker.panCard) {
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

  const openModalImage = (docPath) => {
    if (!docPath) {
      toast.error("Document not available");
      return;
    }

    const fullUrl = getDocumentUrl(docPath);

    fetch(fullUrl, { method: "HEAD" })
      .then((response) => {
        if (response.ok) {
          setModalImageSrc(fullUrl);
          setShowModal(true);
        } else {
          toast.error("Document file not found on server");
        }
      })
      .catch(() => {
        toast.error("Cannot access document. Please check if file exists.");
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImageSrc("");
  };

  const renderDocumentLink = (docPath, label) => {
    const hasDoc = !!docPath;
    const url = hasDoc ? getDocumentUrl(docPath) : null;

    return (
      <div
        onClick={() => hasDoc && openModalImage(docPath)}
        className={`cursor-${hasDoc ? "pointer" : "default"} text-sm ${
          hasDoc ? "text-green-600 hover:text-green-700" : "text-gray-400"
        }`}
        title={hasDoc ? url : "No document available"}
      >
        {label}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen bg-white px-4 py-8 font-Poppins"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Certificate Verification</h2>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search worker by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full sm:w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
            />
          </div>
        </div>

        {workersDetailsList.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No workers available.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Profile
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Certificates
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
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

                    const profileImageUrl = worker.profilePicture
                      ? getDocumentUrl(worker.profilePicture)
                      : null;

                    const statusBg =
                      status === "approved"
                        ? "bg-green-100 text-green-800"
                        : status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800";

                    return (
                      <tr
                        key={worker.workerId}
                        className="hover:bg-green-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-4">
                          <div className="relative">
                            {profileImageUrl ? (
                              <img
                                src={profileImageUrl}
                                alt={worker.workerName}
                                onClick={() => openModalImage(worker.profilePicture)}
                                className="w-10 h-10 rounded-full object-cover border-2 border-green-200 cursor-pointer hover:opacity-90"
                              />
                            ) : (
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                                style={{ backgroundColor: "#10B981" }}
                              >
                                {worker.workerName?.charAt(0)?.toUpperCase() || "?"}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="font-semibold text-gray-800">
                            {worker.workerName}
                          </div>
                          <div className="text-xs text-gray-500">{worker.workerId}</div>
                        </td>

                        <td className="px-4 py-4 text-gray-700">{worker.services}</td>

                        <td className="px-4 py-4 text-sm">
                          {renderDocumentLink(worker.skillDocs, "Skill Certificate")}
                          {renderDocumentLink(worker.panCard, "Pan Card")}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${statusBg}`}
                          >
                            {status
                              ? status.charAt(0).toUpperCase() + status.slice(1)
                              : "Pending"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          {isApproved ? (
                            <span className="inline-flex items-center text-sm font-semibold text-green-700">
                              <span className="text-green-600 mr-1">✓</span>
                              Verified
                            </span>
                          ) : isRejected ? (
                            <span className="inline-flex items-center text-sm font-semibold text-red-700">
                              <span className="text-red-600 mr-1">×</span>
                              Rejected
                            </span>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(worker.workerId)}
                                disabled={loading}
                                className={`px-3 py-1.5 text-sm font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500 transition-opacity ${
                                  loading
                                    ? "bg-green-300 opacity-70 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(worker.workerId)}
                                disabled={loading}
                                className={`px-3 py-1.5 text-sm font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-opacity ${
                                  loading
                                    ? "bg-red-300 opacity-70 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700"
                                }`}
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
          </div>
        )}

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            onClick={closeModal}
          >
            <div
              className="relative max-w-3xl max-h-[90vh] overflow-auto rounded-lg bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xl font-bold hover:bg-gray-900"
                style={{ lineHeight: 1 }}
              >
                ×
              </button>
              <img
                src={modalImageSrc}
                alt="Document"
                className="max-w-full max-h-[calc(90vh-2rem)] object-contain p-4 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerVerification;