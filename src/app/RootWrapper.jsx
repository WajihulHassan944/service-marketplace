// app/RootWrapper.jsx
'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

export default function RootWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Will release once desktop version is approved
      </h1>
    );
  }

  return (
    <>
      <LayoutClientWrapper />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
