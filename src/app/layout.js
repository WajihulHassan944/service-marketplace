import './globals.css';
import LayoutClientWrapper from '@/components/LayoutClientWrapper';
import LayoutContent from '@/components/LayoutContent';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserInitializer from './UserInitializer'; 
import { Toaster } from 'react-hot-toast';
import { GeistSans } from "geist/font/sans";
export const metadata = {
  title: 'Service Marketplace',
  description: 'Service Marketplace',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <GoogleOAuthProvider clientId="647545445342-0271m6b92v0cfmd69tj8sgd49ikpodq6.apps.googleusercontent.com">
          <LayoutClientWrapper>
            <UserInitializer /> {/* Load user info from cookies into Redux */}
            <LayoutContent>{children}</LayoutContent>
            {/* Place Toaster at root level */}
            
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1f2a60',
                  color: '#fff',
                },
              }}
            />
          </LayoutClientWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
