import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { getTitleCase } from "../helpers/Format";

const CandidateDetails = () => {
  const { loading, request } = useApi();
  const { candidate_id } = useParams();
  const [candidate, setCandidate] = useState(null);

  const getTest = async (test_id) => {
    const response = await request({
      auth: true,
      method: "GET",
      url: `/instructor/test/detail/${test_id}/`, // ✅ fixed
    });
    return response;
  };

  const getApr = async (tests) => {
    const testPromises = tests.map((t) => getTest(t.id));
    const results = await Promise.all(testPromises);

    const passed_tests = results.filter((test, i) => {
      const score_percent = (tests[i].score / test.total_score) * 100;
      return score_percent > 0;
    }).length;

    return (passed_tests / tests.length) * 100;
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      const response = await request({
        method: "GET",
        url: `/instructor/test/candidate/${candidate_id}/`, // Adjust backend route if needed
        auth: true,
      });
      if (response) setCandidate(response);
    };
    fetchCandidate();
  }, [candidate_id]);

  if (loading || !candidate) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 700,
        mt: 5,
        // mx: "auto",
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <CardContent>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 80, color: "primary.main" }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {getTitleCase(candidate.first_name)}{" "}
                {getTitleCase(candidate.last_name)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {candidate.email}
              </Typography>
              <Chip
                label={candidate.reg_number || "No Reg Number"}
                color="primary"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" color="text.secondary">
              Total Tests Taken
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {getApr(candidate.tests_detail) ?? 0}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Tests List Section */}
        <Typography variant="h6" sx={{ mb: 1 }}>
          Tests Taken
        </Typography>
        {candidate.tests_detail?.length > 0 ? (
          <List
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": {
                width: 6,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#b0b0b0",
                borderRadius: 10,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#888",
              },
            }}
          >
            {candidate.tests_detail.map((test) => (
              <ListItem
                key={test.id}
                sx={{
                  borderBottom: "1px solid #eee",
                  py: 1.2,
                  transition: "background 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
              >
                <ListItemIcon>
                  <AssignmentTurnedInIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {getTitleCase(test.title)}
                    </Typography>
                  }
                  secondary={`Score: ${test.score ?? "N/A"} | Date: ${new Date(
                    test.date
                  ).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No tests taken yet.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CandidateDetails;
