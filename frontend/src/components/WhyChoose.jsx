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
// export default function WhyChoose() {
//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: (theme.vars ?? theme).palette.text.secondary,
//     ...theme.applyStyles("dark", {
//       backgroundColor: "#1A2027",
//     }),
//   }));

//   return (
//     <Card
//       sx={{
//         maxWidth: "100%",
//         height: 240,
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

//           {/* Button */}
//           <Button variant="contained">Learn More</Button>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//       </CardActions>
//       <Box sx={{ flexGrow: 2 }}>
//         <Grid container spacing={2}>
//           {Array.from(Array(4)).map((_, index) => (
//             <Grid size={6} key={index}>
//               <Card sx={{ height: "100%" }}>
//                 <Box sx={{ p: 2 }}>Item {index + 1}</Box>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Card>
//   );
// }

import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";

const features = [
  {
    title: "Trusted Professionals",
    desc: "Verified and skilled experts for every service.",
    icon: "/icons/trusted.png",
  },
  {
    title: "On-Time Service",
    desc: "We respect your time and always stay punctual.",
    icon: "/icons/time.png",
  },
  {
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges.",
    icon: "/icons/price.png",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always available.",
    icon: "/icons/support.png",
  },
];

export default function WhyChoose() {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Grid container spacing={6} alignItems="center">
          {/* LEFT IMAGE */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src="/images/house.jpg"
                alt="service"
                sx={{
                  width: "100%",
                  borderRadius: "20px",
                }}
              />

              {/* Small Floating Badge */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  bgcolor: "#fff",
                  px: 2,
                  py: 1,
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <Typography fontWeight="bold">10+ Years Experience</Typography>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT CONTENT */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{ color: "green", fontWeight: "bold" }}
            >
              WHY CHOOSE US
            </Typography>

            <Typography variant="h4" fontWeight="bold" mb={2}>
              We Deliver Quality Services with Trust
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={4}>
              Our platform connects you with experienced professionals to ensure
              high-quality service, transparency, and satisfaction every time.
            </Typography>

            {/* FEATURES LIST */}
            <Box>
              {features.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  {/* Icon */}
                  <Box
                    component="img"
                    src={item.icon}
                    alt={item.title}
                    sx={{ width: 40 }}
                  />

                  {/* Text */}
                  <Box>
                    <Typography fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Button
              variant="contained"
              sx={{ mt: 2, borderRadius: "25px", px: 4 }}
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
