import SocketProvider from "./_lib/context/socketProvider";
import { Metadata } from "next";

// @ts-ignore

export const metadata: Metadata = {
  title: "Chit-Chat",
  description: "Realtime Chat App",
};

export default function Home() {
  // console.log("pathname", pathname);

  // useEffect(() => {
  //   const currentAuthenticatedUser = async () => {
  //     try {
  //       const currentUser = await getCurrentUser();
  //       console.log("this is currentUser", currentUser);

  //       if (currentUser) {
  //         router.push("/chat");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       router.push("/login");
  //       return false;
  //     }
  //   };
  //   currentAuthenticatedUser();
  // }, [router]);

  return (
      <main className="flex flex-col items-center justify-between p-24">
        <head>
          <a>
            <link rel="icon" href="/logo.ico" />
          </a>
        </head>
      </main>
  );
}
