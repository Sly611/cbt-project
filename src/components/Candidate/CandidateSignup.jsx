import {
  Container,
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress
} from "@mui/material";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import useAuthenticate from "../hooks/useAuthenticate";
import useInput from "../hooks/useInput";
import { useParams } from "react-router-dom";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import CustomModal from "../views/menu/helpers/Modal";
import { useDispatch } from "react-redux";
import { alertSliceActions } from "../../store";

const CandidateSignup = () => {
  const [selectedTest, setSelectedTest] = useState("");
  const { loading, request } = useApi();
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const ToggleShowpassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    value: reg_number,
    isInvalid: reg_numberIsInvalid,
    valueChangeHandler: reg_numberChangeHandler,
    resetInput: reg_numberReset,
  } = useInput((value) => value);

  const {
    value: firstName,
    isInvalid: firstNameIsInvalid,
    valueChangeHandler: firstNameChangeHandler,
    resetInput: firstNameReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: lastName,
    isInvalid: lastNameIsInvalid,
    valueChangeHandler: lastNameChangeHandler,
    resetInput: lastNameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: email,
    isInvalid: emailIsInvalid,
    valueChangeHandler: emailChangeHandler,
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

  const formInValid = firstNameIsInvalid || lastNameIsInvalid || emailIsInvalid;
  // const { isLoading, sendRequest } = useAuthenticate();
  const [showpassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const logo = (
    <TaskAltRoundedIcon
      color="success"
      sx={{ width: "8rem", height: "8rem" }}
    />
  );

  const closeModal = () => {
    navigate(`/${params.instructor}/tests/`);
    handleClose();
  };

  const sendData = async (data) => {
    try {
      console.log(data);

      const response = await request({
        method: "POST",
        url: "instructor/test/candidates/register/",
        data: data,
        auth: false,
      });
      if (response && !response.error) {
        setOpen(true);
      }
    } catch (error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: "Something went wrong, registration failed",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (formInValid) return;
    const data = {
      instructor: params.instructor,
      tests: [selectedTest],
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
      reg_number: reg_number.toLowerCase(),
      email: email,
      password: password,
    };

    sendData(data);
    reg_numberReset();
    firstNameReset();
    lastNameReset();
    emailReset();
    passwordReset();
    passwordConfirmReset();
  };

  useEffect(() => {
    const getTests = async () => {
      const data = await request({
        method: "GET",
        url: `/dtg/tests/?instructor=${params.instructor}`,
        header: {},
      });
      if (data) {
        setTests(data);
        console.log();
      }
    };
    getTests();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CustomModal
        title="Registration Successful"
        message="Return to login page to take exam"
        button="Goto test"
        badge={logo}
        open={open}
        close={closeModal}
        buttonHandler={closeModal}
        buttonText="Go to test"
      />
      <Box
        component="form"
        onSubmit={formSubmitHandler}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "32rem",
          p: 2,
          gap: 3,
          elevation: 3,
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(100px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Register
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-helper-label">Test</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedTest}
            label="Test"
            onChange={(event) => setSelectedTest(event.target.value)}
            // sx={{
            //   backgroundColor: theme.palette.grey[200],
            //   borderRadius: 2,
            // }}
          >
            <MenuItem value="">
              <em>{loading && "loading..."}</em>
            </MenuItem>
            {tests.map((test, index) => (
              <MenuItem key={index} value={test.id}>
                {test.course_title}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Select the exam you want to register for
          </FormHelperText>
        </FormControl>

        <Box sx={{ width: "100%" }}>
          <TextField
            size="small"
            label="First name"
            type="text"
            variant="outlined"
            fullWidth
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
            onChange={emailChangeHandler}
            value={email}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <TextField
            size="small"
            label="Reg Number"
            type="text"
            variant="outlined"
            fullWidth
            onChange={reg_numberChangeHandler}
            value={reg_number}
          />
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
              password must be &gtn 6 char
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={formInValid || loading || selectedTest === ""}
          startIcon={loading && <CircularProgress color="inherit" size={16} />}
          sx={{
            borderRadius: 5,
            mt: 2,
          }}
        >
          Register
        </Button>
        <Typography variant="caption" sx={{ mt: 2 }}>
          Already registered?
          <Link to={`/${params.instructor}/tests/`}>Login</Link>{" "}
        </Typography>
      </Box>
    </Container>
  );
};

export default CandidateSignup;
