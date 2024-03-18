"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import SocketProvider from "../context/socketProvider";
import { Suspense } from "react";
import LoadingUI from "./loading";
import { Provider } from "react-redux";
import store from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingUI />}>
          <Provider store={store}>
            <SocketProvider>{children}</SocketProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
