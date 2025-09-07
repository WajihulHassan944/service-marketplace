'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  loginUser,
  setCurrentDashboard,
  initializeDashboardFromStorage,
  setHydrated,
  logoutUser,
} from '@/redux/features/userSlice';
import { baseUrl } from '@/const';

const UserInitializer = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    // ✅ Hydration flag
    dispatch(setHydrated(true));

    // ✅ Load dashboard from localStorage first
    dispatch(initializeDashboardFromStorage());

    const fetchUser = async () => {
      if (!isLoggedIn) {
        try {
          const res = await fetch(`${baseUrl}/users/userdetails`, {
            method: 'GET',
            credentials: 'include',
          });
          const data = await res.json();
  if ([440, 401].includes(res.status)) {
       dispatch(logoutUser());
       localStorage.removeItem("lastActivity");
       toast.error(
         res.status === 440
           ? "You have been logged out due to inactivity."
           : "Please log in to continue. Session Expired."
       );
       router.push("/login");
       clearInterval(intervalId); // ⛔ stop further checks after logout
     }
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

            // ✅ Prefer localStorage value (only buyer/seller)
            const persistedDashboard = localStorage.getItem('currentDashboard');
            if (['buyer', 'seller'].includes(persistedDashboard)) {
              topRole = persistedDashboard;
            } else if (roles.includes('superadmin') && lowerPath.includes('/admin')) {
              topRole = 'superadmin';
            } else if (roles.includes('admin') && lowerPath.includes('/admin')) {
              topRole = 'admin';
            } else {
              // fallback if no valid persisted dashboard
              const rolePriority = { seller: 1, buyer: 2 };
              const validRoles = roles.filter((r) => ['seller', 'buyer'].includes(r));
              if (validRoles.length > 0) {
                const sortedRoles = validRoles.sort((a, b) => rolePriority[a] - rolePriority[b]);
                topRole = sortedRoles[0];
              }
            }

            if (topRole) {
              dispatch(setCurrentDashboard(topRole)); // ✅ saves to localStorage too
            }
          }
        } catch (err) {
          console.error('User session check failed:', err);
        }
      }
    };
if (localStorage.getItem("lastActivity")) {
    fetchUser();

    // ✅ Run check every 10s (for testing; set to 30*60*1000 in prod)
    const intervalId = setInterval(() => {
      console.log('🔄 Checking session validity after refresh...');
      fetchUser();
    }, 31 * 60 * 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
    }
  }, [dispatch, isLoggedIn, pathname]);

  return null;
};

export default UserInitializer;
