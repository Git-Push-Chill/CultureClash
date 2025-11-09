import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Culture Clash - Where Taste Bridges Worlds",
  description: "Explore cross-cultural cuisine by fusing food worlds together",
  keywords: [
    "cuisine fusion",
    "cultural food",
    "recipe generator",
    "AI cooking",
    "international cuisine",
  ],
  authors: [{ name: "Culture Clash Team" }],
  openGraph: {
    title: "Culture Clash - Where Taste Bridges Worlds",
    description:
      "Explore cross-cultural cuisine by fusing food worlds together",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <body className="font-sans antialiased bg-[url('../public/background.png')] bg-cover bg-fixed bg-center min-h-screen">
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
