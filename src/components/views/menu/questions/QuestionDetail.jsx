import {
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
  Tooltip,
  IconButton,
  Menu,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useSelector } from "react-redux";
import { getTitleCase } from "../helpers/Format";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import useApi from "../../../hooks/useApi";
import { useDispatch } from "react-redux";
import { alertSliceActions } from "../../../../store";
import { useNavigate } from "react-router-dom";


const QuestionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options_leters = ["A", "B", "C", "D", "E"];
  const {loading, request} = useApi();
  const question = useSelector((state) => state.questions);
  const [anchoreEl, setAnchoreEl] = useState(null);
  const open = anchoreEl;

  const handleMenuOpen = (event) => {
    setAnchoreEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchoreEl(null);
  };

  const questionDeleteHandler = async () => {
    try {
      const response = await request({
        auth: true,
        method: "DELETE",
        url: "instructor/tests/question/",
        data: { testId: question.questions.id },
      });
      if (response && !response.error) {
        dispatch(
          alertSliceActions.setAlert({
            open: true,
            message: response.message || "Questions uploaded successfully!",
            severity: "success",
            duration: 2500,
          })
        );
      }
    } catch (error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: "Questions uploaded successfully!",
          severity: "success",
          duration: 2500,
        })
      );
    } finally {
      handleMenuClose();
    }
  };

  return (
    <Box sx={{ display: "flex", width: "100%", mt: 5 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" my={1}>{`Test: ${getTitleCase(
            question.questions.course_title
          )}`}</Typography>
          <IconButton
            aria-label="more"
            id="more-button"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="more-button"
            open={open}
            anchorEl={anchoreEl}
            onClose={handleMenuClose}
            // slotProps={{ paper: { style: { width: "4rem" } } }}
          >
            <MenuItem onClick={() => navigate("/dashboard/questions/new")}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <Typography variant="body2">Edit</Typography>
            </MenuItem>
            <MenuItem onClick={questionDeleteHandler}>
              <ListItemIcon>
                <DeleteForeverRoundedIcon />
              </ListItemIcon>
              <Typography variant="body2">Delete</Typography>
            </MenuItem>
          </Menu>
        </Box>
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
