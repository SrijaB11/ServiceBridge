import * as React from "react";
import { alpha, styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AccountCircle from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";

import SearchServices from "./SearchServices";

/* SEARCH CONTAINER */
const Search = styled("div")(({ theme }) => ({
  position: "relative",

  width: "100%",
  maxWidth: 420,

  borderRadius: "16px",

  backgroundColor: alpha(theme.palette.common.white, 0.16),

  border: "1px solid rgba(255,255,255,0.18)",

  backdropFilter: "blur(10px)",

  transition: "all 0.3s ease",

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.24),
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  // USER NAME
  const username = localStorage.getItem("name") || "User";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #16a34a, #22c55e)",

          borderBottom: "1px solid rgba(255,255,255,0.1)",

          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px",

            px: {
              xs: 2,
              md: 4,
            },

            gap: 2,
          }}
        >
          {/* LOGO */}
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            sx={{
              fontWeight: 800,

              letterSpacing: 0.5,

              cursor: "pointer",

              whiteSpace: "nowrap",

              color: "white",

              transition: "0.3s",

              fontSize: {
                xs: "1.1rem",
                sm: "1.45rem",
              },

              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            Service Bridge
          </Typography>

          {/* SPACE */}
          <Box sx={{ flexGrow: 1 }} />

          {/* SEARCH */}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },

              width: "100%",
              maxWidth: 420,
            }}
          >
            <Search>
              <SearchServices />
            </Search>
          </Box>

          {/* USER */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,

              px: 2,
              py: 1,

              borderRadius: "14px",

              backgroundColor: "rgba(255,255,255,0.14)",

              border: "1px solid rgba(255,255,255,0.15)",

              backdropFilter: "blur(10px)",

              transition: "0.3s",

              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <AccountCircle sx={{ color: "white" }} />

            <Typography
              sx={{
                fontWeight: 600,

                color: "white",

                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              {username}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
