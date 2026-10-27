import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tanners Photography — Stories, honestly told",
  description: "Portraits, celebrations, weddings, and everyday stories captured with intention by Tanners Photography.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
