import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import useApi from "../../hooks/useApi";
import SchoolIcon from "@mui/icons-material/School";
import DownloadIcon from "@mui/icons-material/Download";
import { getTitleCase } from "./helpers/Format";

const Result = () => {
  const { loading, request } = useApi();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await request({
        method: "GET",
        url: "instructor/test/result-list/",
        auth: true,
      });

      if (response && Array.isArray(response)) {
        setResults(response);
      }
    };
    fetchResults();
  }, []);

  // ✅ Convert test results to CSV and trigger download
  const handleExport = (testResult) => {
    const headers = ["First Name", "Last Name", "Reg No", "Email", "Score"];
    const rows = testResult.result.map((res) => [
      getTitleCase(res.student?.first_name) || "N/A",
      getTitleCase(res.student?.last_name) || "N/A",
      res.student?.reg_number?.toUpperCase() || "N/A",
      res.student?.email || "N/A",
      res.score || 0,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${testResult.course_title.replace(/\s+/g, "_")}_results.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Test Results
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
          <CircularProgress />
        </Box>
      ) : results.length === 0 ? (
        <Typography>No results found.</Typography>
      ) : (
        results.map((testResult) => (
          <Box key={testResult.id} sx={{ mb: 4 }}>
            {/* Header with Export Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <SchoolIcon color="primary" /> {testResult.course_title}
              </Typography>

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => handleExport(testResult)}
                size="small"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Export Results
              </Button>
            </Box>

            {/* Result Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>First Name</strong></TableCell>
                    <TableCell><strong>Last Name</strong></TableCell>
                    <TableCell><strong>Reg No</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Score</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testResult.result.map((res) => (
                    <TableRow key={res.id}>
                      <TableCell>
                        {getTitleCase(res.student?.first_name) || "N/A"}
                      </TableCell>
                      <TableCell>
                        {getTitleCase(res.student?.last_name) || "N/A"}
                      </TableCell>
                      <TableCell>
                        {res.student?.reg_number ? (
                          res.student.reg_number.toUpperCase()
                        ) : (
                          <Chip
                            label="N/A"
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>{res.student?.email || "N/A"}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${res.score}`}
                          color={res.score >= 0.5 * testResult.total_score ? "success" : "error"}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))
      )}
    </Box>
  );
};

export default Result;
