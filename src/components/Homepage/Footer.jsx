import { Box, Grid, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0d0d0d",
        color: "#ccc",
        // px: { xs: 2},
        py: 5,
        mt: 10,
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Krama
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: 300 }}>
            Elevate your digital experience with our all-in-one platform.
            Simple. Powerful. Seamless.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Product
          </Typography>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Features
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Pricing
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Integrations
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Company
          </Typography>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            About
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Careers
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Contact
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Resources
          </Typography>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Docs
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Blog
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            variant="body2"
            display="block"
          >
            Support
          </Link>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

      <Typography variant="body2" align="center" sx={{ color: "#888" }}>
        © {new Date().getFullYear()} Krama. All rights reserved.
      </Typography>
    </Box>
  );
};


export default Footer;