import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
  Tooltip,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useSelector } from "react-redux";
import { getTitleCase } from "../helpers/Format";

const CandidateList = () => {
  const { loading, request } = useApi();
  const [rows, setRows] = useState([]);
  const [copied, setCopied] = useState(false);
  const user = useSelector((state) => state.user.user);
  const link = `https://cbt-project-git-main-caesars-projects-86a6b2e0.vercel.app/${user.username}/tests/register`;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
          {params.value}
        </Link>
      ),
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      sortable: false,
    },

    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      sortable: false,
    },
    { field: "regNum", headerName: "Reg Num", width: 150, sortable: false },
    {
      field: "exams",
      headerName: "Exams taken",
      width: 100,
      sortable: false,
    },
  ];

  useEffect(() => {
    const getStudent = async () => {
      const response = await request({
        method: "GET",
        url: "/instructor/students/",
        auth: true,
      });
      if (response) {
        setRows(
          response.map((student) => ({
            id: student.id,
            email: student.email,
            first_name: getTitleCase(student.first_name),
            last_name: getTitleCase(student.last_name),
            regNum: student.reg_number || "N/A",
            exams: student.tests_detail.length ?? 0,
          }))
        );
      }
    };
    getStudent();
  }, []);

  return (
    <Box sx={{ mt: 5, display: "flex" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6">Students</Typography>
        </Grid>
        <Grid size={{ xs: 12 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid
              columns={columns}
              rows={rows}
              size="small"
              sx={{
                backgroundColor: "inherit",
                border: "none",
                maxWidth: { xs: "100%", sm: "100%", md: "80%" },
                "& .MuiDataGrid-columnHeaders": {
                  // backgroundColor: theme.palette.background.default,
                  borderBottom: "none !important",
                  fontWeight: 600,
                  height: "3rem",
                },

                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none",
                  },
                "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
                "& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox":
                  {
                    width: "40px !important",
                    maxWidth: "40px !important",
                    minWidth: "40px !important",
                    padding: 0,
                  },
                "& .MuiCheckbox-root": {
                  padding: 0,
                  transform: "scale(0.8)",
                },
              }}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: { xs: "100%", sm: "100%", md: "80%" },
            }}
          >
            {/* URL box with copy button */}
            <Typography variant="h6">Registration Link</Typography>
            <Paper
              variant="outlined"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  flex: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {link}
              </Typography>
              <Tooltip title="Copy link">
                <IconButton size="small" onClick={handleCopy}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Paper>

            {/* Description */}
            <Typography variant="subtitle2" color="text.secondary">
              Copy your custom instructor URL, and share it with your students.
              This link will enable candidates register for your tests.
            </Typography>
          </Box>

          {/* Feedback */}
          <Snackbar
            open={copied}
            autoHideDuration={2000}
            onClose={() => setCopied(false)}
            message="Link copied to clipboard"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateList;
