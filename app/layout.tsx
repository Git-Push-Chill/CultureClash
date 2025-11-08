import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Culture Clash - Where Taste Bridges Worlds",
  description:
    "Explore cross-cultural cuisine by fusing food worlds together. Discover unique cross-cultural culinary experiences and plan your next food adventure.",
  keywords: [
    "food",
    "culture",
    "travel",
    "cuisine",
    "restaurants",
    "booking",
    "cultural exchange",
  ],
  authors: [{ name: "Culture Clash Team" }],
  openGraph: {
    title: "Culture Clash - Where Taste Bridges Worlds",
    description:
      "Explore cross-cultural cuisine and book amazing food experiences",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#a104c3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <body className="font-sans antialiased bg-[url('../public/background.png')] bg-cover bg-fixed bg-center min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main">
          {children}
        </main>
      </body>
    </html>
  );
}
