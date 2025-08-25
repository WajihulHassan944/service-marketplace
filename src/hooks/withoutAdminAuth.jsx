"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function withoutAdminAuth(Component) {
  return function PublicOnlyAdminComponent(props) {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
      if (
        user.isHydrated &&
        user.isAuthenticated &&
        (user.role?.includes("superadmin") || user.role?.includes("admin"))
      ) {
        // If superadmin/admin tries to access /admin/login
        if (pathname === "/admin/login") {
          setRedirecting(true);

          // Look for ?redirect=... in URL
          const redirect = searchParams.get("redirect");

          if (redirect) {
            router.replace(redirect);
          } else {
            router.replace("/admin");
          }
        }
      }
    }, [user.isHydrated, user.isAuthenticated, user.role, pathname, searchParams, router]);

    // While Redux is hydrating
    if (!user.isHydrated) {
      return (
        <div className="auth-spinner-container">
          <div className="auth-spinner"></div>
        </div>
      );
    }

    // While redirecting
    if (redirecting) {
      return (
        <div className="auth-spinner-container">
          <div className="auth-spinner"></div>
        </div>
      );
    }

    // If authenticated superadmin/admin and still on login page → block it
    if (
      user.isAuthenticated &&
      (user.role?.includes("superadmin") || user.role?.includes("admin")) &&
      pathname === "/admin/login"
    ) {
      return null;
    }

    // Otherwise allow access
    return <Component {...props} />;
  };
}
