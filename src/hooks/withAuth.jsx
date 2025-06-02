'use client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const user = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!user?._id) {
        router.replace('/login'); // Redirect if not authenticated
      }
    }, [user, router]);

    // Prevent rendering if user is not loaded yet
    if (!user?._id) return null;

    return <Component {...props} />;
  };
}
