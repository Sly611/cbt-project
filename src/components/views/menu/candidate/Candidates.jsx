import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { pageTitleActions } from "../../../../store";
import { Outlet } from "react-router-dom";

const Candidates = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Candidates"));
  return <Outlet />;
};

export default Candidates;
