import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Culture Clash - Where Taste Bridges Worlds",
  description: "Explore cross-cultural cuisine by fusing food worlds together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
