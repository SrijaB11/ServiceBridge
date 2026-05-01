import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

/* SEARCH STYLE */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "12px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 16,
  width: "100%",
  maxWidth: 300,
}));

const SearchIconWrapper = styled("div")(() => ({
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  pointerEvents: "none",
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  paddingLeft: 35,
  width: "100%",
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const username = localStorage.getItem("name") || "User";

  /* MENU HANDLERS */
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #16a34a, #22c55e)",
        }}
      >
        <Toolbar>
          {/* MENU ICON */}
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            Service Bridge
          </Typography>

          {/* SEARCH BAR */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search services..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* DESKTOP USER MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <AccountCircle />
              <Typography sx={{ ml: 1 }}>{username}</Typography>
            </IconButton>
          </Box>

          {/* MOBILE MENU */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={handleMobileMenuOpen}>
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DESKTOP MENU */}
      <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>

      {/* MOBILE MENU */}
      <Menu
        anchorEl={mobileAnchorEl}
        open={isMobileMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
