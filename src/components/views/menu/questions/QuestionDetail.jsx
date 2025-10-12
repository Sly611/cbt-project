import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  Paper,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useSelector } from "react-redux";
import { getTitleCase } from "../helpers/Format";
import { useState } from "react";

const QuestionDetail = () => {
  const options_leters = ["A", "B", "C", "D", "E"];
  const question = useSelector((state) => state.questions);
  const [ans, setAns] = useState("");

  return (
    <Box sx={{ display: "flex", width: "100%", mt: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" my={1}>{`Test: ${getTitleCase(
          question.questions.course_title
        )}`}</Typography>
        <Grid container spacing={3}>
          {question.questions.questions.map((q, index) => (
            <Grid size={{ sm: 12, md: 6 }}>
              <Box sx={{ P: 2 }}>
                <Chip
                  label={index + 1}
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
                <Tooltip title={q.text}>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    {q.text}
                  </Typography>
                </Tooltip>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    ml: 2,
                    mt: 1,
                    gap: 1,
                  }}
                >
                  {q.options.map((option, index) => (
                    <Box
                      key={option.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 0.5,
                        borderRadius: 2,
                        bgcolor: option.is_answer
                          ? "rgba(25, 118, 210, 0.08)"
                          : "transparent",
                      }}
                    >
                      {option.is_answer ? (
                        <CheckCircleOutlineRoundedIcon
                          fontSize="small"
                          color="info"
                        />
                      ) : (
                        <RadioButtonUncheckedOutlinedIcon
                          fontSize="small"
                          sx={{ color: "text.disabled" }}
                        />
                      )}
                      <Typography
                        variant={option.is_answer ? "body2" : "caption"}
                        color={option.is_answer ? "info.main" : "text.primary"}
                        fontWeight={option.is_answer ? 600 : 400}
                      >
                        {`${options_leters[index]}). ${option.text}`}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 1 }} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default QuestionDetail;
