import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";

import axios from "axios";

import {
  Typography,
  Button,
  Chip,
  CircularProgress,
  Pagination,
} from "@mui/material";

import {
  CheckCircle,
  Cancel,
  LocationOn,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import styles from "./Requests.module.css";

const BASE_URL =
  "http://localhost:5000";



const api = axios.create({
  baseURL: BASE_URL,
});



api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);



const RequestCard = memo(
  ({
    request,
    additionalData,
    onInputChange,
    onAccept,
    onReject,
    onComplete,
    onAdditionalCharges,
    navigate,
  }) => {

    const {
      _id,
      status,
      customer,
      date,
      baseAmount = 199,
      additionalCharges = 0,
    } = request;

   

    const totalAmount =
      useMemo(() => {

        return (
          baseAmount +
          additionalCharges
        );

      }, [
        baseAmount,
        additionalCharges,
      ]);

    // ==========================
    // STATUS COLOR
    // ==========================

    const statusColor =
      useMemo(() => {

        const map = {
          pending: "warning",
          accepted: "success",
          completed: "primary",
          rejected: "error",
        };

        return (
          map[status] ||
          "default"
        );

      }, [status]);

    return (
      <div
        className={
          styles.requestCard
        }
      >

        {/* CUSTOMER */}

        <div
          className={
            styles.customerSection
          }
        >

          <img
            src={
              customer?.documents
                ?.profilePhoto
                ? `${BASE_URL}/${customer.documents.profilePhoto}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }

            alt="customer"

            loading="lazy"

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
                customer?.fullName
              }
            </h2>

            <p
              className={
                styles.customerEmail
              }
            >
              {
                customer?.email
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
          Customer booked a
          service on{" "}
          {new Date(
            date
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
              customer?.location
            }
          </span>

        </div>

        {/* PAYMENT */}

        <div
          className={
            styles.priceSection
          }
        >

          <Typography>
            Base Amount :
            ₹{baseAmount}
          </Typography>

          <Typography>
            Additional Charges :
            ₹
            {
              additionalCharges
            }
          </Typography>

          <Typography>
            Total Amount :
            ₹{totalAmount}
          </Typography>

        </div>

        {/* STATUS */}

        <div
          className={
            styles.statusContainer
          }
        >

          <Chip
            label={status}
            color={statusColor}
          />

        </div>

        {/* PENDING ACTIONS */}

        {status ===
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
                onAccept(_id)
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
                onReject(_id)
              }
            >
              Reject
            </Button>

          </div>
        )}

        {/* ACCEPTED ACTIONS */}

        {status ===
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
                  additionalData[
                    _id
                  ]?.amount || ""
                }

                onChange={(e) =>
                  onInputChange(
                    _id,
                    "amount",
                    e.target.value
                  )
                }
              />

              <textarea
                placeholder="Additional Charges Reason"

                className={
                  styles.reasonInput
                }

                value={
                  additionalData[
                    _id
                  ]?.reason || ""
                }

                onChange={(e) =>
                  onInputChange(
                    _id,
                    "reason",
                    e.target.value
                  )
                }
              />

              <Button
                variant="outlined"
                color="success"
                onClick={() =>
                  onAdditionalCharges(
                    _id
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
                  onComplete(_id)
                }
              >
                Completed
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  navigate(
                    `/worker/complaint/${_id}`
                  )
                }
              >
                Raise Complaint
              </Button>

            </div>
          </>
        )}
      </div>
    );
  }
);



const Requests = () => {

  const navigate =
    useNavigate();

  

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [actionLoading,
    setActionLoading] =
    useState(false);

  const [additionalData,
    setAdditionalData] =
    useState({});

  // PAGINATION STATES

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const limit = 6;

  

  const fetchRequests =
    useCallback(async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            `/worker/requests?page=${page}&limit=${limit}`
          );

        const {
          data,
          pagination,
        } = response.data;

        const activeRequests =
          data.filter(
            ({ status }) =>
              [
                "pending",
                "accepted",
              ].includes(
                status
              )
          );

        setRequests(
          activeRequests
        );

        setTotalPages(
          pagination.totalPages
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    }, [page]);

  

  useEffect(() => {

    fetchRequests();

  }, [
    fetchRequests,
    page,
  ]);

  

  const handleAction =
    useCallback(
      async (
        endpoint,
        requestId,
        payload = {},
        successMessage
      ) => {

        try {

          setActionLoading(
            true
          );

          await api.put(
            `/worker/request/${endpoint}/${requestId}`,
            payload
          );

          alert(
            successMessage
          );

          fetchRequests();

        } catch (error) {

          console.log(
            error
          );

          alert(
            error.response
              ?.data
              ?.message ||
              "Something went wrong"
          );

        } finally {

          setActionLoading(
            false
          );
        }
      },
      [fetchRequests]
    );

  

  const handleAccept =
    useCallback(
      (requestId) => {

        handleAction(
          "accept",
          requestId,
          {},
          "Request Accepted Successfully"
        );

      },
      [handleAction]
    );

  const handleReject =
    useCallback(
      (requestId) => {

        handleAction(
          "reject",
          requestId,
          {},
          "Request Rejected Successfully"
        );

      },
      [handleAction]
    );

  const handleComplete =
    useCallback(
      (requestId) => {

        handleAction(
          "complete",
          requestId,
          {
            status:
              "completed",

            paymentEnabled:
              true,
          },
          "Service marked as completed"
        );

      },
      [handleAction]
    );

 

  const onInputChange =
    useCallback(
      (
        requestId,
        field,
        value
      ) => {

        setAdditionalData(
          (prev) => ({
            ...prev,

            [requestId]:
              {
                ...prev[
                  requestId
                ],

                [field]:
                  value,
              },
          })
        );

      },
      []
    );

 

  const handleAdditionalCharges =
    useCallback(
      async (
        requestId
      ) => {

        const data =
          additionalData[
            requestId
          ] || {};

        await handleAction(
          "additional-charge",
          requestId,
          {
            additionalCharges:
              Number(
                data.amount ||
                  0
              ),

            additionalChargesReason:
              data.reason ||
              "",
          },
          "Additional charges updated"
        );

      },
      [
        additionalData,
        handleAction,
      ]
    );

  

  const renderedRequests =
    useMemo(() => {

      return requests.map(
        (request) => (

          <RequestCard
            key={
              request._id
            }

            request={
              request
            }

            additionalData={
              additionalData
            }

            onInputChange={
              onInputChange
            }

            onAccept={
              handleAccept
            }

            onReject={
              handleReject
            }

            onComplete={
              handleComplete
            }

            onAdditionalCharges={
              handleAdditionalCharges
            }

            navigate={
              navigate
            }
          />
        )
      );
    }, [
      requests,
      additionalData,
      onInputChange,
      handleAccept,
      handleReject,
      handleComplete,
      handleAdditionalCharges,
      navigate,
    ]);

  

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

      <h1
        className={
          styles.heading
        }
      >
        Service Requests
      </h1>

      {actionLoading && (
        <div
          className={
            styles.actionLoader
          }
        >
          Processing...
        </div>
      )}

      {requests.length ===
      0 ? (

        <div
          className={
            styles.emptyState
          }
        >
          No requests available
        </div>

      ) : (

        <>
          {/* REQUESTS GRID */}

          <div
            className={
              styles.requestsGrid
            }
          >
            {
              renderedRequests
            }
          </div>

          {/* PAGINATION */}

          <div
            className={
              styles.paginationContainer
            }
          >

            <Pagination
              count={
                totalPages
              }

              page={page}

              color="primary"

              shape="rounded"

              onChange={(
                event,
                value
              ) => {

                setPage(
                  value
                );

                window.scrollTo({
                  top: 0,
                  behavior:
                    "smooth",
                });
              }}
            />

          </div>
        </>
      )}
    </div>
  );
};

export default Requests;