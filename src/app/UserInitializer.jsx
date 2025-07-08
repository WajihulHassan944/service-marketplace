'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { loginUser, setCurrentDashboard } from '@/redux/features/userSlice';
import { baseUrl } from '@/const';

const UserInitializer = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) {
        try {
          const res = await fetch(`${baseUrl}/users/userdetails`, {
            method: 'GET',
            credentials: 'include',
          });
          const data = await res.json();

          if (res.ok && data.success) {
            const userWithData = {
              ...data.user,
              wallet: data.wallet,
              buyerReviews: data.buyerReviews,
              sellerReviews: data.sellerReviews,
            };

            dispatch(loginUser(userWithData));

            const roles = data.user.role || [];
            const lowerPath = pathname.toLowerCase();

            let topRole = null;

            // Prioritize superadmin/admin if URL includes /admin
            if (roles.includes('superadmin') && lowerPath.includes('/admin')) {
              topRole = 'superadmin';
            } else if (roles.includes('admin') && lowerPath.includes('/admin')) {
              topRole = 'admin';
            } else {
              // Fallback logic for seller/buyer
              const rolePriority = { seller: 1, buyer: 2 };
              const validRoles = roles.filter((r) => ['seller', 'buyer'].includes(r));
              if (validRoles.length > 0) {
                const sortedRoles = validRoles.sort((a, b) => rolePriority[a] - rolePriority[b]);
                topRole = sortedRoles[0];
              }
            }

            if (topRole) {
              dispatch(setCurrentDashboard(topRole));
            }
          }
        } catch (err) {
          console.error('User session check failed:', err);
        }
      }
    };

    fetchUser();
  }, [dispatch, isLoggedIn, pathname]);

  return null;
};

export default UserInitializer;
