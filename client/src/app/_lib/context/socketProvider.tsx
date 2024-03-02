import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WebSocketContext from "./socketContext";
import socketConnection from "../socket";
import awsconfig from "../../../aws-exports";
import { getCurrentUser } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";

// @ts-ignore
Amplify.configure({ ...awsconfig });

function SocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const router = useRouter();
  const pathname = usePathname()

  console.log("pathname", pathname);

  useEffect(() => {
    if (!socketConnection.getSocket() || !socket) {
      const currentAuthenticatedUser = async () => {
        try {
          const currentUser = await getCurrentUser();
          console.log("this is currentUser", currentUser);

          if (currentUser) {
            router.push("/chat");
            // `${process.env.REACT_APP_SOCKET_URL}?user=${response.accessToken.jwtToken}`
            let newSocket = socketConnection.connect(
              `${process.env.NEXT_PUBLIC_WSS_ENDPOINT}`
            );
            setSocket(newSocket);
          }
        } catch (err) {
          console.log(err);
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
  }, [pathname]);

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
