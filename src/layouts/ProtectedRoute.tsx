import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/auth.context";

function ProtectedRoute() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
