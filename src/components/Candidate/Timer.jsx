import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Box } from "@mui/material";
import { useRef } from "react";
import "react-circular-progressbar/dist/styles.css";

const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Timer = ({ duration, onTimeUp, socket }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timeLeftRef = useRef(timeLeft);

  // Keep ref updated
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // 1-second countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // 10-second backend update (interval is stable)
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const elapsed = duration - timeLeftRef.current;
      if (socket.current?.readyState === 1) {
        socket.current.send(
          JSON.stringify({
            action: "update_time",
            elapsed_time: elapsed, // seconds
          })
        );
        console.log("time_updated");
      }
    }, 10000);
    return () => clearInterval(updateInterval);
  }, [duration, socket]); // <-- only run once

  return (
    <Box sx={{ width: "5.5rem", height: "5.5rem" }}>
      <CircularProgressbar
        value={(timeLeft / duration) * 100}
        text={formatTime(timeLeft)}
        thickness={11}
        styles={buildStyles({
          textColor: "#000",
          // fontSize: "1.7rem",
          pathColor: timeLeft < 60 ? "red" : "#1976d2",
          trailColor: "#ddd",
          fontWeight: "bold",
        })}
      />
      {/* <Typography variant="h4" color="textSecondary">{formatTime(timeLeft)}</Typography> */}
    </Box>
  );
};

export default Timer;
