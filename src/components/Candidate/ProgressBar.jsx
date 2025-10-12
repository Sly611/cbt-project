import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Box, Typography } from "@mui/material"
import "react-circular-progressbar/dist/styles.css";


const ProgressBar = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        height: "2.7rem",
        width: "2.7rem",
      }}
    >
      <CircularProgressbar
        variant="determinate"
        value={(props.questions / props.total) * 100}
        size={48}
        thickness={5}
        color="primary"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography variant="body2" component="div" fontWeight={600} color="textSecondary">
          {`${props.questions}/${props.total}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressBar;
