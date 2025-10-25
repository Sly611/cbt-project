import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  Link,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X"; // Or use TwitterIcon if you prefer

export default function Contact() {
  return (
    <Box sx={{ mt: 8, pb: 8 }}>
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <MailOutlineRoundedIcon
            color="primary"
            sx={{ fontSize: 60, mb: 2 }}
          />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            We'd love to hear from you! Whether you have questions, feedback, or
            collaboration ideas, reach out and we’ll get back to you soon.
          </Typography>
        </Box>

        {/* Contact Info Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            mb: 6,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You can reach us directly through the following platforms:
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                sx={{
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  mx: "auto",
                  mb: 1,
                  width: 60,
                  height: 60,
                }}
              >
                <MailOutlineRoundedIcon color="primary" fontSize="large" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={600}>
                Email
              </Typography>
              {/* 👉 Replace this with your real email later */}
              <Link
                href="caleb.usha.yt@gmail.com"
                underline="hover"
                color="primary"
                sx={{ fontSize: "0.95rem" }}
              >
                caleb.usha.yt@gmail.com
              </Link>
            </Grid>

            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                sx={{
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  mx: "auto",
                  mb: 1,
                  width: 60,
                  height: 60,
                }}
              >
                <GitHubIcon color="primary" fontSize="large" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={600}>
                GitHub
              </Typography>
              {/* 👉 Replace this with your GitHub URL */}
              <Link
                href="https://github.com/Sly611"
                underline="hover"
                color="primary"
                sx={{ fontSize: "0.95rem" }}
              >
                Sly611
              </Link>
            </Grid>

            <Grid item xs={12} sm={4} textAlign="center">
              <Avatar
                sx={{
                  bgcolor: "rgba(25, 118, 210, 0.1)",
                  mx: "auto",
                  mb: 1,
                  width: 60,
                  height: 60,
                }}
              >
                <XIcon color="primary" fontSize="large" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight={600}>
                X (Twitter)
              </Typography>
              {/* 👉 Replace this with your X (Twitter) link */}
              <Link
                href="https://x.com/zobo_sly"
                underline="hover"
                color="primary"
                sx={{ fontSize: "0.95rem" }}
              >
                @zobo_sly
              </Link>
            </Grid>
          </Grid>
        </Paper>

        <Divider sx={{ mb: 6 }} />

        {/* Contact Form Section (Optional Placeholder) */}
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Send Us a Message
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Fill out the form below and we’ll respond as soon as possible.
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                size="medium"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Message"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 5,
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
