"use client";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {!pathname.startsWith("/authentification/") ? (
          <SessionProvider>{children}</SessionProvider>
        ) : (
          children
        )}
        <Toaster />
      </body>
    </html>
  );
}
