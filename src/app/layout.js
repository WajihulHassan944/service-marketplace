import './globals.css';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';
import LayoutContent from '@/components/LayoutContent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserInitializer from './UserInitializer'; // Make sure path is correct

export const metadata = {
  title: 'Service Marketplace',
  description: 'Service Marketplace',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider clientId="647545445342-0271m6b92v0cfmd69tj8sgd49ikpodq6.apps.googleusercontent.com">
          <LayoutClientWrapper>
            <UserInitializer /> {/* Load user info from cookies into Redux */}
            <LayoutContent>{children}</LayoutContent>
          </LayoutClientWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
