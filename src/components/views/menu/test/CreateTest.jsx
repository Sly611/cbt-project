import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import theme from "../../../../Theme";
import useInput from "../../../hooks/useInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, TimeField } from "./elements/DateTimeField";
import { alertSliceActions } from "../../../../store";
import { useDispatch } from "react-redux";

let courses = [];

const CreatTest = () => {
  const dispatch = useDispatch();
  const { request, loading } = useApi();
  const navigate = useNavigate();
  const [scheduled_startDate, setScheduled_startDate] = useState(null);
  const [scheduled_startTime, setScheduled_startTime] = useState(null);
  const [duration, setDuration] = useState("00:00:00");
  const [session_duration, setSessionDuration] = useState("00:00:00");

  const durationHandler = (event) => setDuration(event.target.value);
  const sessionDurationHandler = (event) =>
    setSessionDuration(event.target.value);

  const getScheduledStart = () => {
    if (!scheduled_startDate || !scheduled_startTime) return null;

    const combined = dayjs(scheduled_startDate)
      .hour(dayjs(scheduled_startTime).hour())
      .minute(dayjs(scheduled_startTime).minute());

    return combined.toISOString();
  };

  const [option, setOption] = useState("");
  const selectedCourse = option
    ? courses.find((course) => course.id === option)
    : {};

  const selectedCourseHandler = (event) => {
    setOption(event.target.value);
  };
  const {
    value: course_title,
    valueChangeHandler: course_titlevalueChangeHandler,
    resetInput: course_titleReset,
  } = useInput((value) => value.length > 0);

  const {
    value: description,
    valueChangeHandler: descriptionChangeHandler,
    resetInput: descriptionReset,
  } = useInput((value) => value);

  const {
    value: total_score,
    valueChangeHandler: total_scoreChangeHandler,
    resetInput: total_scoreReset,
  } = useInput((value) => value);

  const {
    value: total_questions,
    valueChangeHandler: total_questionsChangeHandler,
    resetInput: total_questionsReset,
  } = useInput((value) => value);

  const [show_score_on_submit, setShow_score_on_submit] = useState(false);

  const handleCheckbox = (event) => {
    setShow_score_on_submit(event.target.checked);
    const schedule = getScheduledStart();
  };

  const discardButtonHandler = () => {
    course_titleReset();
    descriptionReset();
    setScheduled_startDate("");
    setScheduled_startTime("");
    setDuration("00:00:00");
    setSessionDuration("00:00:00");
    total_questionsReset();
    total_scoreReset();
    setShow_score_on_submit(false);
  };

  const sendRequest = async (data) => {
    try {
      const response = await request({
        method: "POST",
        url: "/instructor/test/new/",
        data: data,
        auth: true,
      });
      console.log(response);
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: `Test "${course_title}" created successfully `,
          severity: "success",
          duration: 3000
        })
      );

      navigate("/dashboard/test");
    } catch (error) {
      console.error("error:", error);
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          
          message:
            error.response?.data?.detail ||
            "Something went wrong. Test creation failed  ",
          severity: "error",
          duration: 3000
        })
      );
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    let data = {
      course_title: course_title.toLowerCase(),
      description: description.toLowerCase(),
      scheduled_start: getScheduledStart(),
      duration: duration,
      session_duration: session_duration,
      total_score: Number(total_score),
      total_questions: Number(total_questions),
      show_score_on_submit,
    };
    sendRequest(data);
    course_titleReset();
    descriptionReset();
    setScheduled_startDate("");
    setScheduled_startTime("");
    setDuration("00:00:00");
    setSessionDuration("00:00:00");
    total_questionsReset();
    total_scoreReset();
    setShow_score_on_submit(false);
  };

  return (
    <Box sx={{ mt: 5, width: { xs: "100%", sm: "100%", md: "70%" } }}>

      <form onSubmit={formSubmitHandler}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            border: "1px solid rgba(188, 188, 188, 0)",
          }}
        >
          <CardContent>
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6">Create New Test</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: theme.palette.text.secondary, // grayish
                    // fontWeight: 500,
                    mb: 0.75, // small space below label
                    ml: 0.5,
                  }}
                >
                  Course Title
                </Typography>
                <TextField
                  type="text"
                  value={course_title}
                  onChange={course_titlevalueChangeHandler}
                  fullWidth
                  size="small"
                  sx={{
                    // backgroundColor: theme.palette.grey[200],
                    borderRadius: 2,
                    // "& fieldset": { border: "none" },
                    "& .MuiInputBase-root": {
                      boxShadow: "none",
                      height: "3rem",
                      px: 0.5,
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: theme.palette.text.secondary, // grayish
                    mb: 0.75, // small space below label
                    ml: 0.5,
                  }}
                >
                  Description
                  <Typography variant="caption" color="inherit" sx={{ px: 1 }}>
                    (optional)
                  </Typography>
                </Typography>
                <TextField
                  size="small"
                  type="text"
                  value={description}
                  onChange={descriptionChangeHandler}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    "& .MuiInputBase-root": {
                      boxShadow: "none",
                      height: "3rem",
                      px: 0.5,
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: theme.palette.text.secondary, // grayish
                    mb: 0.75, // small space below label
                    ml: 0.5,
                  }}
                >
                  Schedule Start
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      value={scheduled_startDate}
                      setValue={setScheduled_startDate}
                    />
                    <TimeField
                      value={scheduled_startTime}
                      setValue={setScheduled_startTime}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: theme.palette.text.secondary, // grayish
                      mb: 0.75, // small space below label
                      ml: 0.5,
                    }}
                  >
                    Duration
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={duration}
                    onChange={durationHandler}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        boxShadow: "none",
                        height: "3rem",
                        px: 2,
                      },
                    }}
                  />
                  <Typography variant="caption">
                    Set how long the test should run
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: theme.palette.text.secondary, // grayish
                      mb: 0.75, // small space below label
                      ml: 0.5,
                    }}
                  >
                    Session Duration
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    value={session_duration}
                    onChange={sessionDurationHandler}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        boxShadow: "none",
                        height: "3rem",
                        px: 2,
                      },
                    }}
                  />
                  <Typography variant="caption">
                    Set the duration for each candidate
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: theme.palette.text.secondary, // grayish
                      mb: 0.75, // small space below label
                      ml: 0.5,
                    }}
                  >
                    Total Score
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={total_score}
                    onChange={total_scoreChangeHandler}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        boxShadow: "none",
                        height: "3rem",
                      },
                    }}
                  />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{
                      color: theme.palette.text.secondary, // grayish
                      mb: 0.75, // small space below label
                      ml: 0.5,
                    }}
                  >
                    Total Questions
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={total_questions}
                    onChange={total_questionsChangeHandler}
                    sx={{
                      borderRadius: 2,
                      "& .MuiInputBase-root": {
                        boxShadow: "none",
                        height: "3rem",
                      },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={false}
                      onChange={handleCheckbox}
                      size="small"
                    />
                  }
                  label="Show score on submit"
                  sx={{ mt: 1 }}
                />
                <Typography variant="caption" fontStyle="italic">
                  This will display the result to each candidate on submition
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 5 }}>
                <Button
                  variant="outlined"
                  color="warning"
                  fullWidth
                  onClick={discardButtonHandler}
                  sx={{
                    align: "rigth",
                    textTransform: "none",
                    elevation: "none",
                  }}
                >
                  Discard Changes
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    align: "rigth",
                    textTransform: "none",
                    elevation: "none",
                  }}
                >
                  Create Test
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </form>
    </Box>
  );
};

export default CreatTest;
