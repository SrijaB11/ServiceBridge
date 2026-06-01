import React, { useEffect, useState } from "react";
import api from "../api/axios";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";

import { Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/apprating/customerappreview", {
        params: {
          rating: 5,
        },
      });

      if (res.data.success) {
        const topReviews = (res.data.data || [])
          .filter((item) => Number(item.rating) === 5)
          .slice(0, 5);

        setReviews(topReviews);
      }
    } catch (error) {
      console.error("Reviews Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "#F9FAFB",
      }}
    >
      <Container maxWidth="lg">
        {/* Heading */}
        <Box textAlign="center" mb={{ xs: 5, md: 7 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "green",
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1,
            }}
          >
            TESTIMONIALS
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: "1.8rem",
                sm: "2.2rem",
                md: "2.8rem",
              },
              fontWeight: 700,
              color: "#111827",
            }}
          >
            What Our Customers Say
          </Typography>
        </Box>

        {reviews.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            style={{
              paddingBottom: "60px",
            }}
          >
            {reviews.map((item) => (
              <SwiperSlide key={item._id}>
                <Card
                  sx={{
                    borderRadius: "24px",
                    minHeight: {
                      xs: 280,
                      sm: 300,
                      md: 320,
                    },
                    height: "100%",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                    transition: "all 0.3s ease",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 14px 36px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    {/* Rating */}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={18}
                          fill="#facc15"
                          color="#facc15"
                        />
                      ))}
                    </Box>

                    {/* Review */}
                    <Typography
                      sx={{
                        color: "#4B5563",
                        lineHeight: 1.8,
                        flexGrow: 1,
                        mb: 3,
                        fontSize: {
                          xs: "0.9rem",
                          md: "0.95rem",
                        },
                      }}
                    >
                      "
                      {item.review?.trim()
                        ? item.review
                        : "Excellent service experience."}
                      "
                    </Typography>

                    {/* Customer */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar
                        src={item.customerId?.profileImage || ""}
                        alt={item.customerId?.fullName}
                        sx={{
                          width: 55,
                          height: 55,
                        }}
                      >
                        {item.customerId?.fullName?.charAt(0)}
                      </Avatar>

                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#111827",
                          }}
                        >
                          {item.customerId?.fullName || "Customer"}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6B7280",
                            display: "block",
                            mt: 0.5,
                          }}
                        >
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography textAlign="center" color="text.secondary">
            No 5-star reviews available.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Testimonials;
