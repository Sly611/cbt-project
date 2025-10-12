import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";

import {
  getTitleCase,
  formatDateTime,
  formatDuration,
} from "../helpers/Format";

const UpcomingTestsTable = (props) => {
  const upcoming = props.testData.filter((test) => test.status === "scheduled");

  return (
    <Paper sx={{ p: 2, borderRadius: 3, mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Upcoming Tests
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <SchoolRoundedIcon />
                  <strong>Test</strong>
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
                  <EventRoundedIcon />
                  <strong>Schedule</strong>
                </Box>
              </TableCell>
              {/* <TableCell align="center"><strong>Candidates</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {upcoming.length > 0 ? (
              upcoming.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>{test.course}</TableCell>
                  <TableCell align="center">{test.duration}</TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={<CalendarMonthIcon />}
                      label={test.scheduled_start.split(",")[0]}
                      sx={{ mr: 1 }}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={test.scheduled_start.split(",")[1]}
                      color="secondary"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Typography fontWeight={600} color="textSecondary" sx={{ my: 2 }}>
                No upcoming tests
              </Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UpcomingTestsTable;
