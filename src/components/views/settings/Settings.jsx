import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../store";

const Settings = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Settings"));
  return <Typography variant="h4">General Settings</Typography>;
};

export default Settings;
