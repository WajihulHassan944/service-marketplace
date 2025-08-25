'use client';
import withAdminAuth from '@/hooks/withAdminAuth';
import BuyerData from './BuyerData';

const Page = () => {
  return (
    <div>
      <BuyerData />
    </div>
  );
}
export default withAdminAuth(Page)
