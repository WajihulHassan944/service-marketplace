'use client';
import withAdminAuth from '@/hooks/withAdminAuth';
import ProfileSetting from './ProfileSetting';

const Page = () => {
  return (
    <div>
      <ProfileSetting/>
    </div>
  );
}
export default withAdminAuth(Page)