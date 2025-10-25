
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import {
  getTitleCase,
  formatDuration,
  formatDateTime,
} from "../views/menu/helpers/Format";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

const TestData = (props) => {
  const startTest = () => {
    props.startTestHandler();
  };

  return (
    <Container maxWidth="md" sx={{ my: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          p: 2,
          border: "1px solid rgba(188, 188, 188, 0.55)",
          borderRadius: 5,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
            {getTitleCase(props.course_title)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {props.description}
          </Typography>
        </Box>
        <Divider />
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Test Details
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid container direction="column">
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <TodayRoundedIcon color="primary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Schedule"
                secondary={formatDateTime(props.scheduled_start)}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <AccessTimeRoundedIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Duration"
                secondary={formatDuration(props.duration)}
              />
            </ListItem>
          </Grid>
          <Grid container direction="column">
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <HelpOutlineRoundedIcon color="info" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Total Questions"
                secondary={props.total_questions}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <AvTimerRoundedIcon color="warning" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Time Allowed"
                secondary={formatDuration(props.session_duration)}
              />
            </ListItem>
          </Grid>
          <Grid container direction="column">
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <WorkspacePremiumRoundedIcon color="success" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Total Points"
                secondary={props.total_score}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: "aliceblue" }}>
                  <StarsRoundedIcon color="secondary" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary="Result"
                secondary={
                  props.show_score_on_submit
                    ? "Your score will be shown immediately after submission."
                    : "Your score will be released later by the admin."
                }
              />
            </ListItem>
          </Grid>
        </Grid>
        <Typography variant="h6" fontWeight={600} textAlign="center">
          General Guidelines
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordRoundedIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="Read each question carefully before answering." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordRoundedIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="You cannot pause once the test begins." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordRoundedIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="Your progress will be saved automatically." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FiberManualRecordRoundedIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText primary="Do not refresh/close the browser during the exam." />
          </ListItem>
        </List>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Button
            disableElevation
            variant="contained"
            color={props.button === "Start" ? "primary":"warning"}
            onClick={startTest}
            sx={{ borderRadius: 2 }}
          >
            {props.button} Test
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TestData;
