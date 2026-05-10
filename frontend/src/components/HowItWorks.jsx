import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const steps = [
  {
    title: "Choose a Service",
    desc: "Browse and select the service you need from verified professionals.",
    img: "/images/services/booking.jpg",
  },
  {
    title: "Book Your Schedule",
    desc: "Select your preferred date and time in just a few clicks.",
    img: "/images/services/confirm.jpg",
  },
  {
    title: "Relax & Get It Done",
    desc: "Our expert worker arrives on time and completes the task professionally.",
    img: "/images/services/relaxx.jpg",
  },
];

const HowItWorks = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(to bottom right, #f0fdf4, #ffffff, #f5f3ff)",
        fontFamily: "Poppins",
      }}
    >
      <Container maxWidth="xl">
        {/* HEADING */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            sx={{
              color: "#22c55e",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            HOW IT WORKS
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.2,
              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },

              maxWidth: "700px",
            }}
          >
            Simple Steps To Book
            <br />
            Your Home Service
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#6b7280",
              maxWidth: "650px",
              lineHeight: 1.8,
              fontSize: {
                xs: "0.95rem",
                md: "1rem",
              },
            }}
          >
            Service Bridge makes home services fast, secure, and effortless with
            trusted professionals.
          </Typography>
        </Box>

        {/* STEPS */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            gap: { xs: 4, md: 3, lg: 5 },
            flexWrap: {
              xs: "wrap",
              lg: "nowrap",
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
                    sm: 340,
                    md: 360,
                  },

                  borderRadius: "28px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",

                  border: "1px solid #f3f4f6",

                  transition: "all 0.35s ease",

                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 18px 40px rgba(34,197,94,0.15)",
                  },

                  backgroundColor: "#fff",
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    width: "100%",
                    height: {
                      xs: 250,
                      md: 260,
                    },
                    overflow: "hidden",
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
                      transition: "0.4s",
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <CardContent
                  sx={{
                    textAlign: "center",
                    px: { xs: 3, md: 4 },
                    py: { xs: 4, md: 5 },
                  }}
                >
                  {/* STEP NUMBER */}
                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      background: "linear-gradient(to right, #22c55e, #14b8a6)",

                      color: "#fff",

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      fontWeight: 700,
                      fontSize: "1rem",

                      margin: "0 auto 22px",

                      boxShadow: "0 10px 20px rgba(34,197,94,0.25)",
                    }}
                  >
                    0{index + 1}
                  </Box>

                  {/* TITLE */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      mb: 1.5,
                      fontSize: {
                        xs: "1.2rem",
                        md: "1.35rem",
                      },
                    }}
                  >
                    {step.title}
                  </Typography>

                  {/* DESC */}
                  <Typography
                    sx={{
                      color: "#6b7280",
                      lineHeight: 1.9,
                      fontSize: "0.95rem",
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
                      lg: "flex",
                    },

                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      fontSize: 44,
                      color: "#22c55e",

                      animation: "moveArrow 1.5s infinite ease-in-out",

                      "@keyframes moveArrow": {
                        "0%": {
                          transform: "translateX(0px)",
                        },

                        "50%": {
                          transform: "translateX(8px)",
                        },

                        "100%": {
                          transform: "translateX(0px)",
                        },
                      },
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
