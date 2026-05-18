import { useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Avatar,
  Chip,
} from "@mui/material";

import {
  AssignmentTurnedIn,
  CurrencyRupee,
  AccessTime,
} from "@mui/icons-material";

import styles from "./WorkerHistory.module.css";

const WorkerHistory = () => {

  const [completedJobs, setCompletedJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH COMPLETED REQUESTS
  ========================= */

  const fetchCompletedJobs =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/worker/requests",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const completed =
          response.data.data.filter(
            (request) =>
              request.status ===
              "completed"
          );

        setCompletedJobs(
          completed
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchCompletedJobs();
  }, []);

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
    <Box
      className={
        styles.historyWrapper
      }
    >

      {/* TOP */}

      <div className={styles.topSection}>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Work History
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          View all your
          completed service
          requests.
        </Typography>
      </div>

      {/* EMPTY */}

      {completedJobs.length ===
      0 ? (
        <div
          className={
            styles.emptyState
          }
        >
          <AssignmentTurnedIn
            sx={{
              fontSize: 70,
            }}
          />

          <Typography
            variant="h6"
            mt={2}
          >
            No Completed Jobs
          </Typography>

          <Typography
            color="text.secondary"
          >
            Completed services
            will appear here.
          </Typography>
        </div>
      ) : (
        <div
          className={
            styles.jobsGrid
          }
        >

          {completedJobs.map(
            (job) => (
              <Card
                key={job._id}
                className={
                  styles.jobCard
                }
              >

                {/* TOP */}

                <div
                  className={
                    styles.jobTop
                  }
                >

                  <div
                    className={
                      styles.customerInfo
                    }
                  >

                    <Avatar
                      src={
                        job
                          .customer
                          ?.documents
                          ?.profilePhoto
                          ? `http://localhost:5000/${job.customer.documents.profilePhoto}`
                          : ""
                      }
                      sx={{
                        width: 55,
                        height: 55,
                      }}
                    />

                    <div>

                      <Typography fontWeight="bold">
                        {
                          job
                            .customer
                            ?.fullName
                        }
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {
                          job
                            .customer
                            ?.location
                        }
                      </Typography>
                    </div>
                  </div>

                  <Chip
                    label="Completed"
                    color="success"
                  />
                </div>

                {/* DETAILS */}

                <div
                  className={
                    styles.jobDetails
                  }
                >

                  <div
                    className={
                      styles.detailItem
                    }
                  >

                    <CurrencyRupee
                      fontSize="small"
                    />

                    <Typography>
                      ₹
                      {
                        job.amount
                      }
                    </Typography>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >

                    <AccessTime
                      fontSize="small"
                    />

                    <Typography>
                      {new Date(
                        job.date
                      ).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>

                {/* PAYMENT */}

                <div
                  className={
                    styles.paymentBox
                  }
                >

                  <Typography fontWeight="bold">
                    Payment Status
                  </Typography>

                  <Chip
                    label={
                      job.paymentStatus
                    }
                    color={
                      job.paymentStatus ===
                      "paid"
                        ? "success"
                        : "warning"
                    }
                  />
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </Box>
  );
};

export default WorkerHistory;