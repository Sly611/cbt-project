import {
  Box,
  Button,
  Typography,
  Chip,
  MenuItem,
  Menu,
  ListItemIcon,
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import {
  getTitleCase,
  formatDateTime,
  formatDuration,
} from "../helpers/Format";
import { useDispatch } from "react-redux";
import { alertSliceActions } from "../../../../store";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

const TestList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, request } = useApi();
  const [rows, setRows] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const fetchTests = async () => {
    const data = await request({
      method: "GET",
      url: "/instructor/tests/",
      auth: true,
    });
    if (data) {
      setRows(
        data.map((test) => ({
          id: test.id,
          course: getTitleCase(test.course_title),
          status: test.status,
          scheduled_start: formatDateTime(test.scheduled_start),
          durarion: formatDuration(test.duration),
          session_duration: formatDuration(test.session_duration),
          score: test.total_score,
        }))
      );
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleStartTest = async () => {
    const response = await request({
      method: "PATCH",
      url: "instructor/tests/bulk_action/",
      data: { ids: selectedRows, action: "start" },
      auth: true,
    });
    if (response && !response.error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: response?.message || "Test started successfully",
          severity: "success",
          duration: 3000,
        })
      );
      fetchTests();
    } else if (response && response.error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: response?.error || "Failed to start test",
          severity: "error",
          duration: 2500,
        })
      );
    }
    handleMenuClose();

    // Optionally refresh tests
  };

  const handleStopTest = async () => {
    const response = await request({
      method: "PATCH",
      url: "instructor/tests/bulk_action/",
      data: { ids: selectedRows, action: "stop" },
      auth: true,
    });
    if (response && !response.error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: response?.message || "Test stoped successfully",
          severity: "success",
          duration: 3000,
        })
      );
      fetchTests();
    } else if (response && response.error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: response?.error || "Failed to stop test",
          severity: "error",
          duration: 2500,
        })
      );
    }
    handleMenuClose();
    // Optionally refresh tests
  };

  const handleDeleteTest = async () => {
    try {
      const response = await request({
        method: "DELETE",
        url: "instructor/tests/bulk_action/",
        data: { ids: selectedRows },
        auth: true,
      });
      const success = !response || !response.error;

      if (success) {
        dispatch(
          alertSliceActions.setAlert({
            open: true,
            message:
              (response && response.message) || "Test deleted successfully",
            severity: "success",
            duration: 3000,
          })
        );
        fetchTests();
        handleMenuClose();
        return;
      }

      // explicit error object returned
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: response?.error || "Failed to delete test",
          severity: "error",
          duration: 2500,
        })
      );
      handleMenuClose();
    } catch (err) {
      // network / unexpected error
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: err?.message || "Failed to delete test",
          severity: "error",
          duration: 3000,
        })
      );
      handleMenuClose();
      // Optionally refresh tests
    }
  };

  const columns = [
    {
      field: "course",
      headerName: "Course",
      width: 200,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: false,

      renderCell: (params) => (
        <Chip
          label={params.value}
          color="success"
          size="small"
          variant="outlined"
        />
      ),
    },

    {
      field: "scheduled_start",
      headerName: "Start Date & Time",
      width: 200,
      sortable: false,
    },
    { field: "durarion", headerName: "Run time", width: 150, sortable: false },
    {
      field: "session_duration",
      headerName: "Duration",
      width: 150,
      sortable: false,
    },
    {
      field: "score",
      headerName: "Score",
      // width: 88,
      sortable: false,
    },
  ];

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <Box
      sx={{
        mt: 4,
        borderRadius: 3,
        backgroundColor: "background.paper",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          px: 2,
          py: 2.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="text.primary" fontWeight={600}>
          Tests
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* Action Dropdown */}
          <Button
            variant="outlined"
            size="small"
            endIcon={<MoreVertIcon />}
            onClick={handleMenuOpen}
            disabled={selectedRows.length === 0}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Actions
          </Button>

          <Menu
            id="test-actions-menu"
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            // PaperProps={{
            //   elevation: 3,
            //   sx: { borderRadius: 2, minWidth: 150 },
            // }}
          >
            <MenuItem onClick={handleStartTest}>
              <ListItemIcon>
                <PlayCircleOutlineRoundedIcon fontSize="small" color="info" />
              </ListItemIcon>
              <Typography variant="body2">Start Test</Typography>
            </MenuItem>
            <MenuItem onClick={handleStopTest}>
              <ListItemIcon>
                <StopCircleOutlinedIcon fontSize="small" color="warning" />
              </ListItemIcon>
              <Typography variant="body2">Stop Test</Typography>
            </MenuItem>
            <MenuItem onClick={handleDeleteTest} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <HighlightOffRoundedIcon fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2">Delete</Typography>
            </MenuItem>
          </Menu>

          {/* Add New */}
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("new")}
            disableElevation
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{
              borderRadius: 20,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Add New
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Box
        sx={{
          width: "100%",
          minHeight: "21rem",
          maxHeight: "32rem",
          px: 1,
        }}
      >
        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(newSelectionModel) => {
              // newSelectionModel = array of selected row IDs
              const ids = Array.from(newSelectionModel.ids);
              const selectedData = rows.filter((row) => ids.includes(row.id));
              setSelectedRows(selectedData.map((data) => data.id)); // store the selected row objects
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid",
                borderColor: "divider",
                fontWeight: 600,
                backgroundColor: "background.default",
              },
              "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                outline: "none !important",
              },
              "& .MuiDataGrid-columnHeaderCheckbox, & .MuiDataGrid-cellCheckbox":
                {
                  width: 40,
                },
              "& .MuiCheckbox-root": {
                padding: 0,
                transform: "scale(0.8)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TestList;
