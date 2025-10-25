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
        Hello, {getTitleCase(user.first_name)}
      </Typography>
      <StatsCards
        activeTests={getActiveTests(tests)}
        totalTests={getTotalTests(tests)}
        candidates={getCandidates(candidates)}
        testsTaken={getTestsTaken(tests)}
      />

      <OngoingTestsTable />
      <UpcomingTestsTable testData={tests} />
    </Box>
  );
};

export default Dashboard;
