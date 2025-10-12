import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { pageTitleActions } from "../../../../store";

const Tests = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Tests Manager"));

  return <Outlet />;
};

export default Tests;
