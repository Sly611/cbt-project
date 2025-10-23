import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useState } from "react";
import useInput from "../hooks/useInput";
import useAuthenticate from "../hooks/useAuthenticate";
import useApi from "../hooks/useApi";

const SignupForm = () => {
  const {
    value: username,
    isInvalid: usernameIsInvalid,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    resetInput: usernameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: firstName,
    isInvalid: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: firstNameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastName,
    isInvalid: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetInput: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isInvalid: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: emailReset,
  } = useInput((value) => value.includes("@"));
  const {
    value: password,
    isInvalid: passwordIsInvalid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetInput: passwordReset,
  } = useInput((value) => value.length >= 6);
  const {
    value: passwordConfirm,
    isInvalid: passwordConfirmIsInvalid,
    valueChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    resetInput: passwordConfirmReset,
  } = useInput((value) => value === password);

  const { isLoading, sendRequest } = useAuthenticate();
  const [showpassword, setShowPassword] = useState(false);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const data = {
      username: username.toLowerCase(),
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
      email: email,
      password: password,
    };

    await sendRequest({
      url: "instructor/signup/",
      data: data,
      path: "/account/login/",
    });

    usernameReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    passwordConfirmReset();
  };

  const ToggleShowpassword = () => {
    setShowPassword((prev) => !prev);
    console.log(showpassword);
  };

  return (
    <Box
      component="form"
      onSubmit={formSubmitHandler}
      sx={{ position: "relative", display: "flex" }}
    >
      <Card
        sx={{
          width: "25rem",
          mx: 2,
          p: 2,
          elevation: 5,
          borderRadius: 8,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(100px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary"
          sx={{ ml: 2, mb: 3 }}
        >
          Sign up
        </Typography>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >

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
            {usernameIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                field cannot be empty
              </Typography>
            )}
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
              // slotProps={{
              //   input: {
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <AccountBoxRoundedIcon fontSize="small" />
              //       </InputAdornment>
              //     ),
              //   },
              // }}
            />
            {firstNameIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                field cannot be empty
              </Typography>
            )}
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
              // slotProps={{
              //   input: {
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <AccountBoxRoundedIcon fontSize="small" />
              //       </InputAdornment>
              //     ),
              //   },
              // }}
            />
            {lastNameIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                field cannot be empty
              </Typography>
            )}
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
              // slotProps={{
              //   input: {
              //     endAdornment: (
              //       <InputAdornment position="end">
              //         <EmailRoundedIcon fontSize="small" />
              //       </InputAdornment>
              //     ),
              //   },
              // }}
            />
            {emailIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                enter a valid email
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              fullWidth
              onBlur={passwordBlurHandler}
              onChange={passwordChangeHandler}
              value={password}
              type={showpassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={ToggleShowpassword}
                        sx={{ m: 0, p: 0 }}
                      >
                        {showpassword ? (
                          <VisibilityRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {passwordIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                password must be more that 6 characters
              </Typography>
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            <TextField
              size="small"
              label="confirm password"
              variant="outlined"
              fullWidth
              value={passwordConfirm}
              onBlur={passwordConfirmBlurHandler}
              onChange={passwordConfirmChangeHandler}
              type={showpassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={ToggleShowpassword}
                        sx={{ m: 0, p: 0 }}
                      >
                        {showpassword ? (
                          <VisibilityRoundedIcon fontSize="small" />
                        ) : (
                          <VisibilityOffRoundedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {passwordConfirmIsInvalid && (
              <Typography
                variant="caption"
                color="error"
                sx={{
                  fontStyle: "italic",
                  mt: "2px",
                  ml: "4px", // Align slightly inward from left
                  display: "block", // Forces it to behave like a block element
                }}
              >
                password miss-match
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            // p: 1,
            gap: 1,
            mb: 2,
          }}
        >
          {/* <Link to="/dashboard"> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            type="submit"
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress color="inherit" size={16} />
            }
            sx={{
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Create Account
          </Button>

          {/* {error && (
            <Typography variant="caption" color="error">
              {error}
            </Typography>
          )} */}
        </CardActions>
        <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
          <Typography variant="caption">
            Already have an account?
            <Link to="/account/login" underline="none">
              Login here
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default SignupForm;
