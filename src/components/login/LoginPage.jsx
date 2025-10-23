import { Box, Typography } from "@mui/material";

import calender from "../../assets/images/Calendar.png";
import { Outlet } from "react-router-dom";

const LogingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
          },
          justifyContent: "center",
          bgcolor: "primary.main",
          height: "100vh",
          width: "55%",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1,
            px: 13,
          }}
        >
          <Box
            component="img"
            src={calender}
            sx={{ height: "auto", width: "21rem" }}
          />
          <Typography variant="h4" fontWeight="bold" color="#fff">
            Welcome to Your Testing Hub
          </Typography>
          <Typography variant="body2" fontWeight={500} color="#fff">
            Log in to create tests, track stutudent performance, and achieve
            success — one question at a time. Instructors can create and
            schedule tests, monitor student progress, and design questions with
            an intuitive, user-friendly interface.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          height: "100vh",
          width: { xs: "100%", sm: "100%", md: "45%" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default LogingPage;
