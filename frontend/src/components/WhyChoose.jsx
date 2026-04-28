import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
export default function WhyChoose() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
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
    <Card
      sx={{
        maxWidth: "100%",
        height: 280,
        display: "flex",
        margin: "0 50px",
        borderRadius: 5,
      }}
    >
      <CardActionArea sx={{ display: "flex", width: "45%" }}>
        <CardMedia
          component="img"
          image="/images/house.jpg"
          alt="house"
          sx={{ height: "100%", width: "50%" }}
        />
        <CardContent>
          <Typography variant="overline" color="success.main">
            WHY CHOOSE US
          </Typography>

          <Typography variant="h5" fontWeight="bold" mb={2}>
            We Go Beyond Expectations
          </Typography>

          <Typography variant="body2" mb={3}>
            We're committed to providing reliable, transparent, and high-quality
            service every single time.
          </Typography>

          {/* Button */}
          <Button variant="contained">Learn More</Button>
        </CardContent>
      </CardActionArea>
      {/* Right-section */}

      <Grid container sx={{ width: "50%" }}>
        {features.map((item, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                maxWidth: 345,
                display: "flex",
                height: "100%",
              }}
            >
              <CardActionArea sx={{ display: "flex", alignItems: "stretch" }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="green iguana"
                  sx={{ width: 150, height: "auto" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="p" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}{" "}
      </Grid>
    </Card>
  );
}
