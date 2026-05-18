import { useEffect, useState } from "react";

import axios from "axios";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import {
  Search,
  KeyboardArrowDown,
} from "@mui/icons-material";

import { BellDot } from "lucide-react";

import styles from "./WorkerHeader.module.css";

const WorkerHeader = () => {
  const [worker, setWorker] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [anchorEl, setAnchorEl] =
    useState(null);

  const open = Boolean(anchorEl);

  // FETCH WORKER DETAILS

  const fetchWorkerData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/worker/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWorker(
        response.data.data
      );

    } catch (error) {

      console.log(
        "Header Fetch Error",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, []);

  // MENU

  const handleMenuOpen = (event) => {
    setAnchorEl(
      event.currentTarget
    );
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // LOADING

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
    <AppBar
      position="sticky"
      elevation={0}
      className={styles.header}
    >
      <Toolbar
        className={styles.toolbar}
      >
        {/* LEFT SECTION */}

        <Box
          className={
            styles.leftSection
          }
        >
          <Typography
            className={styles.logo}
          >
            Service Bridge
          </Typography>
        </Box>

        {/* RIGHT SECTION */}

        <Box
          className={
            styles.rightSection
          }
        >

          {/* PROFILE */}

          <Box
            className={
              styles.profileSection
            }
            onClick={
              handleMenuOpen
            }
          >
            <Avatar
              src={
                worker?.documents
                  ?.profilePhoto
                  ? `http://localhost:5000/${worker.documents.profilePhoto}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              className={
                styles.avatar
              }
            />

            <Box
              className={
                styles.userInfo
              }
            >
              <Typography
                className={
                  styles.userName
                }
              >
                {worker?.fullName ||
                  "Worker"}
              </Typography>

              <Typography
                className={
                  styles.userRole
                }
              >
                Worker
              </Typography>
            </Box>

            <KeyboardArrowDown
              className={
                styles.dropdownIcon
              }
            />
          </Box>

          {/* DROPDOWN MENU */}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={
              handleMenuClose
            }
          >
            <MenuItem
              onClick={
                handleMenuClose
              }
            >
              Profile
            </MenuItem>

            <MenuItem
              onClick={
                handleMenuClose
              }
            >
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => {
                localStorage.clear();

                window.location.href =
                  "/login";
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default WorkerHeader;