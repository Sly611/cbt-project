import {
  Typography,
  Box,
  IconButton,
  Drawer,
  Divider,
  ListItem,
  ListItemText,
  List,
  // Link,
  Button,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import theme from "../../Theme";

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontWeight: 500,
  fontSize: "1rem",
  padding: "8px 12px",
  borderRadius: "6px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.primary.dark,
    backgroundColor: theme.palette.action.hover,
  },
}));

const NavBar = () => {
  const navigate = useNavigate();
  const drawerWidth = 200;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navLinks = [
    { label: "About", href: "about" },
    { label: "Documentation", href: "documentation" },
    { label: "Contact", href: "contact" },
  ];

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 2, md: 6 },
        py: 1.5,
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.41)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Section: Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <SchoolOutlinedIcon
          color="primary"
          sx={{ fontSize: "2rem", mr: 0.5 }}
        />
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontWeight: 500,
            fontSize: "1rem",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "0.3s",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: "1px" }}
          >
            Krama
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
        }}
      >
        {navLinks.map((link) => (
          <StyledLink
            key={link.label}
            to={link.href}
            // sx={{
            //   textDecoration: "none",
            //   color: "#1976d2",
            //   fontWeight: 500,
            //   fontSize: "1rem",
            //   transition: "0.3s",
            //   "&:hover": { color: "primary.main" },
            // }}
          >
            {link.label}
          </StyledLink>
        ))}
        <Button
          variant="outlined"
          endIcon={<LoginRoundedIcon />}
          sx={{ height: "2rem" }}
          onClick={() => navigate("/account/login")}
        >
          Login
        </Button>
      </Box>

      <>
        {/* Mobile Menu Icon */}
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ mr: 1, display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          anchor="right"
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
          <Box sx={{ width: 200, p: 2 }}>
            <List>
              {navLinks.map((link) => (
                <ListItem
                  button
                  key={link.label}
                  component="a"
                  // href={link.href}
                  onClick={() => {
                    navigate(link.href);
                    handleDrawerClose();
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 1 }} />
            <ListItem button onClick={handleDrawerClose}>
              <Button
                variant="contained"
                fullWidth
                disableElevation
                sx={{ my: 1 }}
                onClick={() => navigate("account")}
              >
                Signup
              </Button>
            </ListItem>
            <ListItem button onClick={handleDrawerClose}>
              <Button
                variant="outlined"
                fullWidth
                sx={{ my: 1 }}
                onClick={() => {
                  navigate("/account/login");
                }}
              >
                Login
              </Button>
            </ListItem>
          </Box>
        </Drawer>
      </>
    </Box>
  );
};

export default NavBar;
