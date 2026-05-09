import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = [
  {
    title: "Choose a Service",
    desc: "Browse and select what you need.",
    img: "/images/services/booking.jpg",
  },
  {
    title: "Book Schedule",
    desc: "Pick a time slot easily.",
    img: "/images/services/confirm.jpg",
  },
  {
    title: "Get It Done",
    desc: "Professional completes the job.",
    img: "/images/services/relax.jpg",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Box textAlign="center" mb={4}>
          <Typography variant="subtitle2" color="green" fontWeight="bold">
            HOW IT WORKS
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Simple Steps to Get Your Service Done
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: 4,
            flexWrap: {
              xs: "wrap",
              md: "nowrap",
            },
          }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* CARD */}
              <Card
                sx={{
                  width: {
                    xs: "100%",
                    sm: 320,
                  },
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#fff",
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    width: "100%",
                    height: 220,
                  }}
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <CardContent
                  sx={{
                    textAlign: "center",
                    px: 4,
                    py: 4,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* STEP NUMBER */}
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: "50%",
                      backgroundColor: "#22c55e",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      margin: "0 auto 18px",
                    }}
                  >
                    0{index + 1}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={1.5}
                    color="#0f172a"
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.8,
                    }}
                  >
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>

              {/* ARROW */}
              {index !== steps.length - 1 && (
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 42,
                      color: "#22c55e",
                    }}
                  />
                </Box>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
