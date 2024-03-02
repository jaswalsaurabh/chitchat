// 'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocketProvider from "../context/socketProvider";
import { Suspense } from "react";
import LoadingUI from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chit-Chat",
  description: "Realtime Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<LoadingUI />}>
          <SocketProvider>{children}</SocketProvider>
        </Suspense>
      </body>
    </html>
  );
}
