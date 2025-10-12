import { Typography, Grid, Box, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../../store";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import StatsCards from "./StatsCards";
import OngoingTestsTable from "./OngoingTests";
import UpcomingTestsTable from "./UpcomingTests";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import {
  getTitleCase,
  formatDateTime,
  formatDuration,
} from "../helpers/Format";

const Dashboard = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Dashboard"));
  const user = useSelector((state) => state.user.user);
  const { loading, request } = useApi();
  const [tests, setTests] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const getTotalTests = (tests) => {
    return tests.length;
  };

  const getActiveTests = (tests) => {
    const activeTests = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests[i].status === "ongoing") {
        activeTests.push(tests[i]);
      }
    }
    return activeTests;
  };
  const getCandidates = (students) => {
    return students.length;
  };
  const getTestsTaken = (tests) => {
    const finishedTests = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests[i].status === "finished") {
        finishedTests.push(tests[i]);
      }
    }
    return finishedTests.length;
  };

  const avgScore = 76;

  useEffect(() => {
    const getTests = async () => {
      const data = await request({
        method: "GET",
        url: "/instructor/tests/",
        auth: true,
      });
      if (data) {
        setTests(() =>
          data.map((test) => ({
            id: test.id,
            course: getTitleCase(test.course_title),
            status: test.status,
            scheduled_start: formatDateTime(test.scheduled_start),
            duration: formatDuration(test.duration),
          }))
        );
      }
    };
    const getCandidates = async () => {
      const data = await request({
        method: "GET",
        url: "/instructor/students/",
        auth: true,
      });
      if (data) {
        setCandidates(data);
      }
    };
    getTests();
    getCandidates();
  }, [setTests, setCandidates]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ paddingBottom: 3 }}>
        Good day, {user.username}
      </Typography>
      <StatsCards
        activeTests={getActiveTests(tests)}
        totalTests={getTotalTests(tests)}
        candidates={getCandidates(candidates)}
        testsTaken={getTestsTaken(tests)}
      />

      <OngoingTestsTable />
      <UpcomingTestsTable testData={tests} />
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h4">{activeTests}</Typography>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              Active Tests
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h4">{totalTests}</Typography>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              Total Tests
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h4">{candidates}</Typography>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              Registered Candidates
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Typography variant="h4">{testsTaken}</Typography>
            <Typography
              variant="subtitle2"
              fontWeight="bold"
              color="textSecondary"
            >
              Completed Tests
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Average Score</Typography>
          <Typography variant="h3">{avgScore}%</Typography>
        </Paper>
      </Box>
      {/* Add more sections for recent activity, upcoming tests, etc. */}
    </Box>
  );
};

export default Dashboard;
