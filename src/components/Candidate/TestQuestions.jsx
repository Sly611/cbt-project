import {
  Container,
  Box,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import Timer from "./Timer";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { getTitleCase } from "../views/menu/helpers/Format";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "./ProgressBar";
import { IconButton, Popover } from "@mui/material";
import { useState } from "react";
import Calculator from "../../calculator/Calculator";

function parseDuration(durationStr) {
  // durationStr format: "HH:MM:SS"
  const [hours, minutes, seconds] = durationStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const get_timeLeft = (duration, time) => {
  return parseDuration(duration) - parseDuration(time);
};

const TestQuestions = (props) => {
  const optionIndex = ["A", "B", "c", "D", "F"];
  const timerDuration = props.time
    ? get_timeLeft(props.duration, props.time)
    : parseDuration(props.duration);

  const selectedProgress =
    props.progress && props.progress.length > 0
      ? props.progress.find((p) => p.question === props.question.id)
      : null;

  const selectedValue =
    selectedProgress && selectedProgress.choice
      ? selectedProgress.choice.id
      : null;
  const answered_questions = props.progress.length;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleCalculatorOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCalculatorClose = () => {
    setAnchorEl(null);
  };

  const calculatorOpen = Boolean(anchorEl);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            {getTitleCase(props.course)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Question {props.currentQuestion + 1} of {props.total_questions}
          </Typography>
        </Box>
        <Timer
          duration={timerDuration}
          onTimeUp={props.onTimeUp}
          socket={props.socket}
        />
      </Box>

      {/* Progress + Submit */}
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          mb: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <ProgressBar
          questions={answered_questions}
          total={props.total_questions}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={handleCalculatorOpen}
            sx={{
              bgcolor: "aliceblue",
            }}
          >
            <CalculateOutlinedIcon fontSize="large" color="info" />
          </IconButton>

          <Button
            variant="contained"
            color="success"
            onClick={props.onSubmit}
            disableElevation
          >
            Submit Test
          </Button>
        </Box>
      </Paper>

      {/* Question Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 600,
              width: "1.5rem",
              height: "1.5rem",
              fontSize: "1rem",
            }}
          >
            {props.currentQuestion + 1}
          </Avatar>
          <Typography variant="h6">{props.question.text}</Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <FormControl sx={{ pl: 6 }}>
          <RadioGroup
            name={`question-${props.question.id}`}
            value={selectedValue}
            onChange={(event) => props.selectHandler(event)}
          >
            {props.choices.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.id}
                control={<Radio />}
                label={`${optionIndex[index]}). ${option.text}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>

      {/* Navigation */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<ArrowBackIosNewRoundedIcon />}
          onClick={() => props.nav("prev")}
        >
          Previous
        </Button>
        <Button
          size="small"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIosRoundedIcon />}
          onClick={() => props.nav("next")}
        >
          Next
        </Button>
      </Box>
      <Popover
        open={calculatorOpen}
        anchorEl={anchorEl}
        onClose={handleCalculatorClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            borderRadius: 5,
            bgcolor: "#1f1f1f",
          },
        }}
      >
        <Calculator />
      </Popover>
    </Container>
  );
};

export default TestQuestions;
