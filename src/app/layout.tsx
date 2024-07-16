import { GoogleAnalytics } from '@next/third-parties/google'
import clsx from "clsx";
import type { Metadata } from "next";
import { Covered_By_Your_Grace, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const grace = Covered_By_Your_Grace({
  subsets: ["latin"],
  variable: "--font-grace",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ONe Coffee",
    absolute: "ONe Coffee",
  },
  description:
    "ONe Coffee không đơn giản là những hương vị nguyên bản tự nhiên. Từng giọt cà phê, từng hương trà đều chứa đựng một phần của trái tim và tâm hồn của ONe và bạn.",
  keywords:
    "ONe coffee, New3T, cà phê nguyên chất, ONer, cafe24h, cafe, tea, coffee shop, Quận 10, cư xá Bắc Hải, cafe Quận 10, cafe chữa lành, 37 Cửu Long",
  openGraph: {
    images: `${process.env.HOST}/logo.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, grace.variable)}>{children}</body>
      <GoogleAnalytics gaId={process.env.GA_ID} />
    </html>
  );
}
