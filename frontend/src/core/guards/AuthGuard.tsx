import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../utils/hooks/useAuth";

export default function AuthGuard() {
  const { user, refreshUser, isFetchingUser, hasTriedFetchingUser } = useAuth();

  useEffect(() => {
    if (!hasTriedFetchingUser) {
      void refreshUser();
    }
  }, [hasTriedFetchingUser, refreshUser]);

  if (!hasTriedFetchingUser || isFetchingUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <img
          src="logo.svg"
          alt="logo"
          className="animate-pulse-slow opacity-90"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
