'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AdminNav from '@/app/admin/AdminNav/page';
import TopNav from '@/app/admin/AdminNav/TopNav/TopNav';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === '/admin/login';
  const isAdminRoute = pathname.startsWith('/admin') && !isAdminLogin;

  return (
    <>
      {isAdminRoute && (
        <>
          <AdminNav />
          <TopNav />
        </>
      )}

      {!isAdminRoute && !isAdminLogin && <Navbar />}

      <main className={isAdminRoute ? 'admin-main' : ''}>
        {children}
      </main>

      {!isAdminRoute && !isAdminLogin && <Footer />}
    </>
  );
}
