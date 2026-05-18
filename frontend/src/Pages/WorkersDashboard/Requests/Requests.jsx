import { useEffect, useState } from "react";

import axios from "axios";

import {
  Typography,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  CheckCircle,
  Cancel,
  LocationOn,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import styles from "./Requests.module.css";

const Requests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH REQUESTS
  ========================= */

  const fetchRequests = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/worker/requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     const activeRequests =
  response.data.data.filter(
    (request) =>
      request.status ===
        "pending" ||
      request.status ===
        "accepted"
  );

setRequests(
  activeRequests
);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  /* =========================
     ACCEPT REQUEST
  ========================= */

  const handleAccept = async (
    requestId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/worker/request/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Request Accepted Successfully"
      );

      fetchRequests();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to accept request"
      );
    }
  };

  /* =========================
     REJECT REQUEST
  ========================= */

  const handleReject = async (
    requestId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/worker/request/reject/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Request Rejected Successfully"
      );

      fetchRequests();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to reject request"
      );
    }
  };

  /* =========================
     COMPLETE REQUEST
  ========================= */

  const handleComplete = async (
    requestId
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/worker/request/complete/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Service marked as completed"
      );

      fetchRequests();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to complete service"
      );
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div
        className={
          styles.loaderContainer
        }
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      className={
        styles.requestsContainer
      }
    >
      <h1 className={styles.heading}>
        Service Requests
      </h1>

      {requests.length === 0 ? (
        <div
          className={
            styles.emptyState
          }
        >
          No requests available
        </div>
      ) : (
        <div
          className={
            styles.requestsGrid
          }
        >
          {requests.map((request) => (
            <div
              key={request._id}
              className={
                styles.requestCard
              }
            >
              {/* CUSTOMER INFO */}

              <div
                className={
                  styles.customerSection
                }
              >
                <img
                  src={
                    request.customer
                      ?.documents
                      ?.profilePhoto
                      ? `http://localhost:5000/${request.customer.documents.profilePhoto}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="customer"
                  className={
                    styles.customerAvatar
                  }
                />

                <div>
                  <h2
                    className={
                      styles.customerName
                    }
                  >
                    {
                      request.customer
                        ?.fullName
                    }
                  </h2>

                  <p
                    className={
                      styles.customerEmail
                    }
                  >
                    {
                      request.customer
                        ?.email
                    }
                  </p>
                </div>
              </div>

              {/* SERVICE */}

              <h3
                className={
                  styles.serviceTitle
                }
              >
                Service Booking
              </h3>

              {/* DESCRIPTION */}

              <p
                className={
                  styles.description
                }
              >
                Customer booked a service on{" "}
                {new Date(
                  request.date
                ).toLocaleDateString()}
              </p>

              {/* LOCATION */}

              <div
                className={
                  styles.location
                }
              >
                <LocationOn
                  color="success"
                />

                <span>
                  {
                    request.customer
                      ?.location
                  }
                </span>
              </div>

              {/* PAYMENT */}

              <Typography
                fontWeight="bold"
                mb={2}
              >
                Amount: ₹
                {request.amount}
              </Typography>

              {/* STATUS */}

              <div
                className={
                  styles.statusContainer
                }
              >
                <Chip
                  label={
                    request.status
                  }
                  color={
                    request.status ===
                    "pending"
                      ? "warning"
                      : request.status ===
                          "accepted"
                        ? "success"
                        : request.status ===
                            "completed"
                          ? "primary"
                          : request.status ===
                              "rejected"
                            ? "error"
                            : "default"
                  }
                />
              </div>

              {/* PENDING BUTTONS */}

              {request.status ===
                "pending" && (
                <div
                  className={
                    styles.buttonGroup
                  }
                >
                  <Button
                    variant="contained"
                    startIcon={
                      <CheckCircle />
                    }
                    className={
                      styles.acceptButton
                    }
                    onClick={() =>
                      handleAccept(
                        request._id
                      )
                    }
                  >
                    Accept
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={
                      <Cancel />
                    }
                    className={
                      styles.rejectButton
                    }
                    onClick={() =>
                      handleReject(
                        request._id
                      )
                    }
                  >
                    Reject
                  </Button>
                </div>
              )}

              {/* ACCEPTED BUTTONS */}

              {request.status ===
                "accepted" && (
                <div
                  className={
                    styles.buttonGroup
                  }
                >
                  {/* COMPLETE */}

                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      handleComplete(
                        request._id
                      )
                    }
                  >
                    Completed
                  </Button>

                  {/* COMPLAINT */}

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                      navigate(
                        `/worker/complaint/${request._id}`
                      )
                    }
                  >
                    Raise Complaint
                  </Button>
                </div>
              )}

              {/* COMPLETED MESSAGE */}

              {request.status ===
                "completed" && (
                <div
                  className={
                    styles.completedBox
                  }
                >
                  <p>
                    Service completed
                    successfully
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;