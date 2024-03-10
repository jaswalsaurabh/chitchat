'use client'
import { useEffect } from "react";
import socketConnection from "./socket";

const useWebSocketKeepAlive = (pingInterval = 130000) => {
  useEffect(() => {
    const keepAlive = () => {
      try {
        socketConnection.emit("keepAlive", {name:"Don"});
      } catch (error) {
        console.error("Error in keep-alive request:", error);
      }
    };

    keepAlive();

    const intervalId = setInterval(keepAlive, pingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [pingInterval]);
};

export default useWebSocketKeepAlive;
