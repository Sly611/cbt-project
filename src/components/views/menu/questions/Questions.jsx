import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { pageTitleActions } from "../../../../store";
const Questions = () => {
  const dispacth = useDispatch();
  dispacth(pageTitleActions.setTitle("Questions Manager"));

  return <Outlet />;
};
export default Questions;
