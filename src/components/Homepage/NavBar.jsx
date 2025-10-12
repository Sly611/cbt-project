import {
  Typography,
  Box,
  Link,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import useAuthenticate from "../hooks/useAuthenticate";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menu) => {
    if (menu === "signup") {
      navigate("account")
      setAnchorElUser(null);
    } else if (menu === "login") {
      navigate("account/login");
      setAnchorElUser(null);
    } else {
      setAnchorElUser(null);
    }
  };

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
        padding: "21px 40px",
        zIndex: 10,
        backgroundColor: "rgba(255, 255, 255, 0.02)", // translucent
        backdropFilter: "blur(13px)",
      }}
    >
      <Link href="#" underline="none">
        <Typography variant="h5" color="primary" sx={{ fontWeight: 700 }}>
          Krama
        </Typography>
      </Link>
      <Box
        gap={13}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href="#" underline="none">
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 500, px: 1 }}
          >
            Home
          </Typography>
        </Link>
        <Link href="#" underline="none">
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 500, px: 1 }}
          >
            About
          </Typography>
        </Link>
        <Link href="#" underline="none">
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontWeight: 500, px: 1 }}
          >
            Contact
          </Typography>
        </Link>
      </Box>
      {/* <AccountCircleIcon color="primary.main" /> */}
      <IconButton color="primary" onClick={handleOpenUserMenu}>
        <AccountCircleIcon
          color="inherit"
          sx={{ height: "2rem", width: "2rem" }}
        />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => handleCloseUserMenu("signup")}>
          <ListItemIcon>
            <Avatar
              sx={{ width: "1.3rem", height: "1.3rem", marginRight: 2 }}
            />
          </ListItemIcon>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Signup
          </Typography>
        </MenuItem>
        <MenuItem onClick={() => handleCloseUserMenu("login")}>
          <ListItemIcon>
            <LoginRoundedIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Login
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavBar;
