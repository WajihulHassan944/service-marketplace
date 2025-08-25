"use client";

import { Suspense } from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function WithoutAdminAuthInner(Component, props) {
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
      if (pathname === "/admin/login") {
        setRedirecting(true);

        const redirect = searchParams.get("redirect");
        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace("/admin");
        }
      }
    }
  }, [user, pathname, searchParams, router]);

  if (!user.isHydrated || redirecting) {
    return (
      <div className="auth-spinner-container">
        <div className="auth-spinner"></div>
      </div>
    );
  }

  if (
    user.isAuthenticated &&
    (user.role?.includes("superadmin") || user.role?.includes("admin")) &&
    pathname === "/admin/login"
  ) {
    return null;
  }

  return <Component {...props} />;
}

export default function withoutAdminAuth(Component) {
  return function Wrapper(props) {
    return (
      <Suspense
        fallback={
          <div className="auth-spinner-container">
            <div className="auth-spinner"></div>
          </div>
        }
      >
        <WithoutAdminAuthInner Component={Component} {...props} />
      </Suspense>
    );
  };
}
