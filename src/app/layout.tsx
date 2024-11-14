import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";


export const metadata: Metadata = {
  title: "CTG Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
