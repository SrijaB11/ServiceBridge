import React from "react";
import { Box, Container, Typography, Card, CardContent } from "@mui/material";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

const testimonials = [
  {
    name: "Ravi Sharma",
    location: "New Delhi",
    review:
      "Service Bridge made it so easy to find a trusted professional. The service was excellent and on time!",
    img: "/images/ravi.jpg",
  },
  {
    name: "Priya Mehta",
    location: "Gurgaon",
    review:
      "Very professional and polite experts. Highly recommended for everyone looking for quality service.",
    img: "/images/priya.jpg",
  },
  {
    name: "Ankit Verma",
    location: "Noida",
    review:
      "Amazing platform with great support. Will definitely use again for my household needs.",
    img: "/images/ankit.jpg",
  },
];

const Testimonials = () => {
  return (
    <Box sx={{ py: 8, bgcolor: "#F9FAFB" }}>
      <Container>
        {/* Heading */}
        <Box textAlign="center" mb={5}>
          <Typography variant="subtitle2" color="green" fontWeight="bold">
            TESTIMONIALS
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            What Our Customers Say
          </Typography>
        </Box>

        {/* CAROUSEL */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  height: "100%",
                }}
              >
                <CardContent>
                  {/* Stars */}
                  <Box mb={2}>
                    <img src="/images/rating.jpg" alt="rating" width="100" />
                  </Box>

                  {/* Review */}
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    {item.review}
                  </Typography>

                  {/* User */}

                  <Box sx={{ display: "flex", marginLeft: "10px" }}>
                    <Box>
                      <img
                        src={item.img}
                        alt={item.name}
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                      />
                    </Box>
                    <Box>
                      <Typography fontWeight="bold" marginLeft={2}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.location}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonials;
