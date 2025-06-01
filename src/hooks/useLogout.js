'use client';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/features/userSlice';
import { baseUrl } from '@/const';

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async (callback) => {
    try {
      const res = await fetch(`${baseUrl}/users/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('Logout successful!');
        dispatch(logoutUser());
        if (typeof callback === 'function') callback();
        router.push('/');
      } else {
        alert('Logout failed!');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred while logging out.');
    }
  };

  return handleLogout;
};

export default useLogout;
