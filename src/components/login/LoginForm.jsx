import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Box,
  CircularProgress,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import useAuthenticate from "../hooks/useAuthenticate";

const LoginForm = () => {
  const [showpassword, setShowPassword] = useState(false);
  const { isLoading, error, sendRequest } = useAuthenticate();


  const {
    value: email,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: emailReset,
  } = useInput((value) => value.includes("@"));

  const {
    value: password,
    valueChangeHandler: passwordChangeHandler,
    resetInput: passwordReset,
  } = useInput((value) => value.length > 0);

  const ToggleShowpassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    await sendRequest({
      url: "token/",
      data: {
        email,
        password,
      },
      path: "/dashboard",
      userUrl: "/instructor/profile",
    });
    emailReset();
    passwordReset();
  };

  return (
    <Card
      sx={{
        width: 400,
        p: 2,
        m: 2,
        elevation: 5,
        borderRadius: 8,
        background: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(100px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <form onSubmit={formSubmitHandler}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 0,
          }}
        >
          <AccountCircleIcon
            sx={{ width: "8rem", height: "8rem", color: "primary.main" }}
          />

          <TextField
            size="small"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            size="small"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={passwordChangeHandler}
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
          <Link underline="none" href="#" sx={{ display: "flex" }}>
            <Typography variant="caption">Forgot your password?</Typography>
          </Link>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            gap: 1,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress color="inherit" size={16} />
            }
            fullWidth
            sx={{
              borderRadius: 5,
              textTransform: "none",
            }}
          >
            Login
          </Button>

          {error && (
            <Typography variant="caption" color="error" textAlign="center">
              Invalid credentials
            </Typography>
          )}
        </CardActions>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <Typography variant="caption">
          Dont have an account?
          <Link to="/account" underline="none">
            Sign up!
          </Link>
        </Typography>
      </Box>
    </Card>
  );
};

export default LoginForm;
