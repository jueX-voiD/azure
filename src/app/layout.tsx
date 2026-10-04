import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${petala.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
