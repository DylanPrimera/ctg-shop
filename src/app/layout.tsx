import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";


import { Providers } from "@/components";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: "%s | CTG Shop",
    default: "CTG Shop",
  },
  description: "E-commerce where you can buy products for mens, women and kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
