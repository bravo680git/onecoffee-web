import type { Metadata } from "next";
import { Inter, Covered_By_Your_Grace } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });
const grace = Covered_By_Your_Grace({
  subsets: ["latin"],
  variable: "--font-grace",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "New3T",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, grace.variable)}>{children}</body>
    </html>
  );
}
