import { Box, Grid, Typography, Link, Divider, IconButton } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: { xs: 3, md: 5 },
        mt: 13,
        backgroundColor: "background.paper",
      }}
    >
      <Divider sx={{ mb: 3 }} />

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
          rowGap: 2,
        }}
      >
        {/* Left Section */}
        <Grid
          item
          xs={12}
          sm="auto"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 1, sm: 3 },
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            © {new Date().getFullYear()} Krama. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: { xs: 2, sm: 3 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="#" underline="none" color="text.primary">
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Terms
              </Typography>
            </Link>
            <Link href="#" underline="none" color="text.primary">
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Privacy
              </Typography>
            </Link>
            <Link href="#" underline="none" color="text.primary">
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Support
              </Typography>
            </Link>
          </Box>
        </Grid>

        {/* Right Section (Socials) */}
        <Grid
          item
          xs={12}
          sm="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton color="primary" component="a" href="caleb.usha.yt@gmail.com">
            <MailOutlineIcon />
          </IconButton>
          <IconButton color="primary" component="a" href="https://x.com/zobo_sly/">
            <XIcon />
          </IconButton>
          <IconButton color="primary" component="a" href="https://github.com/Sly611/">
            <GitHubIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
