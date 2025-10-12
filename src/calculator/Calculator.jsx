import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useState, useEffect, useRef } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClearIcon from "@mui/icons-material/Clear";
import { evaluate } from "mathjs";

const buttons = [
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "÷", value: "/" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "×", value: "*" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "-", value: "-" },
  { label: ".", value: "." },
  { label: "0", value: "0" },
  { label: "+", value: "+" },
  { label: "=", value: "=" },
];

const special_buttons = [
  { label: "sin", value: "sin(" },
  { label: "cos", value: "cos(" },
  { label: "tan", value: "tan(" },
  { label: "AC", value: "AC" },
  { label: "log", value: "log(" },
  { label: "√", value: "sqrt(" },
  { label: "xʸ", value: "^" },
  { label: "( )", value: "()" },
];

export default function Calculator() {
  const inputRef = useRef(null);
  const [fontsize, setFontsize] = useState(22);
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");
  const minFontsize = 12;

  const buttonClickHandler = (button) => {
    if (value === "") setAnswer("");

    const specials = ["sin", "cos", "tan", "log", "√", "xʸ", "()"];
    if (specials.includes(button.label)) {
      if (button.label === "()") {
        setValue((prev) => prev + parenthesisHandler());
      } else if (button.label === "√") {
        setValue((prev) => prev + "sqrt(");
      } else {
        setValue((prev) => prev + button.value);
      }
    } else if (button.label === "=") {
      solveButtonHandler();
    } else {
      setValue((prev) => prev + button.value);
    }
  };

  const parenthesisHandler = () => {
    const lastChar = value.trim().slice(-1);
    const shouldOpen = ["", "+", "-", "×", "÷", "(", "*", "/"];
    const openCount = (value.match(/\(/g) || []).length;
    const closeCount = (value.match(/\)/g) || []).length;

    if (shouldOpen.includes(lastChar) || openCount === closeCount) {
      return "(";
    } else if (openCount > closeCount) {
      return ")";
    } else {
      return "(";
    }
  };

  const solveButtonHandler = () => {
    try {
      const result = evaluate(value);
      setAnswer(result);
      setValue("");
    } catch {
      setAnswer("Error");
    }
  };

  const clearScreenHandler = () => {
    setValue("");
    setAnswer("");
  };

  const backspaceHandler = () => {
    setValue((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;

    const parentWidth = el.offsetWidth;
    const scrollWidth = el.scrollWidth;

    if (scrollWidth > parentWidth && fontsize > minFontsize) {
      setFontsize((prev) => Math.max(prev - 1, minFontsize));
    }
  }, [value, fontsize]);

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#121212",
        borderRadius: 5,
        p: 1,
        mb: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        color: "#fff",
      }}
    >
      {/* Input Section */}
      <Box
        sx={{
          height: 80,
          px: 2,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            maxHeight: 50,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#444",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#666",
            },
          }}
        >
          <Typography
            ref={inputRef}
            sx={{
              fontSize: `${fontsize}px`,
              wordBreak: "break-word",
              whiteSpace: "normal",
              textAlign: "right",
            }}
          >
            {value}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 18,
            textAlign: "right",
            color: answer === "Error" ? "red" : "white",
          }}
        >
          {answer}
        </Typography>
      </Box>

      {/* Control Buttons */}
      <Grid container spacing={1} justifyContent="flex-end" sx={{ mb: 1, mr: 1.3 }}>
        <Grid item>
          <IconButton onClick={backspaceHandler} size="small" sx={{ color: "#fff" }}>
            <BackspaceIcon fontSize="small" />
          </IconButton>
        </Grid>
        {/* <Grid item>
          <IconButton onClick={clearScreenHandler} size="small" sx={{ color: "#fff" }}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Grid> */}
      </Grid>

      {/* Special Buttons */}
      <Grid container spacing={1} justifyContent="center" sx={{ mb: 1 }}>
        {special_buttons.map((button, index) => (
          <Grid item key={index}>
            <Button
              onClick={() =>
                button.label === "AC" ? clearScreenHandler() : buttonClickHandler(button)
              }
              sx={{
                textTransform: "none",
                bgcolor: orange[500],
                color: "#fff",
                borderRadius: 2,
                minWidth: 45,
                height: 30,
                "&:hover": { bgcolor: orange[700] },
              }}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Number Buttons */}
      <Grid container spacing={1} justifyContent="center">
        {buttons.map((button, index) => (
          <Grid item key={index}>
            <Button
              onClick={() => buttonClickHandler(button)}
              sx={{
                textTransform: "none",
                bgcolor: button.label === "=" ? "#2e7d32" : "#e0e0e0",
                color: button.label === "=" ? "#fff" : "#000",
                borderRadius: 3,
                minWidth: 45,
                height: 40,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: button.label === "=" ? "#1b5e20" : "#cfcfcf",
                },
              }}
            >
              {button.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
