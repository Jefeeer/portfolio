import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mark Jeferson Manalo — Full-Stack Developer",
  description:
    "Full-Stack Developer building modern, scalable, and user-focused web applications — from intuitive frontend experiences to reliable backend systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#0C0C0C]"
        style={{ overflowX: "clip", fontFamily: "'Kanit', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
