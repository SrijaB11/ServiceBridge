import React from "react";
import {
  Box, Typography, Grid, Card, CardContent,
  AppBar, Toolbar, Avatar, TextField,
  Paper, Chip, Button,
  Drawer, List, ListItemButton, ListItemText
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;

function UserDashboard() {

  // SidebarIcons
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Services", icon: <MiscellaneousServicesIcon /> },
    { text: "My Requests", icon: <AssignmentIcon /> },
    { text: "Payments", icon: <PaymentIcon /> },
    { text: "Complaints", icon: <ReportProblemIcon /> },
    { text: "Profile", icon: <PersonIcon /> }
  ];

  // Services
  const services = [
    { name: "Plumber", icon: <PlumbingIcon /> },
    { name: "Electrician", icon: <ElectricBoltIcon /> },
    { name: "AC Repair", icon: <AcUnitIcon /> },
    { name: "Carpenter", icon: <CarpenterIcon /> },
    { name: "Painter", icon: <FormatPaintIcon /> }
  ];

  // Requests
  const requests = [
    { title: "Plumbing Service", worker: "Ramesh", status: "Accepted" },
    { title: "Electrical Service", worker: "Vikram", status: "In Progress" },
    { title: "Carpentry Service", worker: "Mahesh", status: "Completed" }
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Accepted": return "success";
      case "In Progress": return "warning";
      case "Completed": return "primary";
      default: return "default";
    }
  };

  return (
    <Box sx={{ display: "flex" }}>

      {/* 🔥 SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#0F6D3C",
            color: "white"
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" mb={3}>Service Bridge</Typography>

          <List>
            {menuItems.map((item) => (
                <ListItemButton
                key={item.text}
                sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                    bgcolor: "#145A32"
                    }
                }}
                >
                    <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                        {item.icon}
                    </Box>

                    <ListItemText primary={item.text} />
                </ListItemButton>
            ))}
        </List>
        </Box>
      </Drawer>

      {/* 🔥 MAIN AREA */}
      <Box sx={{ flexGrow: 1 }}>

        {/* 🔥 NAVBAR */}
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "white",
            color: "black",
            bgcolor: "#F1F8F4"
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            <Typography variant="h6">
               Deepak 
            </Typography>

            <TextField
              size="small"
              placeholder="Search services"
              sx={{ width: "40%",  bgcolor: "white" }}
            />

            <Avatar />
          </Toolbar>
        </AppBar>

        {/* 🔥 CONTENT */}
        <Box
          component="main"
          sx={{
            p: 3,
            mt: 8, 
            minHeight: "100vh",
            bgcolor: "#F1F8F4"
          }}
        >

          <Grid container spacing={3}>

            {/* LEFT SIDE */}
            <Grid item xs={12} md={8}>

              {/* Services */}
              <Typography variant="h6" mb={2}>Popular Services</Typography>

              <Grid container spacing={2}>
                {services.map((s, i) => (
                  <Grid item xs={6} md={4} key={i}>
                    <Card sx={{ textAlign: "center", p: 2 , border: "1px solid black" , borderRadius:"10px"}}>
                      <Box sx={{ fontSize: 40, color: "#0F6D3C" }}>
                        {s.icon}
                      </Box>
                      <Typography>{s.name}</Typography>
                      <Button size="small">Book Now</Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Requests */}
              <Typography variant="h6" sx={{mt:5}}>
                My Recent Requests
              </Typography>

              {requests.map((r, i) => (
                <Paper key={i} sx={{ p: 2, mb: 2 , border: "1px solid black" , borderRadius:"10px"}}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography>{r.title}</Typography>
                      <Typography variant="body2">{r.worker}</Typography>
                    </Box>
                    <Chip label={r.status} color={statusColor(r.status)} />
                  </Box>
                </Paper>
              ))}

            </Grid>

            {/* RIGHT SIDE */}
            <Grid item xs={12} md={4} >

              <Paper sx={{ p: 2, mb: 3, ml:10, mt:5 , border: "1px solid black", borderRadius:"10px" }}>
                <Typography variant="h6">Upcoming Booking</Typography>
                <Typography>Electrician</Typography>
                <Typography variant="body2">Tomorrow 11:00 AM</Typography>
                <Chip label="Scheduled" color="success" />
              </Paper>

              <Paper sx={{ p: 2, ml:10, mt:5, border: "1px solid black" , borderRadius:"10px" }}>
                <Typography variant="h6">Need Help?</Typography>
                <Button variant="contained" color="success">
                  Contact Support
                </Button>
              </Paper>

            </Grid>

          </Grid>

        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard