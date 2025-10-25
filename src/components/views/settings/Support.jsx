import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../store";
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

const Support = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Help"));
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        mb: 10,
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          background: "#fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Page Title */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <InfoOutlinedIcon
            sx={{ fontSize: 60, color: "primary.main", mb: 1 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Help & Information
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Learn more about how this platform works, what you can do here, and
            how to get support.
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Introduction Section */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              About This Platform
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              This platform is designed to simplify test administration and
              online examinations. It enables instructors to create and manage
              tests, register candidates, and monitor results in real time.
              <br />
              <br />
              Students can log in to take their assigned tests, view their
              results, and track their performance. Everything is built with
              simplicity, security, and speed in mind.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* How it Works Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              How It Works
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Step 1: Create an Account"
                  secondary="Instructors and students can register accounts to get started."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Step 2: Instructors Create Tests"
                  secondary="Instructors can set up tests with customizable instructions and questions."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Step 3: Students Take Tests"
                  secondary="Candidates log in, access their assigned tests, and submit answers."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Step 4: Results & Reports"
                  secondary="Test results are computed instantly, with detailed analytics available."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* FAQ Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Frequently Asked Questions
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Can I retake a test after submitting?"
                  secondary="Retaking depends on the instructor’s settings. Some tests allow retakes, others don’t."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Do I need to install anything?"
                  secondary="No installation required — everything runs in your browser."
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Is my data safe?"
                  secondary="Yes. We use modern encryption and secure hosting to protect all user data."
                />
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Security Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Security & Privacy
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <SecurityOutlinedIcon
                sx={{ fontSize: 30, color: "primary.main" }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                We take security seriously. All communications are encrypted.
                Data is stored in secure databases with restricted access. We do
                not share or sell user data. Accounts are protected by passwords
                and can be reset securely at any time.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Contact Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Contact & Support
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <ContactSupportOutlinedIcon
                sx={{ fontSize: 30, color: "primary.main" }}
              />
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                If you need help or want to report an issue, our support team is
                ready to assist.
                <br />
                📧 Email: <strong>support@Krama.com</strong>
                <br />
                🕓 Response time: 24–48 hours
                <br />
                💬 Live chat: Coming soon!
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </Box>
  );
};
export default Support;
