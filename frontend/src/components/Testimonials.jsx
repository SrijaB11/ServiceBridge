// import React from "react";
// import { useState, useEffect } from "react";
// import { Box, Container, Typography, Card, CardContent } from "@mui/material";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import { Navigation, Pagination } from "swiper/modules";

// const testimonials = [
//   {
//     name: "Ravi Sharma",
//     location: "New Delhi",
//     review:
//       "Service Bridge made it so easy to find a trusted professional. The service was excellent and on time!",
//     img: "/images/ravi.jpg",
//   },
//   {
//     name: "Priya Mehta",
//     location: "Gurgaon",
//     review:
//       "Very professional and polite experts. Highly recommended for everyone looking for quality service.",
//     img: "/images/priya.jpg",
//   },
//   {
//     name: "Ankit Verma",
//     location: "Noida",
//     review:
//       "Amazing platform with great support. Will definitely use again for my household needs.",
//     img: "/images/ankit.jpg",
//   },
// ];

// const Testimonials = () => {
//   return (
//     <Box
//       sx={{
//         py: { xs: 6, md: 10 },
//         bgcolor: "#F9FAFB",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Heading */}
//         <Box textAlign="center" mb={{ xs: 5, md: 7 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{
//               color: "green",
//               fontWeight: "bold",
//               letterSpacing: 1.5,
//               mb: 1,
//             }}
//           >
//             TESTIMONIALS
//           </Typography>

//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             sx={{
//               fontSize: {
//                 xs: "2rem",
//                 md: "2.8rem",
//               },
//               color: "#111827",
//             }}
//           >
//             What Our Customers Say
//           </Typography>
//         </Box>

