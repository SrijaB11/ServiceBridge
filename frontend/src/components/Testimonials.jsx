// import React from "react";
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
//     <Box sx={{ py: 8, bgcolor: "#F9FAFB" }}>
//       <Container>
//         {/* Heading */}
//         <Box textAlign="center" mb={5}>
//           <Typography variant="subtitle2" color="green" fontWeight="bold">
//             TESTIMONIALS
//           </Typography>
//           <Typography variant="h4" fontWeight="bold">
//             What Our Customers Say
//           </Typography>
//         </Box>

//         {/* CAROUSEL */}
//         <Swiper
//           modules={[Navigation, Pagination]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           breakpoints={{
//             768: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {testimonials.map((item, index) => (
//             <SwiperSlide key={index}>
//               <Card
//                 sx={{
//                   borderRadius: "16px",
//                   boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//                   height: "100%",
//                 }}
//               >
//                 <CardContent>
//                   {/* Stars */}
//                   <Box mb={2}>
//                     <img src="/images/rating.jpg" alt="rating" width="100" />
//                   </Box>

//                   {/* Review */}
//                   <Typography variant="body2" color="text.secondary" mb={3}>
//                     {item.review}
//                   </Typography>

//                   {/* User */}

//                   <Box sx={{ display: "flex", marginLeft: "10px" }}>
//                     <Box>
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         width="40"
//                         height="40"
//                         style={{ borderRadius: "50%" }}
//                       />
//                     </Box>
//                     <Box>
//                       <Typography fontWeight="bold" marginLeft={2}>
//                         {item.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
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
              fontWeight: "bold",
              letterSpacing: 1.5,
              mb: 1,
            }}
          >
            TESTIMONIALS
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "2rem",
                md: "2.8rem",
              },
              color: "#111827",
            }}
          >
            What Our Customers Say
          </Typography>
        </Box>

        {/* CAROUSEL */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
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
            paddingInline: "5px",
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                  height: "100%",
                  minHeight: 320,
                  transition: "0.3s",
                  border: "1px solid #f1f5f9",
                  bgcolor: "#fff",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 3, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  {/* Stars */}
                  <Box mb={3}>
                    <img
                      src="/images/rating.jpg"
                      alt="rating"
                      width="110"
                      loading="lazy"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Review */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4B5563",
                      lineHeight: 1.9,
                      mb: 4,
                      flexGrow: 1,
                      fontSize: "0.96rem",
                    }}
                  >
                    “{item.review}”
                  </Typography>

                  {/* User */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: "auto",
                    }}
                  >
                    <Box>
                      <img
                        src={item.img}
                        alt={item.name}
                        width="55"
                        height="55"
                        loading="lazy"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "3px solid #dcfce7",
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        fontWeight="bold"
                        sx={{
                          color: "#111827",
                          fontSize: "1rem",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#6B7280",
                        }}
                      >
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
