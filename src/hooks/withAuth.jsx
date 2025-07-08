import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const user = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (user.isHydrated && !user.isAuthenticated) {
        router.replace('/login');
      }
    }, [user.isHydrated, user.isAuthenticated, router]);

    if (!user.isHydrated) return null;
    if (!user.isAuthenticated) return null;

    return <Component {...props} />;
  };
}
