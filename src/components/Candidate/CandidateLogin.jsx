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
  Container,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Link } from "react-router-dom";
import useInput from "../hooks/useInput";
import useAuthenticate from "../hooks/useAuthenticate";

import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { useParams } from "react-router-dom";
import bg from "../../assets/images/background.svg";

const CandidateLogin = () => {
  const [showpassword, setShowPassword] = useState(false);
  const [selectedTest, setSelectedTest] = useState("");
  const { loading, request } = useApi();
  const [tests, setTests] = useState([]);
  const { isLoading, error, sendRequest } = useAuthenticate();
  const params = useParams();

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
      type: "login",
      url: "token/",
      data: {
        email,
        password,
      },
      path: `${selectedTest}`,
    });

    emailReset();
    passwordReset();
  };

  useEffect(() => {
    const getTests = async () => {
      const response = await request({
        method: "GET",
        url: `/dtg/tests/?instructor=${params.instructor}`,
        auth: false,
      });
      if (response) {
        setTests(response);
      }
    };
    getTests();
  }, []);

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",      }}
    >
      <Card
        sx={{
          width: "32rem",
          p: 2,
          m: 2,
          elevation: 3,
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(1px)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
        }}
      >
        <form onSubmit={formSubmitHandler}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              py: 0,
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ my: 2 }}>
              Login
            </Typography>
            <Box sx={{ width: "100%" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Test
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={selectedTest}
                  label="Test"
                  onChange={(event) => setSelectedTest(event.target.value)}
                >
                  <MenuItem value="">
                    {isLoading ? "loading..." : <em>None</em>}
                  </MenuItem>
                  {tests.map((test) => (
                    <MenuItem value={test.id}>{test.course_title}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Select the exam you want to take
                </FormHelperText>
              </FormControl>
            </Box>
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
              alignItems: "center",
              // p: 1,
              gap: 1,
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading || selectedTest === ""}
              startIcon={
                isLoading && <CircularProgress color="inherit" size={16} />
              }
              sx={{
                borderRadius: 5,
                width: "88%",
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
            <Link to="register" underline="none">
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default CandidateLogin;
