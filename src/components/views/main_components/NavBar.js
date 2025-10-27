import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export const NavBar = (props) => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const pageTitle = useSelector((state) => state.title.title);
  const user = useSelector((state) => state.user.user);
  const { logout } = useLogout();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (menu) => {
    if (menu === "profile") {
      navigate("/dashboard/profile/");
      setAnchorElUser(null);
    } else if (menu === "logout") {
      logout({ path: "/account/login/" });
      setAnchorElUser(null);
    } else {
      setAnchorElUser(null);
    }
  };

  return (
    <AppBar
      color="#fff"
      sx={{
        width: { sm: `calc(100% - ${props.drawer}px)` },
        ml: { sm: `${props.drawer}px` },
        zIndex: 100,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(13px)",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.drawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={500}>
          {pageTitle}
        </Typography>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="subtitle2">Welcome, {user.email}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={user.first_name.toUpperCase()}
                src="#"
                sx={{
                  backgroundColor: "success.main",
                  width: "2rem",
                  height: "2rem",
                }}
              />
            </IconButton>
          </Tooltip>
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
            <MenuItem onClick={() => handleCloseUserMenu("profile")}>
              <ListItemIcon>
                <Avatar sx={{ width: "1.3rem", height: "1.3rem" }} />
              </ListItemIcon>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Profile
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => handleCloseUserMenu("logout")}>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
