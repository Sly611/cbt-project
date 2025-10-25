import { useEffect, useState, useRef } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Typography,
  Box,
} from "@mui/material";
import { formatDuration } from "../helpers/Format";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

const OngoingTestsTable = () => {
  const token = localStorage.getItem("accessToken");
  const [ongoingTests, setOngoingTests] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to your Django Channels WebSocket endpoint
    wsRef.current = new WebSocket(
      `wss://cbt-api-version0-1.onrender.com/ws/ongoing-tests/?token=${token}`
    );

    wsRef.current.onopen = () => {
      // Optionally, request initial data
      wsRef.current.send(JSON.stringify({ action: "get_ongoing_tests" }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.ongoing_tests) {
        setOngoingTests(data.ongoing_tests);
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      wsRef.current && wsRef.current.close();
    };
  }, []);

  return (
    <Paper sx={{ p: 2, borderRadius: 3, mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Ongoing Tests
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <SchoolRoundedIcon />
                  <strong>Test Name</strong>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <HourglassTopRoundedIcon />
                  <strong>Duration</strong>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <PeopleRoundedIcon />
                  <strong>Candidates</strong>
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <SpeedRoundedIcon />
                  <strong>Progress</strong>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ongoingTests.length > 0 ? (
              ongoingTests.map((test) => {
                const progress = test.candidates
                  ? Math.round((test.completed / test.candidates) * 100)
                  : 0;
                return (
                  <TableRow key={test.id}>
                    <TableCell>{test.name}</TableCell>
                    <TableCell align="center">
                      {formatDuration(test.duration)}
                    </TableCell>
                    <TableCell align="center">
                      {test.completed}/{test.candidates}
                    </TableCell>
                    <TableCell align="center" sx={{ width: 200 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{ flexGrow: 1, borderRadius: 5, height: 8 }}
                          color={
                            progress < 50
                              ? "warning"
                              : progress < 100
                              ? "info"
                              : "success"
                          }
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <Typography fontWeight={600} color="textSecondary" sx={{ my: 2 }}>
                No ongoing tests
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OngoingTestsTable;
