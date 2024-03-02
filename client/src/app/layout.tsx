// 'use client'
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SocketProvider from "./_lib/context/socketProvider";
import { Suspense } from "react";
import LoadingUI from "./loading";

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
          <SocketProvider>{children}</SocketProvider>
        </Suspense>
      </body>
    </html>
  );
}
