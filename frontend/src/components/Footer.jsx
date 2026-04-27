import React from "react";
import { Box, Container, Grid, Typography, Link, Button } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#0B1C2C", color: "#fff", mt: 5 }}>
      {/* MAIN FOOTER */}
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* BRAND */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img src="/logo.png" alt="ServiceBridge Logo" width="40" />
              <Typography variant="h6" ml={1}>
                ServiceBridge
              </Typography>
            </Box>

            <Typography variant="body2" mb={2}>
              Your one-stop solution to book trusted professionals for all your
              home and business needs.
            </Typography>

            {/* SOCIAL ICONS */}
            <Box display="flex" gap={2}>
              <img src="/facebook.png" alt="fb" width="20" />
              <img src="/twitter.png" alt="twitter" width="20" />
              <img src="/instagram.png" alt="insta" width="20" />
              <img src="/linkedin.png" alt="linkedin" width="20" />
            </Box>
          </Grid>

          {/* QUICK LINKS */}
          <Grid item xs={6} md={2}>
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
          </Grid>

          {/* FOR CUSTOMERS */}
          <Grid item xs={6} md={2}>
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
          </Grid>

          {/* FOR PROFESSIONALS */}
          <Grid item xs={6} md={2}>
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
          </Grid>

          {/* CONTACT */}
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>

            <Typography variant="body2" mb={1}>
              📞 +91 12345 67890
            </Typography>
            <Typography variant="body2" mb={1}>
              📧 support@servicebridge.com
            </Typography>
            <Typography variant="body2">
              📍 123, Green Street, New Delhi, India – 110001
            </Typography>
          </Grid>
        </Grid>
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
          © 2024 Service Bridge. All rights reserved.
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
