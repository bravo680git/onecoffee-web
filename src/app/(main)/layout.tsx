import React from "react";
import Footer from "./components/Footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
