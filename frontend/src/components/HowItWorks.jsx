import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

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
        {/* Heading */}
        <Box textAlign="center" mb={4}>
          <Typography variant="subtitle2" color="green" fontWeight="bold">
            HOW IT WORKS
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            Simple Steps to Get Your Service Done
          </Typography>
        </Box>

        {/* Horizontal Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "nowrap", // keeps in one line
            overflowX: "auto", // enables scroll on small screens
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {steps.map((step, index) => (
            <Card key={index}>
              <CardContent sx={{ display: "flex" }}>
                {/* Image */}
                <Box mb={2} sx={{ height: "100px" }}>
                  <img
                    src={step.img}
                    alt={step.title}
                    width="100"
                    sx={{ height: "100%" }}
                  />
                </Box>

                {/* Title */}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                    {step.title}
                  </Typography>

                  {/* Description */}
                  <Typography variant="body2" color="text.secondary">
                    {step.desc}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
