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

  const [additionalAmount,setAdditionalAmount,] = useState({});

  const [additionalReason, setAdditionalReason,] = useState({});



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

 
  const handleAdditionalCharges =
  async (requestId) => {
    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const extraAmount =
        Number(
          additionalAmount[
            requestId
          ] || 0
        );

      const reason =
        additionalReason[
          requestId
        ] || "";

      await axios.put(
        `http://localhost:5000/worker/request/additional-charge/${requestId}`,
        {
          additionalCharges:
            extraAmount,

          additionalChargesReason:
            reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Additional charges updated"
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to update charges"
      );
    }
  };

 

 const handleComplete = async (
  requestId
) => {
  try {
    const token =
      localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/worker/request/complete/${requestId}`,
      {
        status: "completed",
        paymentEnabled: true,
      },
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

             <div
                    className={
                      styles.priceSection
                    }
                  >

                    <Typography
                      className={
                        styles.baseAmount
                      }
                    >
                      Base Amount :
                      ₹
                      {
                        request.baseAmount ||
                        199
                      }
                    </Typography>

                <Typography
                  className={
                    styles.additionalAmount
                  }
                >
                  Additional Charges :
                  ₹
                  {
                    request.additionalCharges ||
                    0
                  }
                </Typography>

                <Typography
                  className={
                    styles.totalAmount
                  }
                >
                  Total Amount :
                  ₹
                  {
                    (request.baseAmount ||
                      199) +
                    (request.additionalCharges ||
                      0)
                  }
                  </Typography>

              </div>

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

  <>
  
    {/* ADDITIONAL CHARGES */}

    <div
      className={
        styles.additionalChargeBox
      }
    >

      <input
        type="number"
        placeholder="Additional Amount"

        className={
          styles.chargeInput
        }

        value={
          additionalAmount[
            request._id
          ] || ""
        }

        onChange={(e) =>
          setAdditionalAmount({
            ...additionalAmount,

            [request._id]:
              e.target.value,
          })
        }
      />

      <textarea
        placeholder="Additional Charges Reason"

        className={
          styles.reasonInput
        }

        value={
          additionalReason[
            request._id
          ] || ""
        }

        onChange={(e) =>
          setAdditionalReason({
            ...additionalReason,

            [request._id]:
              e.target.value,
          })
        }
      />

      <Button
        variant="outlined"

        color="success"

        onClick={() =>
          handleAdditionalCharges(
            request._id
          )
        }
      >
        Add Charges
      </Button>

    </div>

    {/* BUTTONS */}

    <div
      className={
        styles.buttonGroup
      }
    >

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

  </>
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