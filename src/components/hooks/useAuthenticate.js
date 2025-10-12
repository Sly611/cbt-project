import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../store";

axios.defaults.baseURL = "https://cbt-api-version0-1.onrender.com/api/";
// axios.defaults.withCredentials = true;

const useAuthenticate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (config) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method: "POST",
        url: config.url || null,
        data: config.data || null,
        headers: config.headers || {},
      });
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        if (config.userUrl) {
          const user = await axios({
            method: "GET",
            url: config.userUrl,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          if (user.data) {
            dispatch(userSliceActions.setUser({ user: user.data, auth: true }));
          }
        }
      }
      if (config.path) {
        navigate(config.path);
      }
      return response;
    } catch (err) {
      const message = err.response ? err.response.data : err.message;
      setError(message);
      console.error("Request error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
};

export default useAuthenticate;
