import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        my: { xs: "3rem", md: "6rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        px: { xs: 2, sm: 5, md: "10%" },
        textAlign: "center",
      }}
    >
      <Typography
        color="primary"
        fontWeight={700}
        sx={{
          fontSize: {
            xs: "2rem",
            sm: "2.5rem",
            md: "3.2rem",
            lg: "3.8rem",
          },
          lineHeight: 1.2,
        }}
      >
        Smart Testing Made Simple With Krama
      </Typography>

      <Typography
        color="text.secondary"
        fontWeight={500}
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
            md: "1.25rem",
          },
          maxWidth: "800px",
          mb: { xs: 3, sm: 4 },
        }}
      >
        A modern cloud-based examination system built for institutions and
        individuals that value efficiency and accuracy. Create, manage, and
        analyze tests with ease, all from one intuitive dashboard.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disableElevation
          fullWidth={false}
          sx={{
            borderRadius: 0,
            height: "3rem",
            px: { sm: 6, md: 6 },
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            width: { xs: "100%", sm: "auto" },
          }}
          onClick={() => navigate("account")}
        >
          Get Started
        </Button>

        <Button
          variant="outlined"
          color="primary"
          endIcon={<ChevronRightIcon />}
          onClick={() => navigate("about")}
          sx={{
            borderRadius: 0,
            height: "3rem",
            px: { sm: 4, md: 4 },
            fontWeight: 600,
            fontSize: { xs: "0.9rem", sm: "1rem" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
