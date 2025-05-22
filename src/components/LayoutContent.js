'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AdminNav from '@/app/admin/AdminNav/page';
import TopNav from '@/app/admin/AdminNav/TopNav/TopNav';

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {isAdminRoute ? (
        <>
          <AdminNav />
          <TopNav />
        </>
      ) : (
        <Navbar />
      )}
      <main className={isAdminRoute ? 'admin-main' : ''}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
