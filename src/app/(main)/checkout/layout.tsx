import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Thanh toán",
};

function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

export default Layout;
