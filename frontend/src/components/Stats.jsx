import React from "react";
import { Box, Container, Typography } from "@mui/material";

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "500+", label: "Verified Professionals" },
  { value: "1K+", label: "Services Completed" },
  { value: "4.8★", label: "Average Rating" },
];

const Stats = () => {
  return (
    <Box sx={{ bgcolor: "#0B1C2C", py: 6 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            flexWrap: "wrap",
          }}
        >
          {stats.map((item, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 25%",
                py: 2,
                borderRight:
                  index !== stats.length - 1
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "none",
              }}
            >
              {/* Number */}
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff" }}>
                {item.value}
              </Typography>

              {/* Label */}
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;

