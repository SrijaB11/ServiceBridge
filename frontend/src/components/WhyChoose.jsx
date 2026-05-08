// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardActions from "@mui/material/CardActions";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// function WhyChoose() {
//   const features = [
//     {
//       title: "Trusted Professionals",
//       desc: "Verified and skilled experts for every service.",
//       image: "/images/verified.jpg",
//     },
//     {
//       title: "On-Time Service",
//       desc: "We respect your time and always stay punctual.",
//       image: "/images/time.jpg",
//     },
//     {
//       title: "Affordable Pricing",
//       desc: "Transparent pricing with no hidden charges.",
//       image: "/images/payment.jpg",
//     },
//     {
//       title: "24/7 Support",
//       desc: "Our support team is always available.",
//       image: "/images/customersupport.jpg",
//     },
//   ];
//   return (
//     <Card
//       sx={{
//         maxWidth: "100%",
//         height: 280,
//         display: "flex",
//         margin: "0 50px",
//         borderRadius: 5,
//       }}
//     >
//       <CardActionArea sx={{ display: "flex", width: "45%" }}>
//         <CardMedia
//           component="img"
//           image="/images/house.jpg"
//           alt="house"
//           sx={{ height: "100%", width: "50%" }}
//         />
//         <CardContent>
//           <Typography variant="overline" color="success.main">
//             WHY CHOOSE US
//           </Typography>

//           <Typography variant="h5" fontWeight="bold" mb={2}>
//             We Go Beyond Expectations
//           </Typography>

//           <Typography variant="body2" mb={3}>
//             We're committed to providing reliable, transparent, and high-quality
//             service every single time.
//           </Typography>

//           <Button variant="contained">Learn More</Button>
//         </CardContent>
//       </CardActionArea>
//       {/* Right-section */}

//       <Grid container sx={{ width: "50%" }}>
//         {features.map((item, index) => (
//           <Grid item xs={6} key={index}>
//             <Card
//               sx={{
//                 maxWidth: 345,
//                 display: "flex",
//                 height: "100%",
//               }}
//             >
//               <CardActionArea sx={{ display: "flex", alignItems: "stretch" }}>
//                 <CardMedia
//                   component="img"
//                   image={item.image}
//                   alt="green iguana"
//                   sx={{ width: 150, height: "auto" }}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="p" component="div">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "text.secondary" }}>
//                     {item.desc}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}{" "}
//       </Grid>
//     </Card>
//   );
// }

// export default WhyChoose;
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function WhyChoose() {
  const features = [
    {
      title: "Trusted Professionals",
      desc: "Verified and skilled experts for every service.",
      image: "/images/verified.jpg",
    },
    {
      title: "On-Time Service",
      desc: "We respect your time and always stay punctual.",
      image: "/images/time.jpg",
    },
    {
      title: "Affordable Pricing",
      desc: "Transparent pricing with no hidden charges.",
      image: "/images/payment.jpg",
    },
    {
      title: "24/7 Support",
      desc: "Our support team is always available.",
      image: "/images/customersupport.jpg",
    },
  ];

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 5, md: 8 },
      }}
    >
      <Card
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <Grid container>
          {/* LEFT SECTION */}
          <Grid item xs={12} md={5}>
            <CardActionArea
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "column",
                    lg: "row",
                  },
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  image="/images/house.jpg"
                  alt="house"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "40%",
                      md: "100%",
                      lg: "45%",
                    },
                    height: {
                      xs: 240,
                      sm: "100%",
                      md: 260,
                      lg: "100%",
                    },
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 4 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: "success.main",
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    WHY CHOOSE US
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={2}
                    sx={{
                      fontSize: {
                        xs: "1.8rem",
                        md: "2.2rem",
                      },
                    }}
                  >
                    We Go Beyond Expectations
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    mb={3}
                    sx={{
                      lineHeight: 1.8,
                    }}
                  >
                    We're committed to providing reliable, transparent, and
                    high-quality service every single time.
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      width: "fit-content",
                      borderRadius: 3,
                      px: 4,
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Box>
            </CardActionArea>
          </Grid>

          {/* RIGHT SECTION */}
          <Grid item xs={12} md={7}>
            <Grid container>
              {features.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 0,
                      borderBottom: "1px solid #eee",
                      borderRight: {
                        xs: "none",
                        sm: index % 2 === 0 ? "1px solid #eee" : "none",
                      },
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: 3,
                          minHeight: 180,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.title}
                          sx={{
                            width: 90,
                            height: 90,
                            borderRadius: 3,
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />

                        <Box>
                          <Typography variant="h6" fontWeight="bold" mb={1}>
                            {item.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              lineHeight: 1.7,
                            }}
                          >
                            {item.desc}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default WhyChoose;
