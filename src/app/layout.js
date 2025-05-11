// app/layout.js
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import LayoutClientWrapper from "@/components/LayoutClientWrapper";

export const metadata = {
  title: "Service Marketplace",
  description: "Service Marketplace",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <LayoutClientWrapper />
       <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
