import {
  Typography,
  Box,
  Container,
  Divider,
} from "@mui/material";

import NavBar from "./NavBar";
import Hero from "./Hero";
import Footer from "./Footer";
import bg from "../../assets/images/background.svg";
import { Outlet } from "react-router-dom";



const Landinpage = () => {

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // or 'contain' / 'auto'
        backgroundPosition: "center",
      }}
    >
      {/* ==========================  Navbar Section  ============================ */}
      <NavBar />
      {/* ==========================  Hero Section  ============================ */}
      <Container disableGutters>
        {/* <Hero /> */}
        <Outlet />
      </Container>
      {/* ==========================  Footer Section  ============================ */}
      <Footer />
    </Box>
  );
};

export default Landinpage;