//         {/* CAROUSEL */}
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={25}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: {
//               slidesPerView: 1,
//             },
//             768: {
//               slidesPerView: 2,
//             },
//             1200: {
//               slidesPerView: 3,
//             },
//           }}
//           style={{
//             paddingBottom: "50px",
//             paddingInline: "5px",
//           }}
//         >
//           {testimonials.map((item, index) => (
//             <SwiperSlide key={index}>
//               <Card
//                 sx={{
//                   borderRadius: "24px",
//                   boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
//                   height: "100%",
//                   minHeight: 320,
//                   transition: "0.3s",
//                   border: "1px solid #f1f5f9",
//                   bgcolor: "#fff",
//                   "&:hover": {
//                     transform: "translateY(-6px)",
//                     boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
//                   },
//                 }}
//               >
//                 <CardContent
//                   sx={{
//                     p: { xs: 3, md: 4 },
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     height: "100%",
//                   }}
//                 >
//                   {/* Stars */}
//                   <Box mb={3}>
//                     <img
//                       src="/images/rating.jpg"
//                       alt="rating"
//                       width="110"
//                       loading="lazy"
//                       style={{
//                         objectFit: "contain",
//                       }}
//                     />
//                   </Box>

//                   {/* Review */}
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: "#4B5563",
//                       lineHeight: 1.9,
//                       mb: 4,
//                       flexGrow: 1,
//                       fontSize: "0.96rem",
//                     }}
//                   >
//                     “{item.review}”
//                   </Typography>

//                   {/* User */}
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 2,
//                       mt: "auto",
//                     }}
//                   >
//                     <Box>
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         width="55"
//                         height="55"
//                         loading="lazy"
//                         style={{
//                           borderRadius: "50%",
//                           objectFit: "cover",
//                           border: "3px solid #dcfce7",
//                         }}
//                       />
//                     </Box>

//                     <Box>
//                       <Typography
//                         fontWeight="bold"
//                         sx={{
//                           color: "#111827",
//                           fontSize: "1rem",
//                         }}
//                       >
//                         {item.name}
//                       </Typography>

//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "#6B7280",
//                         }}
//                       >
//                         {item.location}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </Container>
//     </Box>
//   );
// };

// export default Testimonials;
// // const API_BASE = import.meta.env.VITE_API_BASE_URL;

// // const Testimonials = () => {
// //   const [reviews, setReviews] = useState([]);

// //   useEffect(() => {
// //     fetchReviews();
// //   }, []);

// //   const fetchReviews = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/apprating`);

// //       if (res.data.success) {
// //         setReviews(res.data.data);
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         py: { xs: 6, md: 10 },
// //         bgcolor: "#F9FAFB",
// //       }}
// //     >
// //       <Container maxWidth="lg">
// //         <Box textAlign="center" mb={6}>
// //           <Typography
// //             variant="subtitle2"
// //             sx={{
// //               color: "green",
// //               fontWeight: "bold",
// //               letterSpacing: 1.5,
// //             }}
// //           >
// //             TESTIMONIALS
// //           </Typography>

// //           <Typography variant="h4" fontWeight="bold">
// //             What Our Customers Say
// //           </Typography>
// //         </Box>

// //         <Swiper
// //           modules={[Navigation, Pagination]}
// //           navigation
// //           pagination={{ clickable: true }}
// //           spaceBetween={25}
// //           slidesPerView={1}
// //           breakpoints={{
// //             768: {
// //               slidesPerView: 2,
// //             },
// //             1200: {
// //               slidesPerView: 3,
// //             },
// //           }}
// //         >
// //           {reviews.map((item) => (
// //             <SwiperSlide key={item._id}>
// //               <Card
// //                 sx={{
// //                   borderRadius: "24px",
// //                   minHeight: 320,
// //                   boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
// //                   transition: "0.3s",

// //                   "&:hover": {
// //                     transform: "translateY(-6px)",
// //                     boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
// //                   },
// //                 }}
// //               >
// //                 <CardContent
// //                   sx={{
// //                     p: 4,
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     height: "100%",
// //                   }}
// //                 >
// //                   {/* Rating Stars */}
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       gap: 0.5,
// //                       mb: 3,
// //                     }}
// //                   >
// //                     {[...Array(5)].map((_, index) => (
// //                       <Star
// //                         key={index}
// //                         size={18}
// //                         fill={
// //                           index < Math.round(item.rating) ? "#facc15" : "none"
// //                         }
// //                         color="#facc15"
// //                       />
// //                     ))}
// //                   </Box>

// //                   {/* Review */}
// //                   <Typography
// //                     sx={{
// //                       color: "#4B5563",
// //                       lineHeight: 1.8,
// //                       mb: 4,
// //                       flexGrow: 1,
// //                     }}
// //                   >
// //                     "{item.review || "Excellent service experience."}"
// //                   </Typography>

// //                   {/* Customer */}
// //                   <Box
// //                     sx={{
// //                       display: "flex",
// //                       alignItems: "center",
// //                       gap: 2,
// //                     }}
// //                   >
// //                     <Avatar
// //                       src={item.customerId?.profileImage}
// //                       sx={{
// //                         width: 55,
// //                         height: 55,
// //                       }}
// //                     />

// //                     <Box>
// //                       <Typography fontWeight="bold">
// //                         {item.customerId?.fullName}
// //                       </Typography>

// //                       <Typography variant="body2" color="text.secondary">
// //                         {item.customerId?.location || "India"}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                 </CardContent>
// //               </Card>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Testimonials;
import React, { useEffect, useState } from "react";
import axios from "axios";

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

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/apprating/customerappreview`, {
        params: {
          rating: 4, // optional filter
        },
      });

      if (res.data.success) {
        setReviews(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
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
            }}
          >
            What Our Customers Say
          </Typography>
        </Box>

        {/* Reviews Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
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
            paddingBottom: "50px",
          }}
        >
          {reviews.map((item) => (
            <SwiperSlide key={item._id}>
              <Card
                sx={{
                  borderRadius: "24px",
                  minHeight: 320,
                  height: "100%",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                  transition: "0.3s",

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
                      mb: 3,
                    }}
                  >
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={18}
                        fill={
                          index < Number(item.rating)
                            ? "#facc15"
                            : "transparent"
                        }
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
                      mb: 4,
                      fontSize: "0.95rem",
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
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                        }}
                      >
                        {item.customerId?.email}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {reviews.length === 0 && (
          <Typography textAlign="center" color="text.secondary">
            No reviews available.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Testimonials;
