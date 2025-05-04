// app/layout.js
import "./globals.css";
import RootWrapper from "./RootWrapper"; // Import the client-side wrapper

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
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
