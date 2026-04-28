import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0B1C2C", color: "#fff", mt: 5 }}>
      {/* MAIN FOOTER */}
      <Container sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(5, 1fr)", // 5 columns here
            },
            gap: 4,
          }}
        >
          {/* BRAND */}
          <Box>
            <Box display="flex" alignItems="center" mb={2}>
              <img src="/images/logo.png" alt="ServiceBridge Logo" width="40" />
              <Typography variant="h6" ml={1}>
                ServiceBridge
              </Typography>
            </Box>

            <Typography variant="body2" mb={2}>
              Your one-stop solution to book trusted professionals for all your
              home and business needs.
            </Typography>

            <Box display="flex" gap={2}>
              <FacebookOutlinedIcon />
              <TwitterIcon />
              <InstagramIcon />
              <LinkedInIcon />
            </Box>
          </Box>

          {/* QUICK LINKS */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            {["Home", "Services", "How It Works", "About Us", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  display="block"
                  color="inherit"
                  underline="none"
                  mb={1}
                >
                  {item}
                </Link>
              ),
            )}
          </Box>

          {/* FOR CUSTOMERS */}
          <Box>
            <Typography variant="h6" gutterBottom>
              For Customers
            </Typography>
            {[
              "Browse Services",
              "Book a Service",
              "Help Center",
              "Login / Register",
              "Pricing",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                display="block"
                color="inherit"
                underline="none"
                mb={1}
              >
                {item}
              </Link>
            ))}
          </Box>

          {/* FOR PROFESSIONALS */}
          <Box>
            <Typography variant="h6" gutterBottom>
              For Professionals
            </Typography>
            {[
              "Join as a Professional",
              "Professional Guidelines",
              "Dashboard Login",
              "Earnings",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                display="block"
                color="inherit"
                underline="none"
                mb={1}
              >
                {item}
              </Link>
            ))}
          </Box>

          {/* CONTACT */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>

            <Typography variant="body2" mb={1}>
              <LocalPhoneIcon fontSize="small" /> +91 12345 67890
            </Typography>
            <Typography variant="body2" mb={1}>
              <MailIcon fontSize="small" /> support@servicebridge.com
            </Typography>
            <Typography variant="body2">
              <LocationOnIcon fontSize="small" /> 123, Green Street, New Delhi,
              India – 110001
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* BOTTOM BAR */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          py: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Service Bridge. All rights reserved.
        </Typography>

        <Box mt={1}>
          {["Privacy Policy", "Terms & Conditions", "Cookies Policy"].map(
            (item) => (
              <Link
                key={item}
                href="#"
                color="inherit"
                underline="none"
                mx={1}
                fontSize="14px"
              >
                {item}
              </Link>
            ),
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
