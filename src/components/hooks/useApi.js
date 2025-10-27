import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "https://cbt-api-version0-1.onrender.com/api"; 

const useApi = () => {
  const [loading, setLoading] = useState(false);

  // Get tokens from storage
  const getAccessToken = () => localStorage.getItem("accessToken");
  const getRefreshToken = () => localStorage.getItem("refreshToken");

  const isTokenExpired = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch (err) {
      return true;
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token found");

    try {
      const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
        refresh: refreshToken,
      });

      localStorage.setItem("accessToken", response.data.access);
      return response.data.access;
    } catch (err) {
      console.error("Refresh token failed:", err);
      throw err;
    }
  };

  const request = async (config) => {
    setLoading(true);
    try {
      if (config.auth) {
        let token = getAccessToken();

        // Check if expired
        if (!token || isTokenExpired(token)) {
          token = await refreshAccessToken();
        }

        const response = await axios({
          method: config.method || "GET",
          data: config.data || null,
          url: config.url,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          return response.data;
        }
      } else {
        const response = await axios({
          method: config.method || "GET",
          data: config.data || null,
          url: config.url,
        });
        if (response.status === 200) {
          return response.data;
        }
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading };
};

export default useApi;
