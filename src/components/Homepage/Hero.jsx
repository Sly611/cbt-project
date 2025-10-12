import { Container, Typography, Box, Button } from "@mui/material";
import image from "../../assets/images/Edu.jpg";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { Link } from "react-router-dom";
// import image from "../../assets/images/Premium.jpg"

const Hero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100%",
        width: "100%",
        marginTop: "3rem",
        gap:2
        // px: "auto",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          fontWeight={700}
          mb={2}
          textAlign="center"
        >
          Smart Testing Made Simple With Krama
        </Typography>
        <Typography variant="h6" mb={4} textAlign="center">
          Easily create, manage, and deliver exams through a secure, cloud-based
          platform. Designed for speed and simplicity, our system lets you build
          tests, monitor performance, and access results instantly, all in one
          place.
        </Typography>
        <Link to="/account">
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "fit-content",
              px: 5,
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Get started free
            <ArrowRightAltRoundedIcon
              color="inherit"
              fontSize="small"
              sx={{ mt: "3px" }}
            />
          </Button>
        </Link>
      </Box>
      <Box
        component="img"
        src={image}
        alt="CBT Illustration"
        sx={{
          // paddingRight: 5,
          maxWidth: "32rem", // adjust based on how big you want it
          height: "auto", // keeps image in correct aspect ratio
          objectFit: "contain", // ensures full image fits inside the box
          zIndex: 2,
          // opacity: "70%",
        }}
      />
    </Box>
  );
};

export default Hero;
