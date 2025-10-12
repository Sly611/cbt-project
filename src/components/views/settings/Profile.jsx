import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Chip,
  Divider,
  TextField,
  Skeleton,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../store";
import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { formatDateTime, getTitleCase } from "../menu/helpers/Format";
import { alertSliceActions } from "../../../store";
import theme from "../../../Theme";


const getInitials = (firstName, lastName) => {
  const first = firstName ? firstName[0].toUpperCase() : "";
  const last = lastName ? lastName[0].toUpperCase() : "";
  return first + last;
};

const Profile = () => {
  const dispatch = useDispatch();
  dispatch(pageTitleActions.setTitle("Profile"));
  const [instructorData, setInstructorData] = useState({});
  const { loading, request } = useApi();
  const [editForm, setEditForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const usernameChangeHandler = (event) => {
    setUpdatedData({ ...updatedData, username: event.target.value });
  };
  const emailChangeHandler = (event) => {
    setUpdatedData({ ...updatedData, email: event.target.value });
  };
  const firstNameChangeHandler = (event) => {
    setUpdatedData({ ...updatedData, first_name: event.target.value });
  };
  const lastNameChangeHandler = (event) => {
    setUpdatedData({ ...updatedData, last_name: event.target.value });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await request({
        url: "/instructor/profile/",
        auth: true,
      });
      if (response) {
        setInstructorData({
          id: response.id,
          username: response.username,
          email: response.email,
          firstName: getTitleCase(response.first_name),
          lastName: getTitleCase(response.last_name),
          data_joined: formatDateTime(response.date_joined).split(",")[0],
        });
        setUpdatedData({
          id: response.id,
          username: response.username,
          email: response.email,
          first_name: response.first_name,
          last_name: response.last_name,
        });
        console.log(response);
      }
    };
    getData();
  }, []);

  const updateProfile = async (updated_data) => {
    try {
      await request({
        method: "PATCH",
        url: `/instructor/profile/edit/${updatedData.id}/`,
        data: updated_data,
        auth: true,
      });
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: "Profile updated successfully",
          severity: "success",
          duration: 3000,
        })
      );
    } catch (error) {
      console.error("error:", error);
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message:
            error.response?.data?.error ||
            "Something went wrong. Profile update failed",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    updateProfile(updatedData);
    setEditForm(false);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 5,
        p: 3,
        borderRadius: 4,
        border: "1px solid rgba(188,188,188,0.25)",
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {/* ================= Left Section ================= */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          flex: 1,
          minWidth: { xs: "100%", md: "45%" },
        }}
      >
        {/* Instructor Header */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {loading ? (
              <Skeleton variant="circular" width={80} height={80} />
            ) : (
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: theme.palette.primary.main,
                  fontSize: "1.8rem",
                }}
              >
                {getInitials(instructorData.firstName, instructorData.lastName)}
              </Avatar>
            )}
          </Grid>
          <Grid item xs>
            {loading ? (
              <>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight={600}>
                  {getTitleCase(instructorData.firstName)}{" "}
                  {getTitleCase(instructorData.lastName)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instructor
                </Typography>
                <Chip
                  label={`Joined: ${instructorData.data_joined}`}
                  size="small"
                  sx={{ mt: 0.5, fontWeight: 500 }}
                />
              </>
            )}
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Box>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Contact Info
          </Typography>
          {loading ? (
            <Box>
              <Skeleton width="70%" />
              <Skeleton width="80%" />
              <Skeleton width="50%" />
            </Box>
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Typography color="text.secondary" fontWeight={500}>
                  Username:
                </Typography>
                <Typography color="text.secondary" fontWeight={500}>
                  Email:
                </Typography>
                <Typography color="text.secondary" fontWeight={500}>
                  Phone:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography fontWeight={600}>
                  @{instructorData.username}
                </Typography>
                <Typography fontWeight={600}>{instructorData.email}</Typography>
                <Typography fontWeight={600}>+1 (555) 123-4567</Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>

      {/* ================= Right Section ================= */}
      {!editForm && (
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Account Details
          </Typography>
          {loading ? (
            <>
              <Skeleton width="80%" />
              <Skeleton width="70%" />
              <Skeleton width="50%" />
            </>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Typography color="text.secondary" fontWeight={500}>
                  First Name:
                </Typography>
                <Typography color="text.secondary" fontWeight={500}>
                  Last Name:
                </Typography>
                <Typography color="text.secondary" fontWeight={500}>
                  Time Zone:
                </Typography>
                <Typography color="text.secondary" fontWeight={500}>
                  Account Type:
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography fontWeight={600}>
                  {instructorData.firstName}
                </Typography>
                <Typography fontWeight={600}>
                  {instructorData.lastName}
                </Typography>
                <Typography fontWeight={600}>PST (UTC+2)</Typography>
                <Typography fontWeight={600}>Personal</Typography>
              </Grid>
            </Grid>
          )}
          <Divider sx={{ my: 1 }} />
          {!loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Chip
                label="UID:345427"
                color="secondary"
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  transition: "0.3s"
                }}
              />
              <Button
                variant="contained"
                disableElevation
                sx={{
                  borderRadius: 4,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={() => setEditForm(true)}
              >
                Edit Details
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* ================= Edit Form ================= */}
      {editForm && (
        <Box
          component="form"
          onSubmit={formSubmitHandler}
          sx={{
            flex: 1,
            minWidth: { xs: "100%", md: "45%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Edit Personal Details
          </Typography>
          {["username", "first_name", "last_name", "email"].map((field) => (
            <Box key={field}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={600}
                mb={0.75}
              >
                {field.replace("_", " ").toUpperCase()}:
              </Typography>
              <TextField
                size="small"
                fullWidth
                type={field === "email" ? "email" : "text"}
                disabled={field === "email"}
                value={updatedData[field]}
                onChange={
                  field === "username"
                    ? usernameChangeHandler
                    : field === "first_name"
                    ? firstNameChangeHandler
                    : field === "last_name"
                    ? lastNameChangeHandler
                    : emailChangeHandler
                }
              />
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Button
            variant="contained"
            disableElevation
            type="submit"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Update
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Profile;
