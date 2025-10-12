import Box from "@mui/material/Box";
import {
  Breadcrumbs,
  Typography,
  Toolbar,
  Drawer,
  Link,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { DrawerMenu } from "./main_components/DesktopDrawer";
import { NavBar } from "./main_components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { alertSliceActions } from "../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";

const drawerWidth = 200;

function Main(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleAlertClose = () => {
    dispatch(alertSliceActions.resetAlert());
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = DrawerMenu;

  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar drawer={drawerWidth} drawerToggle={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mb: 5,
        }}
      >
        <Toolbar />
        <Box sx={{ position: "relative", display: "flex", width: "100%" }}>
          <Snackbar
            open={alert.open}
            autoHideDuration={alert.duration}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => dispatch(alertSliceActions.resetAlert())}
              severity={alert.severity}
              icon={
                alert.severity === "success" ? (
                  <TaskAltRoundedIcon />
                ) : alert.severity === "error" ? (
                  <WarningAmberRoundedIcon />
                ) : (
                  <WarningAmberRoundedIcon />
                )
              }
              sx={{
                borderRadius: 2,
                px: 2,
                py: 0.5,
                fontSize: "0.85rem",
                fontWeight: 500,
                bgcolor:
                  alert.severity === "success"
                    ? "rgba(46, 125, 50, 0.1)" // soft green
                    : alert.severity === "error"
                    ? "rgba(211, 47, 47, 0.1)" // soft red
                    : alert.severity === "warning"
                    ? "rgba(237, 108, 2, 0.1)" // soft orange
                    : "rgba(25, 118, 210, 0.1)", // soft blue for info
                color:
                  alert.severity === "success"
                    ? "success.main"
                    : alert.severity === "error"
                    ? "error.main"
                    : alert.severity === "warning"
                    ? "warning.main"
                    : "info.main",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                backdropFilter: "blur(6px)",
              }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
        <Container>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              const isLast = index === pathnames.length - 1;

              return isLast ? (
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.primary"
                  key={to}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Typography>
              ) : (
                <Link
                  underline="hover"
                  color="inherit"
                  component={RouterLink}
                  to={to}
                  key={to}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="text.primary"
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Typography>
                </Link>
              );
            })}
          </Breadcrumbs>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}

export default Main;
