import * as React from "react";
import { styled, alpha } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router-dom";

/* SEARCH BOX */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "14px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  width: "100%",
  maxWidth: 340,
}));

const SearchIconWrapper = styled("div")(() => ({
  position: "absolute",
  left: 14,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "white",
  width: "100%",

  "& .MuiInputBase-input": {
    padding: "10px 14px 10px 45px",
  },
}));

export default function PrimarySearchAppBar({
  setActiveTab,
  setSearchService,
}) {
 
  

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [search, setSearch] = React.useState("");

  const username = localStorage.getItem("name") || "User";

  /* MENU */
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  /* LOGOUT */
  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  /* SEARCH */
  const handleSearch = () => {
    if (!search.trim()) return;

    setActiveTab("services");

    setSearchService(search.toLowerCase());

    setSearch("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #16a34a, #22c55e)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "70px",
            px: {
              xs: 2,
              md: 4,
            },
          }}
        >
          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              cursor: "pointer",

              fontSize: {
                xs: "1.1rem",
                sm: "1.4rem",
              },
            }}
            onClick={() => navigate("/")}
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
              mr: 2,
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>

              <StyledInputBase
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                inputProps={{
                  "aria-label": "search",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </Search>
          </Box>

          {/* PROFILE */}
          <Box>
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",

                px: 2,
                py: 1,

                borderRadius: "12px",

                transition: "0.3s",

                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <AccountCircle />

              <Typography
                sx={{
                  fontWeight: 500,

                  display: {
                    xs: "none",
                    sm: "block",
                  },
                }}
              >
                {username}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MENU */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/profile");
          }}
        >
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/account");
          }}
        >
          My Account
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
