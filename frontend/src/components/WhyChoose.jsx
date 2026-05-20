import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 6, md: 10 },
        background:
          "linear-gradient(to bottom right, #f0fdf4, #ffffff, #f5f3ff)",
        fontFamily: "Poppins",
      }}
    >
      <Card
        sx={{
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
          backgroundColor: "#fff",
        }}
      >
        <Grid container>
          {/* LEFT SECTION */}
          <Grid item xs={12} md={5}>
            <CardActionArea sx={{ height: "100%" }}>
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
                      xs: 260,
                      sm: "100%",
                      md: 280,
                      lg: "100%",
                    },
                    objectFit: "cover",
                  }}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    p: { xs: 3, md: 5 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {/* TAG */}
                  <Typography
                    sx={{
                      color: "#22c55e",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      letterSpacing: 1.5,
                      mb: 1,
                    }}
                  >
                    WHY CHOOSE US
                  </Typography>

                  {/* TITLE */}
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.2,
                      mb: 2,
                      fontSize: {
                        xs: "2rem",
                        md: "2.6rem",
                      },
                    }}
                  >
                    We Go Beyond Expectations
                  </Typography>

                  {/* DESCRIPTION */}
                  <Typography
                    sx={{
                      color: "#6b7280",
                      lineHeight: 1.9,
                      mb: 4,
                      fontSize: {
                        xs: "0.95rem",
                        md: "1rem",
                      },
                    }}
                  >
                    We provide reliable, affordable, and professional home
                    services with verified experts and fast support.
                  </Typography>

                  {/* BUTTON */}
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/about")}
                    sx={{
                      width: "fit-content",
                      borderRadius: "14px",
                      px: 4,
                      py: 1.4,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      background: "linear-gradient(to right, #22c55e, #14b8a6)",
                      boxShadow: "none",

                      "&:hover": {
                        background:
                          "linear-gradient(to right, #16a34a, #0f766e)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 20px rgba(34,197,94,0.25)",
                      },

                      transition: "all 0.3s ease",
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
                      borderBottom: "1px solid #f3f4f6",
                      borderRight: {
                        xs: "none",
                        sm: index % 2 === 0 ? "1px solid #f3f4f6" : "none",
                      },
                      transition: "all 0.3s ease",

                      "&:hover": {
                        backgroundColor: "#f9fafb",
                      },
                    }}
                  >
                    <CardActionArea sx={{ height: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2.5,
                          p: 3.5,
                          minHeight: 200,
                        }}
                      >
                        {/* IMAGE */}
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.title}
                          sx={{
                            width: 90,
                            height: 90,
                            borderRadius: "18px",
                            objectFit: "cover",
                            flexShrink: 0,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                          }}
                        />

                        {/* CONTENT */}
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#111827",
                              mb: 1,
                              fontSize: "1.05rem",
                            }}
                          >
                            {item.title}
                          </Typography>

                          <Typography
                            sx={{
                              color: "#111113",
                              lineHeight: 1.8,
                              fontSize: "0.92rem",
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
