import { userSliceActions } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const dispatch = useDispatch();
  const naviage = useNavigate();

  const logout = (config) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(userSliceActions.setUser({ user: {}, auth: false }));
    naviage(config.path);
  };

  return{logout}
};

export default useLogout;


