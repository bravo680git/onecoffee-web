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
  title: {
    template: "%s | ONe Coffee",
    absolute: "New3T",
  },
  description:
    "New3T store, chuyên cung cấp các loại thực phẩm tươi ngon, bổ dưỡng với giá cả ưu đãi nhất",
  keywords:
    "new3t, thuan tat thanh, gao st25, trai cay tuoi, caffe nguyên chất, cà phê",
  openGraph: {
    images: "/logo.png",
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
    </html>
  );
}
