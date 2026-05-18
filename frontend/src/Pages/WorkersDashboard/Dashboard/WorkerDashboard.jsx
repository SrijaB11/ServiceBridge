import { useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";

import {
  Work,
  Star,
  CurrencyRupee,
  AssignmentTurnedIn,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import styles from "./WorkerDashboard.module.css";

const WorkerDashboard = () => {

  const navigate =
    useNavigate();

  const [workerData, setWorkerData] =
    useState(null);

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH DASHBOARD DATA
  ========================= */

  const fetchDashboardData =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        /* PROFILE */

        const profileResponse =
          await axios.get(
            "http://localhost:5000/worker/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setWorkerData(
          profileResponse.data.data
        );

        /* REQUESTS */

        const requestsResponse =
          await axios.get(
            "http://localhost:5000/worker/requests",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

       const activeRequests =
              requestsResponse.data.data.filter(
                 (request) =>
                request.status !==
                    "completed"
                   );

setRequests(activeRequests);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboardData();
  }, []);


  const handleAccept = async (
    requestId
  ) => {
    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `http://localhost:5000/worker/request/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);
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
        localStorage.getItem(
          "token"
        );

      await axios.put(
        `http://localhost:5000/worker/request/reject/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);
    }
  };

  /* =========================
     COMPLETE REQUEST
  ========================= */

  const handleComplete =
    async (requestId) => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.put(
          `http://localhost:5000/worker/request/complete/${requestId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchDashboardData();

      } catch (error) {

        console.log(error);
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

  /* =========================
     STATS
  ========================= */

  const completedJobs =
    requests.filter(
      (req) =>
        req.status ===
        "completed"
    ).length;

  const activeJobs =
    requests.filter(
      (req) =>
        req.status ===
        "accepted"
    ).length;

  const totalEarnings =
    requests
      .filter(
        (req) =>
          req.paymentStatus ===
          "paid"
      )
      .reduce(
        (total, req) =>
          total +
          (req.amount || 0),
        0
      );

  return (
    <Box
      className={
        styles.dashboardWrapper
      }
    >

      {/* TOP */}

      <div className={styles.topSection}>
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          Welcome back,{" "}
          {workerData?.fullName}!
        </Typography>
      </div>

      {/* STATS */}

      <div className={styles.statsGrid}>

        {/* ACTIVE */}

        <Card
          className={
            styles.statCard
          }
        >
          <div
            className={
              styles.statIconGreen
            }
          >
            <Work />
          </div>

          <div>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {activeJobs}
            </Typography>

            <Typography>
              Active Jobs
            </Typography>
          </div>
        </Card>

        {/* COMPLETED */}

        <Card
          className={
            styles.statCard
          }
        >
          <div
            className={
              styles.statIconBlue
            }
          >
            <AssignmentTurnedIn />
          </div>

          <div>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {
                completedJobs
              }
            </Typography>

            <Typography>
              Completed Jobs
            </Typography>
          </div>
        </Card>

        {/* RATINGS */}

        <Card
          className={
            styles.statCard
          }
        >
          <div
            className={
              styles.statIconYellow
            }
          >
            <Star />
          </div>

          <div>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              4.8
            </Typography>

            <Typography>
              Ratings
            </Typography>
          </div>
        </Card>

        {/* EARNINGS */}

        <Card
          className={
            styles.statCard
          }
        >
          <div
            className={
              styles.statIconPurple
            }
          >
            <CurrencyRupee />
          </div>

          <div>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              ₹
              {
                totalEarnings
              }
            </Typography>

            <Typography>
              Earnings
            </Typography>
          </div>
        </Card>
      </div>

      {/* MAIN GRID */}

      <div className={styles.mainGrid}>

        {/* LEFT */}

        <div
          className={
            styles.leftSection
          }
        >

          {/* REQUESTS */}

          <Card
            className={
              styles.jobsCard
            }
          >

            <div
              className={
                styles.cardHeader
              }
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Service Requests
              </Typography>
            </div>

            <div
              className={
                styles.jobsList
              }
            >

              {requests.length ===
              0 ? (
                <Typography>
                  No requests
                  available
                </Typography>
              ) : (
                requests
                  .slice(0, 5)
                  .map(
                    (
                      request
                    ) => (
                      <div
                        key={
                          request._id
                        }
                        className={
                          styles.jobItem
                        }
                      >

                        {/* LEFT */}

                        <div
                          className={
                            styles.jobLeft
                          }
                        >

                          <Typography fontWeight="bold">
                            {
                              request
                                .customer
                                ?.fullName
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {
                              request
                                .customer
                                ?.location
                            }
                          </Typography>

                          <Typography
                            variant="body2"
                            mt={1}
                          >
                            ₹
                            {
                              request.amount
                            }
                          </Typography>
                        </div>

                        {/* RIGHT */}

                        <div
                          className={
                            styles.jobRight
                          }
                        >

                          <Chip
                            label={
                              request.status
                            }
                            color={
                              request.status ===
                              "completed"
                                ? "success"
                                : request.status ===
                                    "accepted"
                                  ? "primary"
                                  : request.status ===
                                      "rejected"
                                    ? "error"
                                    : "warning"
                            }
                          />

                          {/* PENDING */}

                          {request.status ===
                            "pending" && (
                            <div
                              className={
                                styles.actionButtons
                              }
                            >

                              <button
                                className={
                                  styles.acceptBtn
                                }
                                onClick={() =>
                                  handleAccept(
                                    request._id
                                  )
                                }
                              >
                                Accept
                              </button>

                              <button
                                className={
                                  styles.rejectBtn
                                }
                                onClick={() =>
                                  handleReject(
                                    request._id
                                  )
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}

                          {/* ACCEPTED */}

                          {request.status ===
                            "accepted" && (
                            <div
                              className={
                                styles.actionButtons
                              }
                            >

                              <button
                                className={
                                  styles.completeBtn
                                }
                                onClick={() =>
                                  handleComplete(
                                    request._id
                                  )
                                }
                              >
                                Completed
                              </button>

                              <button
                                className={
                                  styles.complaintBtn
                                }
                                onClick={() =>
                                  navigate(
                                    `/worker/complaint/${request._id}`
                                  )
                                }
                              >
                                Complaint
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )
              )}
            </div>
          </Card>

        
        </div>

        {/* RIGHT */}

        <div
          className={
            styles.rightSection
          }
        >

          {/* PROFILE */}

          <Card
            className={
              styles.profileCard
            }
          >

            <div
              className={
                styles.cardHeader
              }
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Profile Summary
              </Typography>
            </div>

            <div
              className={
                styles.profileTop
              }
            >

              <div>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  {
                    workerData?.fullName
                  }
                </Typography>

                <Typography color="text.secondary">
                  {workerData?.services?.join(
                    ", "
                  )}
                </Typography>

                <Chip
                  label={
                    workerData?.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                  color={
                    workerData?.isVerified
                      ? "success"
                      : "warning"
                  }
                  sx={{ mt: 2 }}
                />
              </div>

              <Avatar
                src={
                  workerData
                    ?.documents
                    ?.profilePhoto
                    ? `http://localhost:5000/${workerData.documents.profilePhoto}`
                    : ""
                }
                sx={{
                  width: 80,
                  height: 80,
                }}
              />
            </div>

            <div
              className={
                styles.profileInfo
              }
            >

              <Typography>
                📞{" "}
                {
                  workerData?.phone
                }
              </Typography>

              <Typography>
                📧{" "}
                {
                  workerData?.email
                }
              </Typography>

              <Typography>
                📍{" "}
                {
                  workerData?.location
                }
              </Typography>
            </div>
          </Card>

          {/* SERVICES */}

          <Card
            className={
              styles.servicesCard
            }
          >

            <div
              className={
                styles.cardHeader
              }
            >
              <Typography
                variant="h6"
                fontWeight="bold"
              >
                Services Offered
              </Typography>
            </div>

            <div>
              {workerData?.services?.map(
                (
                  service,
                  index
                ) => (
                  <div
                    key={index}
                    className={
                      styles.serviceItem
                    }
                  >

                    <Typography>
                       {service}
                    </Typography>

                    <Typography>
                      ₹500
                    </Typography>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default WorkerDashboard;