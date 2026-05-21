import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Card,
  Typography,
  Chip,
  CircularProgress,
  Avatar,
} from "@mui/material";

import {
  MessageSquareWarning,
  CalendarDays,
  Filter,
  ShieldCheck,
} from "lucide-react";

import styles from "./WorkerComplaintsPage.module.css";

function WorkerComplaintsPage() {

  const [complaints, setComplaints] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState("all");

  /* =========================
     FETCH COMPLAINTS
  ========================= */

  const fetchComplaints =
    async () => {
      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            "http://localhost:5000/worker/complaint/worker",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setComplaints(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchComplaints();
  }, []);

  /* =========================
     FILTER
  ========================= */

  const filteredComplaints =
    complaints.filter(
      (complaint) => {

        if (
          filter === "all"
        ) {
          return true;
        }

        return (
          complaint.status ===
          filter
        );
      }
    );

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
        styles.pageWrapper
      }
    >

      {/* HEADER */}

      <div
        className={
          styles.topSection
        }
      >

        <div>

          <Typography
            variant="h4"
            className={
              styles.heading
            }
          >
            Worker Complaints
          </Typography>

          <Typography
            className={
              styles.subHeading
            }
          >
            Monitor and track all
            complaints submitted
            against customers
          </Typography>

        </div>

        {/* FILTER */}

        <div
          className={
            styles.filterWrapper
          }
        >

          <Filter size={18} />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value
              )
            }
            className={
              styles.filterSelect
            }
          >

            <option value="all">
              All Complaints
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="resolved">
              Resolved
            </option>

            <option value="in_review">
              In Review
            </option>

          </select>
        </div>
      </div>

      {/* EMPTY */}

      {filteredComplaints.length ===
      0 ? (

        <div
          className={
            styles.emptyState
          }
        >

          <div
            className={
              styles.emptyIcon
            }
          >

            <MessageSquareWarning
              size={50}
            />

          </div>

          <Typography
            variant="h5"
            fontWeight="bold"
            mt={3}
          >
            No Complaints Found
          </Typography>

          <Typography
            className={
              styles.emptyText
            }
          >
            Complaints submitted
            by you will appear
            here.
          </Typography>

        </div>

      ) : (

        <div
          className={
            styles.complaintsGrid
          }
        >

          {filteredComplaints.map(
            (complaint) => (

              <Card
                key={
                  complaint._id
                }
                className={
                  styles.complaintCard
                }
              >

                {/* STATUS */}

                <div
                  className={
                    styles.statusWrapper
                  }
                >

                  <Chip
                    label={
                      complaint.status
                    }
                    className={`${
                      complaint.status ===
                      "resolved"
                        ? styles.resolved
                        : complaint.status ===
                            "in_review"
                          ? styles.review
                          : styles.pending
                    }`}
                  />
                </div>

                {/* CUSTOMER */}

                <div
                  className={
                    styles.customerSection
                  }
                >

                  <Avatar
                    className={
                      styles.avatar
                    }
                  >
                    {
                      complaint
                        .customer
                        ?.fullName?.[0]
                    }
                  </Avatar>

                  <div>

                    <Typography
                      fontWeight="bold"
                    >
                      {
                        complaint
                          .customer
                          ?.fullName
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        complaint
                          .customer
                          ?.phone
                      }
                    </Typography>

                  </div>
                </div>

                {/* MESSAGE */}

                <div
                  className={
                    styles.messageBox
                  }
                >

                  <Typography
                    className={
                      styles.messageText
                    }
                  >
                    {
                      complaint.complaintText
                    }
                  </Typography>

                </div>

                {/* BOOKING */}

                <div
                  className={
                    styles.bookingBox
                  }
                >

                  <div
                    className={
                      styles.bookingLeft
                    }
                  >

                    <div
                      className={
                        styles.bookingRow
                      }
                    >

                      <CalendarDays
                        size={18}
                      />

                      <Typography>
                        {new Date(
                          complaint
                            .booking
                            ?.date
                        ).toLocaleDateString()}
                      </Typography>

                    </div>

                    <Typography
                      className={
                        styles.bookingId
                      }
                    >
                      Booking ID :
                      {" "}
                      {
                        complaint
                          .booking
                          ?._id
                      }
                    </Typography>

                  </div>

                  {/* <Typography
                    className={
                      styles.amount
                    }
                  >
                    ₹
                    {
                      complaint
                        .booking
                        ?.amount
                    }
                  </Typography> */}

                </div>

                {/* ADMIN RESPONSE */}

                {complaint.adminResponse && (

                  <div
                    className={
                      styles.responseBox
                    }
                  >

                    <div
                      className={
                        styles.responseHeader
                      }
                    >

                      <ShieldCheck
                        size={18}
                      />

                      <Typography
                        fontWeight="bold"
                      >
                        Admin Response
                      </Typography>

                    </div>

                    <Typography
                      variant="body2"
                    >
                      {
                        complaint.adminResponse
                      }
                    </Typography>

                  </div>
                )}
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default WorkerComplaintsPage;