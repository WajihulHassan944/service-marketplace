'use client';
import withAdminAuth from '@/hooks/withAdminAuth';
import SellerData from './SellersData';

const Page = () => {
  return (
    <div>
      <SellerData />
    </div>
  );
}
export default withAdminAuth(Page)