"use client";
import { getCurrentUser } from "@aws-amplify/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import awsconfig from "../aws-exports";
import { Amplify } from "aws-amplify";
import SocketProvider from "./_lib/context/socketProvider";

// @ts-ignore
Amplify.configure({ ...awsconfig });

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
    <SocketProvider>
      <main className="flex flex-col items-center justify-between p-24">
        <head>
          <a>
            <link rel="icon" href="/logo.ico" />
          </a>
        </head>
      </main>
    </SocketProvider>
  );
}
