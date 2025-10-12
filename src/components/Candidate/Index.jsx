import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
// import { DrawerMenu } from "./main_components/DesktopDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Index = () => {
  // const [mobileOpen, setMobileOpen] = useState(false);
  // const [isClosing, setIsClosing] = useState(false);
  // const alert = useSelector((state) => state.alert);
  // const dispatch = useDispatch();

  // const handleDrawerClose = () => {
  //   setIsClosing(true);
  //   setMobileOpen(false);
  // };

  // const handleDrawerTransitionEnd = () => {
  //   setIsClosing(false);
  // };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  // const drawer = DrawerMenu;

  return <Outlet />;
};

export default Index;
