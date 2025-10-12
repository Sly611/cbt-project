import { Box, TextField, Typography } from "@mui/material";

const ProfileEditForm = () => {
  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%" }}>
        <TextField
          size="small"
          label="Username"
          type="text"
          variant="outlined"
          fullWidth
          onBlur={usernameBlurHandler}
          onChange={usernameChangeHandler}
          value={username}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          size="small"
          label="First name"
          type="text"
          variant="outlined"
          fullWidth
          onBlur={firstNameBlurHandler}
          onChange={firstNameChangeHandler}
          value={firstName}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          size="small"
          label="Last name"
          type="text"
          variant="outlined"
          fullWidth
          onBlur={lastNameBlurHandler}
          onChange={lastNameChangeHandler}
          value={lastName}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <TextField
          size="small"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={email}
        />
      </Box>
    </Box>
  );
};

export default ProfileEditForm;
