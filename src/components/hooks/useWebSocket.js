import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

export function useWebSocket(testId) {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("⚠️ No access token found");
      return;
    }

    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/test/${testId}/?token=${token}`
    );

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setConnected(true);

      // Optionally send start_test
      //   socketRef.current.send(
      //     JSON.stringify({ action: "start_test" })
      //   );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
      console.log("📩 Server:", data);
    };

    socketRef.current.onclose = async (event) => {
      console.warn("❌ Socket closed:", event.code);
      setConnected(false);

      if (event.code === 4001) {
        // Token expired → refresh & reconnect
        try {
          const response = await axios.post(
            "https://cbt-api-version0-1.onrender.com/api/token/refresh/",
            { refresh: localStorage.getItem("refreshToken") }
          );

          const newAccess = response.data.access;
          localStorage.setItem("accessToken", newAccess);

          console.log("🔄 Token refreshed. Reconnecting...");
          connect();
        } catch (err) {
          console.error("⚠️ Refresh failed. Redirecting to login.");
          //   window.location.href = "/login";
        }
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
      socketRef.current.close();
    };
  }, [testId]);

  useEffect(() => {
    if (!testId) return;

    connect();

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [testId]);
  // Function to send messages
  const sendMessage = useCallback((msg) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("⚠️ WebSocket not open, cannot send:", msg);
    }
  }, []);

  return { connected, messages, sendMessage };
}
