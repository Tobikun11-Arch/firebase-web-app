import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./verification/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Firebase web app",
  description: "Join now!",
  icons: {
    icon: [
      { url: "/firebaselogo.png", type: "image/png", sizes: "32x32" },
      { url: "/firebaselogo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/firebaselogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
        {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
