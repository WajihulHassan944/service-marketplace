"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function withoutAuth(Component) {
  return function PublicOnlyComponent(props) {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
      if (user.isHydrated && user.isAuthenticated) {
        if (pathname === "/login" || pathname === "/register") {
          setRedirecting(true);

          // Look for ?redirect=... in URL
          const redirect = searchParams.get("redirect");

          if (redirect) {
            router.replace(redirect);
          } else if (user.currentDashboard === "seller") {
            router.replace("/seller/dashboard");
          } else if (user.currentDashboard === "buyer") {
            router.replace("/buyer/dashboard");
          }
        }
      }
    }, [user.isHydrated, user.isAuthenticated, user.currentDashboard, pathname, searchParams, router]);

    if (!user.isHydrated || redirecting) {
      return (
        <div className="auth-spinner-container">
          <div className="auth-spinner"></div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
