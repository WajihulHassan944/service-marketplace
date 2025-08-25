'use client';
import withAdminAuth from '@/hooks/withAdminAuth';
import SeeAllAdmin from './SeeAllAdmin';

const Page = () => {
  return (
    <div>
      <SeeAllAdmin />
    </div>
  );
}
export default withAdminAuth(Page)