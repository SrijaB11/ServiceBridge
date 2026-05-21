import { useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Chip,
} from "@mui/material";

import {
  CurrencyRupee,
  AccountBalanceWallet,
  Paid,
  TrendingUp,
} from "@mui/icons-material";

import styles from "./WorkerEarnings.module.css";

const WorkerEarnings = () => {

  const [earnings, setEarnings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      totalEarnings: 0,
      pendingPayouts: 0,
      paidPayouts: 0,
    });

  /* =========================
     FETCH EARNINGS
  ========================= */

  const fetchEarnings =
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

        const paidJobs =
          response.data.data.filter(
            (job) =>
              job.paymentStatus ===
              "paid"
          );

        setEarnings(paidJobs);

        /* STATS */

        const totalEarnings =
          paidJobs.reduce(
            (acc, item) =>
              acc +
              (item.workerAmount ||
                0),
            0
          );

        const pendingPayouts =
          paidJobs.filter(
            (item) =>
              !item.workerPaid
          ).length;

        const paidPayouts =
          paidJobs.filter(
            (item) =>
              item.workerPaid
          ).length;

        setStats({
          totalEarnings,
          pendingPayouts,
          paidPayouts,
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchEarnings();
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
        styles.earningsWrapper
      }
    >

      {/* TOP */}

      <div className={styles.topSection}>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Earnings
        </Typography>

        <Typography
          color="text.secondary"
        >
          Track your payouts
          and completed
          payments.
        </Typography>

      </div>

      {/* STATS */}

      <div className={styles.statsGrid}>

        {/* TOTAL */}

        <Card
          className={
            styles.statCard
          }
        >

          <div
            className={
              styles.iconGreen
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
              {stats.totalEarnings.toFixed(
                2
              )}
            </Typography>

            <Typography>
              Total Earnings
            </Typography>

          </div>

        </Card>

        {/* PENDING */}

        <Card
          className={
            styles.statCard
          }
        >

          <div
            className={
              styles.iconOrange
            }
          >
            <AccountBalanceWallet />
          </div>

          <div>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {
                stats.pendingPayouts
              }
            </Typography>

            <Typography>
              Pending Payouts
            </Typography>

          </div>

        </Card>

        {/* PAID */}

        <Card
          className={
            styles.statCard
          }
        >

          <div
            className={
              styles.iconBlue
            }
          >
            <Paid />
          </div>

          <div>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {
                stats.paidPayouts
              }
            </Typography>

            <Typography>
              Paid Payouts
            </Typography>

          </div>

        </Card>

        {/* GROWTH */}

        <Card
          className={
            styles.statCard
          }
        >

          <div
            className={
              styles.iconPurple
            }
          >
            <TrendingUp />
          </div>

          <div>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              95%
            </Typography>

            <Typography>
              Your Share
            </Typography>

          </div>

        </Card>
      </div>

      {/* LIST */}

      <div className={styles.earningsList}>

        {earnings.length ===
        0 ? (
          <div
            className={
              styles.emptyState
            }
          >

            <Typography
              variant="h6"
            >
              No Earnings Yet
            </Typography>

            <Typography color="text.secondary">
              Completed paid
              jobs will appear
              here.
            </Typography>

          </div>
        ) : (
          earnings.map(
            (job) => (
              <Card
                key={job._id}
                className={
                  styles.earningCard
                }
              >

                <div
                  className={
                    styles.cardTop
                  }
                >

                  <div>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {
                        job.customer
                          ?.fullName
                      }
                    </Typography>

                    <Typography color="text.secondary">
                      {new Date(
                        job.date
                      ).toLocaleDateString()}
                    </Typography>

                  </div>

                  <Chip
                    label={
                      job.workerPaid
                        ? "Paid"
                        : "Pending"
                    }
                    color={
                      job.workerPaid
                        ? "success"
                        : "warning"
                    }
                  />

                </div>

                <div
                  className={
                    styles.amountSection
                  }
                >

                  <div>

                    <Typography color="text.secondary">
                      Total Amount
                    </Typography>

                    <Typography fontWeight="bold">
                      ₹
                      {
                        job.amount ||
                        (
                          (job.workerAmount ||
                            0) +
                          (job.adminCommission ||
                            0)
                        ).toFixed(
                          2
                        )
                      }
                    </Typography>

                  </div>

                  <div>

                    <Typography color="text.secondary">
                      Commission
                    </Typography>

                    <Typography
                      color="error"
                      fontWeight="bold"
                    >
                      ₹
                      {
                        job.adminCommission?.toFixed(
                          2
                        ) || 0
                      }
                    </Typography>

                  </div>

                  <div>

                    <Typography color="text.secondary">
                      You Earned
                    </Typography>

                    <Typography
                      className={
                        styles.earningText
                      }
                    >
                      ₹
                      {
                        job.workerAmount?.toFixed(
                          2
                        ) || 0
                      }
                    </Typography>

                  </div>

                </div>

              </Card>
            )
          )
        )}

      </div>

    </Box>
  );
};

export default WorkerEarnings;