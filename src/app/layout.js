import './globals.css';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';
import LayoutContent from '@/components/LayoutContent';

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
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
