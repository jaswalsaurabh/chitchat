import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {/* <header className="bg-sky-300 p-4">
          <p>Common Header</p>
        </header> */}
        {children}
        {/* <footer className="bg-yellow-200 p-4">
          <p>Common Footer</p>
        </footer> */}
      </body>
    </html>
  );
}
