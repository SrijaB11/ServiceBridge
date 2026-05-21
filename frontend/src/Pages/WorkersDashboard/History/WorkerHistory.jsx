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
    const [filter, setFilter] =
  useState("all");

  

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

  const historyRequests = response.data.data.filter(
                                    (request) =>
                                      request.status ===
                                        "completed" ||
                                      request.status ===
                                        "rejected" ||
                                      request.status ===
                                        "cancelled"
                                  );

                                  setCompletedJobs(
                                    historyRequests
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


  const filteredJobs =
  completedJobs.filter(
    (job) => {

      if (filter === "all") {
        return true;
      }

      return (
        job.status === filter
      );
    }
  );


 

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

      {/* TOP SECTION */}

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

      {/* FILTERS */}

<div className={styles.filterSection}>

  <button
    className={
      filter === "all"
        ? styles.activeFilter
        : styles.filterBtn
    }
    onClick={() =>
      setFilter("all")
    }
  >
    All
  </button>

  <button
    className={
      filter === "completed"
        ? styles.activeFilter
        : styles.filterBtn
    }
    onClick={() =>
      setFilter(
        "completed"
      )
    }
  >
    Completed
  </button>

  <button
    className={
      filter === "rejected"
        ? styles.activeFilter
        : styles.filterBtn
    }
    onClick={() =>
      setFilter(
        "rejected"
      )
    }
  >
    Rejected
  </button>

  <button
    className={
      filter === "cancelled"
        ? styles.activeFilter
        : styles.filterBtn
    }
    onClick={() =>
      setFilter(
        "cancelled"
      )
    }
  >
    Cancelled
  </button>
</div>

      {/* EMPTY STATE */}

      {filteredJobs.length ===
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
                      {filter === "completed"
                        ? "No Completed Jobs"
                        : filter ===
                            "rejected"
                          ? "No Rejected Jobs"
                          : filter ===
                              "cancelled"
                            ? "No Cancelled Jobs"
                            : "No History Found"}
                    </Typography>
                    

                  <Typography
                    color="text.secondary"
                  >
                    {filter === "completed"
                      ? "Completed services will appear here."
                      : filter ===
                          "rejected"
                        ? "Rejected requests will appear here."
                        : filter ===
                            "cancelled"
                          ? "Cancelled requests will appear here."
                          : "History data will appear here."}
                      </Typography>

        </div>
      ) : (
        <div
          className={
            styles.jobsGrid
          }
        >

          {filteredJobs.map(
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
                        job?.customer
                          ?.documents
                          ?.profilePhoto
                          ? `http://localhost:5000/${job.customer.documents.profilePhoto}`
                          : undefined
                      }
                      sx={{
                        width: 55,
                        height: 55,
                      }}
                    >
                      {!job?.customer
                        ?.documents
                        ?.profilePhoto &&
                        job?.customer
                          ?.fullName?.[0]}
                    </Avatar>

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
                        label={job.status}
                        color={
                          job.status ===
                          "completed"
                            ? "success"
                            : job.status ===
                                "rejected"
                              ? "error"
                              : "warning"
                        }
                      />

                </div>

                {/* DETAILS */}

                <div
                  className={
                    styles.jobDetails
                  }
                >

                  {/* TOTAL AMOUNT */}

                  <div
                    className={
                      styles.detailItem
                    }
                  >

                    <CurrencyRupee
                      fontSize="small"
                    />

                    <Typography>
                      Total:
                      ₹
                      {job.amount || 0}
                    </Typography>

                  </div>

                  {/* WORKER EARNINGS */}

                  <div
                    className={
                      styles.detailItem
                    }
                  >

                    <CurrencyRupee
                      fontSize="small"
                    />

                    <Typography
                      className={
                        styles.earningText
                      }
                    >
                      You Earn:
                      ₹
                      {
                        job.workerAmount ||
                        0
                      }
                    </Typography>

                  </div>

                  {/* DATE */}

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

                {/* PAYMENT SECTION */}

                <div
                  className={
                    styles.paymentBox
                  }
                >

                  {/* PAYMENT STATUS */}

                  <div
                    className={
                      styles.paymentRow
                    }
                  >

                    <Typography fontWeight="bold">
                      Payment Status
                    </Typography>

                    <Chip
                      label={
                        job.paymentStatus ===
                        "paid"
                          ? "Customer Paid"
                          : "Pending"
                      }
                      color={
                        job.paymentStatus ===
                        "paid"
                          ? "success"
                          : "warning"
                      }
                    />

                  </div>

                  {/* EARNINGS */}

                  {job.paymentStatus ===
                    "paid" && (
                    <div
                      className={
                        styles.paymentRow
                      }
                    >

                      <Typography
                        className={
                          styles.earningText
                        }
                      >
                        Worker Earnings:
                        ₹
                        {
                          job.workerAmount ||
                          0
                        }
                      </Typography>

                      {job.workerPaid ? (
                        <Chip
                          label="Paid by Admin"
                          color="primary"
                        />
                      ) : (
                        <Chip
                          label="Awaiting Admin Payout"
                          color="warning"
                        />
                      )}

                    </div>
                  )}

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