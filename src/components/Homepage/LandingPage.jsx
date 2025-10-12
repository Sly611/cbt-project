import {
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  Divider,
  Avatar,
  Rating,
  Container,
} from "@mui/material";

import image from "../../assets/images/Edu.jpg";
import image1 from "../../assets/images/Cloud.jpg";
import image2 from "../../assets/images/College.jpg";
import image3 from "../../assets/images/exam.jpg";
import image4 from "../../assets/images/ideas.jpg";
import image5 from "../../assets/images/Online.jpg";
import image6 from "../../assets/images/Premium.jpg";
import image7 from "../../assets/images/server.jpg";
import image8 from "../../assets/images/Virtual.jpg";
import person1 from "../../assets/images/people/Sara.jpg";
import person2 from "../../assets/images/people/David.jpg";
import person3 from "../../assets/images/people/Linda.jpg";
import person4 from "../../assets/images/people/Hall.jpg";
import person5 from "../../assets/images/people/Eze.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Features from "./Features";
import NavBar from "./NavBar";
import Hero from "./Hero";
import { NextArrow, PrevArrow } from "./Features";
import Testimony from "./Testimony";
import Footer from "./Footer";

const people = [
  {
    img: person1,
    name: "Sarah O. – School Administrator",
    comment:
      "“Setting up and managing our tests has never been easier. The interface is intuitive, and our teachers love how seamless the workflow is. This tool saved us hours every week!”",
  },
  {
    img: person2,
    name: "David Muller – ICT Instructor",
    comment:
      "“I’ve used multiple CBT platforms in the past, but none come close to the reliability and simplicity of this one. It just works — and my students adapted quickly.”",
  },
  {
    img: person3,
    name: "Linda James – Training Consultant",
    comment:
      "“The dashboard insights blew me away. I could track student progress in real-time and make quick decisions based on performance metrics. Totally worth it!”",
  },
  {
    img: person4,
    name: "Kingsley Hall – Head of Exams, Zenith College",
    comment:
      "“From onboarding to going live, the experience was smooth. Their support team is responsive and actually listens to feedback. Highly recommend!”",
  },
  {
    img: person5,
    name: "Sam Eze – Final Year Student",
    comment:
      "“Honestly, I was nervous about online tests. But this platform felt natural. Everything loads fast, and I never once felt stuck or confused. Big win!”",
  },
];

const features = [
  {
    img: image1,
    title: "✅ Instant Setup",
    body: "No complex configurations, no tech jargon. Just sign up and get your workspace ready in under a minute — it’s that easy. Whether you’re a beginner or pro, onboarding feels effortless.",
  },
  {
    img: image2,
    title: "🧠 Smart Automation",
    body: "From repetitive tasks to advanced workflows, let automation take the wheel. You define the rules — we handle the logic behind the scenes, saving hours every day.",
  },
  {
    img: image3,
    title: "🧠 Smart Automation",
    body: "From repetitive tasks to advanced workflows, let automation take the wheel. You define the rules — we handle the logic behind the scenes, saving hours every day.",
  },
  {
    img: image4,
    title: "⚡ Lightning-Fast Performance",
    body: "Built with performance at its core. Whether you’re handling large datasets or multitasking across tabs, the system responds instantly — no lag, no delays.",
  },
  {
    img: image5,
    title: "🔒 Secure by Design",
    body: "End-to-end encryption, role-based permissions, and audit logs ensure your data is always protected. We adhere to the latest industry standards in security compliance.",
  },
  {
    img: image6,
    title: "📊 Actionable Analytics",
    body: "Get more than numbers. Track engagement, conversions, and behavioral trends with interactive dashboards that turn raw data into strategic decisions.",
  },
  {
    img: image7,
    title: "🌐 Anywhere, Anytime Access",
    body: "Your workspace, on your terms. Whether you’re on mobile, tablet, or desktop — everything syncs in real-time so you're never out of touch.",
  },
  {
    img: image8,
    title: "🔁 Automated Backups",
    body: "Peace of mind built-in. Your data is automatically backed up at regular intervals, and you can restore any version with just a few clicks.",
  },
];

const Landinpage = () => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 700,
    cssEase: "ease-in-out",
    dots: "true",
    arrow: "true",
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        // bgcolor: "#b7c0c9",
      }}
    >
      {/* ==========================  Navbar Section  ============================ */}
      <NavBar />
      {/* ==========================  Hero Section  ============================ */}
      <Container>

      <Hero />

      {/* ==========================  Feature Section  ============================ */}
      <Box
        sx={{
          position: "relative",
          mt: 5,
          px: 11,
          // overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            marginTop: 21,
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="primary">
            Krama is packed with awsome feature
          </Typography>
        </Box>
        <Box sx={{ position: "relative", width: "100%", mt: 5, px: "auto" }}>
          <Slider {...settings}>
            {features.map((feature, index) => (
              <Features
                key={index}
                image={feature.img}
                title={feature.title}
                description={feature.body}
              />
            ))}
          </Slider>
        </Box>
      </Box>
      {/* ==========================  Testimony Section  ============================ */}
      <Box
        sx={{
          position: "relative",
          mt: 3,
          // px: 11,
          // overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
          <Typography variant="h5" fontWeight={500} color="primary">
            Real feedback from our users
          </Typography>
        </Box>
        <Grid container gap={3}>
          {people.map((user, index) => (
            <Testimony
              key={index}
              image={user.img}
              name={user.name}
              comment={user.comment}
            />
          ))}
        </Grid>
      </Box>
      </Container>
      {/* ==========================  Footer Section  ============================ */}
      <Footer />
    </Box>
  );
};

export default Landinpage;
