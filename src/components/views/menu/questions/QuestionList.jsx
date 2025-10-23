import {
  Box,
  Button,
  Grid,
  Typography,
  List,
  ListItemButton,
  Chip,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { questionsSliceActions } from "../../../../store";



const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const { loading, request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const questionDetailHandler = (question) => {
    dispatch(questionsSliceActions.getQuestions(question));
    navigate("detail");
  };

  useEffect(() => {
    const getQuestions = async () => {
      const data = await request({
        method: "GET",
        url: "/instructor/test/questions/",
        auth: true,
      });
      if (data) {
        console.log(data);
        setQuestions(data);
      }
    };
    getQuestions();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 5 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Questions
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("new")}
          disableElevation
          startIcon={<AddCircleOutlineRoundedIcon />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            px: 2,
            py: 0.5,
          }}
        >
          <Typography variant="caption" fontWeight={500}>
            Add New
          </Typography>
        </Button>
      </Box>

      {/* Question Cards */}
      {questions.length === 0 && !loading ? (
        <Typography>No questions</Typography>
      ) : (
        <List disablePadding>
          <Grid container spacing={3}>
            {!loading &&
              questions.map((question) => (
                <Grid key={question.id} xs={12} md={6} xl={4}>
                  <ListItemButton
                    onClick={() => questionDetailHandler(question)}
                    sx={{
                      p: 0,
                      "&:hover .card": {
                        boxShadow: 3,
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <Box
                      className="card"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        p: 2,
                        border: "1px solid rgba(188, 188, 188, 0.4)",
                        borderRadius: 3,
                        transition: "0.2s ease",
                        gap: 1.2,
                        bgcolor: "background.paper",
                      }}
                    >
                      {/* Course Title */}

                      <Chip
                        label={`Test: ${question.course_title}`}
                        color="primary"
                        size="small"
                        sx={{ alignSelf: "flex-start" }}
                      />

                      {/* Question Text */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <QuizOutlinedIcon
                          sx={{ fontSize: "1.2rem", color: "text.secondary" }}
                        />
                        <Tooltip title={question.questions[0].text}>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            noWrap
                            sx={{ flexGrow: 1 }}
                          >
                            Q). {question.questions[0].text}
                          </Typography>
                        </Tooltip>
                      </Box>

                      {/* Options */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          ml: 3,
                          gap: 0.3,
                        }}
                      >
                        {question.questions[0].options.map((option) => (
                          <Box
                            key={option.id}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <RadioButtonUncheckedOutlinedIcon
                              sx={{
                                fontSize: "0.9rem",
                                color: "text.disabled",
                              }}
                            />
                            <Typography variant="caption">
                              {option.text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </ListItemButton>
                </Grid>
              ))}
          </Grid>
        </List>
      )}
    </Box>
  );
};

export default QuestionList;
