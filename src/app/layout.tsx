import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const petala = localFont({
  src: [
    { path: "../fonts/PetalaPro-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/PetalaPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/PetalaPro-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-petala",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Home - Azure", template: "%s" },
  description: "Envisioning tomorrow, building today.",
};

// The public site and the Sanity Studio have their own layouts: see (site)/layout.tsx and (studio)/.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${petala.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
