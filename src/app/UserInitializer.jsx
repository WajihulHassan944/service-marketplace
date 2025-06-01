'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setCurrentDashboard } from '@/redux/features/userSlice';
import { baseUrl } from '@/const';

const UserInitializer = () => {
  const dispatch = useDispatch();
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
            dispatch(loginUser(data.user));

            // 👇 Determine currentDashboard just like in login logic
            const roles = data.user.role || [];
            const rolePriority = { seller: 1, buyer: 2 };
            const validRoles = roles.filter((r) => ['seller', 'buyer'].includes(r));

            if (validRoles.length > 0) {
              const sortedRoles = validRoles.sort((a, b) => rolePriority[a] - rolePriority[b]);
              const topRole = sortedRoles[0];
              dispatch(setCurrentDashboard(topRole));
            }
          }
        } catch (err) {
          console.error('User session check failed:', err);
        }
      }
    };

    fetchUser();
  }, [dispatch, isLoggedIn]);

  return null; // no UI
};

export default UserInitializer;
