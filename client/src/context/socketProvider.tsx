"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WebSocketContext from "./socketContext";
import socketConnection from "../app/_lib/socket";
import awsconfig from "../aws-exports";
import { fetchAuthSession } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import useWebSocketKeepAlive from "../app/_lib/keepAliveSocket";
import { useDispatch } from "react-redux";
import { updateAuth } from "@/store/authSlice";
import { User, updateState } from "@/store/chatSlice";

// @ts-ignore
Amplify.configure({ ...awsconfig });

function SocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useWebSocketKeepAlive();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socketConnection.getSocket() || !socket) {
      const currentAuthenticatedUser = async () => {
        try {
          const currentUser = (await fetchAuthSession()).tokens;
          dispatch(updateAuth(currentUser?.accessToken.payload));
          const userData = currentUser?.accessToken.payload;
          const sender = {
            name: userData?.username,
            username: userData?.username,
            userId: userData?.sub,
            email: "",
            profileImage: "",
          };
          dispatch(updateState({ key: "sender", value: sender }));
          const token = currentUser?.accessToken.toString();
          if (currentUser) {
            router.push("/chat");
            // `${process.env.NEXT_PUBLIC_WSS_ENDPOINT}?token=${token}`
            let newSocket = socketConnection.connect(
              "ws://localhost:8080?" + `token=${sender.username}`
            );
            // let newSocket = socketConnection.connect(
            //   `${process.env.NEXT_PUBLIC_WSS_ENDPOINT}?token=${token}`
            // );
            setSocket(newSocket);
          } else {
            router.push("/login");
          }
        } catch (err) {
          console.log("err in context", err);
          router.push("/login");
          setSocket(null);
          return false;
        }
      };

      currentAuthenticatedUser();
    }

    return () => {
      socketConnection.close();
      setSocket(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    pathname.includes("/login") ||
    pathname.includes("/register") ||
    pathname === "/"
  ) {
    return <>{children}</>;
  } else {
    return (
      <>
        {/* @ts-ignore */}
        <WebSocketContext.Provider value={socket}>
          {children}
        </WebSocketContext.Provider>
      </>
    );
  }
}

export default SocketProvider;
