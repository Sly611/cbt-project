import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../store";

const Support = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Help"));
  return <Typography variant="h4">Help Center</Typography>;
};
export default Support;
