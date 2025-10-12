import { Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If user navigates directly, location.state may be undefined
  if (!location.state) {
    // Optionally redirect or show a message
    navigate("/", { replace: true });
    return null;
  }

  const { score, test } = location.state;

  return (
    <Box>
      <Typography variant="h4">Your Score</Typography>
      <Typography variant="h2">{score}</Typography>
      <Typography variant="h3">{test.course_title}</Typography>
      <Typography variant="body1">Total Questions: {test.total_questions}</Typography>
      <Typography variant="body1">Total Score: {test.total_score}</Typography>
    </Box>
  );
}
export default Score;
