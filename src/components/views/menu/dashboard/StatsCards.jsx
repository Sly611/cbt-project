import { Grid, Paper, Typography, Box } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import GroupsIcon from "@mui/icons-material/Groups";
import DoneAllIcon from "@mui/icons-material/DoneAll";

export default function StatsCards({
  activeTests,
  totalTests,
  candidates,
  testsTaken,
}) {
  const stats = [
    {
      label: "Active Tests",
      value: activeTests.length,
      icon: <AssignmentTurnedInIcon fontSize="large" />,
      color: "#1976d2", // blue
      bg: "#E3F2FD",
    },
    {
      label: "Total Tests",
      value: totalTests,
      icon: <PlaylistAddCheckIcon fontSize="large" />,
      color: "#9C27B0", // purple
      bg: "#F3E5F5",
    },
    {
      label: "Completed Tests",
      value: testsTaken,
      icon: <DoneAllIcon fontSize="large" />,
      color: "#EF6C00", // orange
      bg: "#FFF3E0",
    },
    {
      label: "Registered Candidates",
      value: candidates,
      icon: <GroupsIcon fontSize="large" />,
      color: "#2E7D32", // green
      bg: "#E8F5E9",
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((item, index) => (
        <Grid size={{ xs: 6, sm: 6, md: 3 }} key={index}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: item.bg,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: "50%",
                backgroundColor: item.color,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </Box>
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: item.color }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
              >
                {item.label}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
