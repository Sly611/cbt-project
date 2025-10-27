import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";

export default function AboutPage() {
  return (
    <Box sx={{ mt: 8, pb: 8 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <SchoolOutlinedIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" fontWeight={700} gutterBottom>
            About <span style={{ color: "#1976d2" }}>Krama</span>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Krama is a next-generation Computer-Based Testing (CBT) platform
            built to simplify how institutions, instructors, and candidates
            create, manage, and take online exams securely and efficiently.
          </Typography>
        </Box>

        {/* Mission + Vision Section */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To revolutionize assessment and examination processes by
                providing a secure, reliable, and user-friendly digital platform
                that empowers educators and institutions to conduct tests with
                confidence and ease.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Our Vision
              </Typography>
              <Typography variant="body1" color="text.secondary">
                To become the leading cloud-based CBT platform trusted globally
                for delivering seamless online assessments — redefining how
                learning institutions evaluate knowledge and track performance.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 8 }} />

        {/* Features Section */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Why Choose Krama?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Everything you need to deliver world-class assessments, built into
            one platform.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              icon: <SpeedRoundedIcon sx={{ fontSize: 40 }} color="primary" />,
              title: "Fast & Reliable",
              text: "Our platform ensures seamless exam delivery with minimal lag and downtime, even under heavy traffic.",
            },
            {
              icon: (
                <SecurityRoundedIcon sx={{ fontSize: 40 }} color="primary" />
              ),
              title: "Secure & Private",
              text: "End-to-end encryption, strict access control, and secure authentication keep your data protected.",
            },
            {
              icon: (
                <CloudQueueRoundedIcon sx={{ fontSize: 40 }} color="primary" />
              ),
              title: "Cloud-Based",
              text: "Access your tests, results, and analytics from anywhere in the world — no installations required.",
            },
            {
              icon: <GroupsRoundedIcon sx={{ fontSize: 40 }} color="primary" />,
              title: "Multi-User Support",
              text: "Instructors, students, and administrators each get tailored dashboards for easy interaction.",
            },
            {
              icon: (
                <VerifiedRoundedIcon sx={{ fontSize: 40 }} color="primary" />
              ),
              title: "Accurate Analytics",
              text: "Instantly generate reports, track student performance, and export results with ease.",
            },
            {
              icon: (
                <SchoolOutlinedIcon sx={{ fontSize: 40 }} color="primary" />
              ),
              title: "Modern UI/UX",
              text: "A sleek, intuitive interface built for simplicity and efficiency, reducing learning curves.",
            },
          ].map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                    mx: "auto",
                    mb: 2,
                    width: 60,
                    height: 60,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 8 }} />

        {/* Footer Section */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Built for the Future of Learning
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "700px", mx: "auto" }}
          >
            Krama empowers educators and learners alike by transforming how
            assessments are created, managed, and experienced. Whether you’re
            running small classroom quizzes or large-scale national exams, Krama
            adapts to your needs effortlessly.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
