import {
  Box,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Typography,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GradingRoundedIcon from "@mui/icons-material/GradingRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import CloudCircleRoundedIcon from "@mui/icons-material/CloudCircleRounded";
import PlaylistAddCircleRoundedIcon from "@mui/icons-material/PlaylistAddCircleRounded";

import { NavLink } from "react-router-dom";
import { grey } from "@mui/material/colors";

const menuItems = [
  {
    icon: <DashboardRoundedIcon fontSize="small" />,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <PlaylistAddCircleRoundedIcon fontSize="small" />,
    label: "Manage Tests",
    path: "test",
  },

  {
    icon: <QuizRoundedIcon fontSize="small" />,
    label: "Question Bank",
    path: "questions",
  },
  {
    icon: <GroupsRoundedIcon fontSize="small" />,
    label: "Candidates",
    path: "candidates",
  },
  {
    icon: <GradingRoundedIcon fontSize="small" />,
    label: "Results",
    path: "result",
  },
];

const settingsMenu = [
  {
    icon: <ManageAccountsRoundedIcon fontSize="small" />,
    label: "Profile",
    path: "/dashboard/profile",
  },
  {
    icon: <ContactSupportRoundedIcon fontSize="small" />,
    label: "Help",
    path: "/dashboard/support",
  },
];

export const DrawerMenu = (
  <Box>
    <Toolbar sx={{ p: 2 }}>
      <CloudCircleRoundedIcon fontSize="large" />
    </Toolbar>
    <Divider variant="middle" sx={{ mt: 3 }}>
      <Typography variant="caption" fontWeight={500}>
        Menu
      </Typography>
    </Divider>
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={index} disablePadding>
          <NavLink
            to={item.path}
            end
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            {({ isActive }) => (
              <ListItemButton
                selected={isActive}
                disableRipple
                sx={{
                  borderRadius: 3,
                  mx: 1,
                  my: 1,
                  px: 2,
                  backgroundColor: isActive ? grey : "transparent",
                  color: isActive ? "text.primary" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive ? grey : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "text.primary" : "inherit",
                  },
                }}
              >
                {" "}
                <ListItemIcon
                  sx={{
                    mr: 1,
                    minWidth: "auto",
                    color: "text.primary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" fontWeight={500}>
                    {item.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
    <Divider variant="middle" sx={{ mt: 3 }}>
      <Typography variant="caption" fontWeight={500}>
        Settings
      </Typography>
    </Divider>
    <List>
      {settingsMenu.map((setting, index) => (
        <ListItem key={index} disablePadding>
          <NavLink
            to={setting.path}
            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
          >
            {({ isActive }) => (
              <ListItemButton
                selected={isActive}
                disableRipple
                sx={{
                  borderRadius: 3,
                  mx: 1,
                  px: 2,
                  backgroundColor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "text.primary" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive ? "primary.dark" : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "text.primary" : "inherit",
                  },
                }}
              >
                {" "}
                <ListItemIcon
                  sx={{
                    mr: 1,
                    minWidth: "auto",
                    color: "text.primary",
                  }}
                >
                  {setting.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="body2" fontWeight={500}>
                    {setting.label}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  </Box>
);
