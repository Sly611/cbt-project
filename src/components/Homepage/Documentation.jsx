import { Box, Typography} from "@mui/material"


const Documentation = () => {
  return (
    <Box
      sx={{
        mt: 5,
        textAlign: "center",
        mb: 6,
        height: "100vh"
      }}
    >
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Documentation
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ maxWidth: "700px", mx: "auto" }}
      >
        Coming soon..
      </Typography>
    </Box>
  );
};


export default Documentation;