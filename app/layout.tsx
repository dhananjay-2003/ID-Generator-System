import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rising Sun ID",
  description: "Created with v0",
  generator: "v0.app",
  applicationName: "v0.app",
  authors: [{ name: "v0.app", url: "https://v0.app" }],
  keywords: [
    "ID Card Generator",
    "Student ID",
    "ID Card Maker",
    "School ID",
    "ID Card Designer",
    "ID Card Creator",
    "Custom ID Cards",
    "Digital ID Cards",
    "ID Card Templates",
    "ID Card Printing",
  ],
  icons: {
    icon: "../favicon1.jpg", // favicon
    shortcut: "../favicon1.jpg", // shortcut icon
    apple: "../favicon1.jpg", // Apple touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
