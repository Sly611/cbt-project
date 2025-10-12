import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  Paper,
  LinearProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import { useDispatch } from "react-redux";
import { alertSliceActions } from "../../../../store";
import { useNavigate } from "react-router-dom";

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState("");
  const { loading, request } = useApi();
  const [tests, setTests] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [question, setQuestion] = useState({
    text: "",
    options: [],
  });

  // ===================== 📤 Handle Bulk Upload =====================
  const handleBulkUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
  

    const formData = new FormData();
    formData.append("file", file);
    formData.append("test_id", selectedTest);

    try {
      const response = await request({
        method: "POST",
        url: "/instructor/test/question/upload-new/",
        data: formData,
        auth: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const success = !response || !response.error;
      if (success) {
        dispatch(
          alertSliceActions.setAlert({
            open: true,
            message: response.message || "Questions uploaded successfully!",
            severity: "success",
            duration: 2500,
          })
        );
      }
    } catch (error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message:
            error.response?.data?.error ||
            "Bulk upload failed. Please check your file format.",
          severity: "error",
          duration: 3000,
        })
      );
    } finally {
      setUploading(false);
    }
  };

  // ===================== 📥 Download Sample Template =====================
  const handleDownloadSample = (type = "excel") => {
    const link = document.createElement("a");
    if (type === "excel") {
      link.href = "/samples/sample_question_format.xlsx"; // 👉 Place file in public/samples/
      link.download = "sample_question_format.xlsx";
    } else {
      link.href = "/samples/sample_question_format.docx";
      link.download = "sample_question_format.docx";
    }
    link.click();
  };

  // ===================== ✍️ Question CRUD =====================
  const handleQuestionChange = (e) => {
    setQuestion({ ...question, text: e.target.value });
  };

  const handleAddOption = () => {
    setQuestion({
      ...question,
      options: [...question.options, { text: "", correct: false }],
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...question.options];
    newOptions[index].text = value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleCheckboxChange = (index) => {
    const newOptions = [...question.options];
    newOptions[index].correct = !newOptions[index].correct;
    setQuestion({ ...question, options: newOptions });
  };

  // ===================== 📨 API for Manual Question Submit =====================
  const sendRequest = async (data) => {
    try {
      const response = await request({
        method: "POST",
        url: "/instructor/test/questions/new/",
        data: data,
        auth: true,
      });
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message: "Question added successfully!",
          severity: "success",
          duration: 2500,
        })
      );
    } catch (error) {
      dispatch(
        alertSliceActions.setAlert({
          open: true,
          message:
            error.response?.data?.detail ||
            "Something went wrong. Question creation failed",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  const formSubmitHandler = (event, save_and_continue = false) => {
    event.preventDefault();

    const data = {
      test: selectedTest,
      text: question.text,
      options: question.options,
    };
    sendRequest(data);
    setQuestion({
      text: "",
      options: [],
    });
    if (!save_and_continue) {
      navigate("/dashboard/questions");
    }
  };

  // ===================== 📡 Fetch Tests =====================
  useEffect(() => {
    const getTests = async () => {
      const data = await request({
        method: "GET",
        url: "/instructor/tests/",
        auth: true,
      });
      if (data) setTests(data);
    };
    getTests();
  }, []);

  return (
    <Box sx={{ mt: 5, width: { xs: "100%", md: "70%" } }}>
      <form onSubmit={formSubmitHandler}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight={600}>
              Add New Question
            </Typography>
          </Box>

          {/* Test Selector */}
          <FormControl>
            <InputLabel id="test-select-label">Test</InputLabel>
            <Select
              labelId="test-select-label"
              value={selectedTest}
              label="Test"
              onChange={(event) => setSelectedTest(event.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {tests.map((test) => (
                <MenuItem key={test.id} value={test.id}>
                  {test.course_title}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Select the test you want to create questions for
            </FormHelperText>
          </FormControl>

          {/* Upload Section */}
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              borderStyle: "dashed",
              textAlign: "center",
              bgcolor: "grey.50",
            }}
          >
            <Button
              variant="contained"
              component="label"
              disabled={!selectedTest || uploading}
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              {uploading ? "Uploading..." : "Bulk Upload"}
              <input
                type="file"
                accept=".csv,.xlsx,.doc,.docx"
                hidden
                onChange={handleBulkUpload}
              />
            </Button>
            {uploading && (
              <Box sx={{ width: "100%", mt: 2 }}>
                <LinearProgress />
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, display: "block" }}
                  color="text.secondary"
                >
                  uploading...
                </Typography>
              </Box>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontSize: "0.85rem" }}
            >
              Upload questions via <b>.csv, .xlsx, .docx</b>. (Select a test
              first)
            </Typography>

            <Box
              sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center" }}
            >
              <Button
                variant="outlined"
                startIcon={<DownloadRoundedIcon />}
                size="small"
                onClick={() => handleDownloadSample("excel")}
              >
                Excel Sample
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadRoundedIcon />}
                size="small"
                onClick={() => handleDownloadSample("docx")}
              >
                Docx Sample
              </Button>
            </Box>
          </Paper>

          <Divider>or</Divider>

          {/* Question Text */}
          <FormControl>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: "text.secondary", mb: 1 }}
            >
              Question Text
            </Typography>
            <TextField
              type="text"
              value={question.text}
              onChange={handleQuestionChange}
              multiline
              fullWidth
              minRows={4}
              placeholder="Enter the question here..."
            />
          </FormControl>

          {/* Options */}
          <Box sx={{ mt: 2 }}>
            {question.options.map((option, index) => (
              <Grid
                key={index}
                container
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid item xs={12} sm={9}>
                  <TextField
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    label={`Option ${index + 1}`}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox
                    checked={option.correct}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Correct
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>

          {/* Add Option Button */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AddRoundedIcon />}
            onClick={handleAddOption}
            sx={{
              borderStyle: "dashed",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              py: 1.2,
              color: "text.secondary",
              "&:hover": {
                borderStyle: "solid",
                bgcolor: "grey.50",
              },
            }}
          >
            Add Another Option
          </Button>

          {/* Action Buttons */}
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Button
                disableElevation
                fullWidth
                variant="outlined"
                onClick={(event) => formSubmitHandler(event, true)}
                sx={{ textTransform: "none", mt: 1 }}
              >
                Save and Add Another
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disableElevation
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", mt: 1 }}
              >
                Save and Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
};

export default CreateQuestion;
