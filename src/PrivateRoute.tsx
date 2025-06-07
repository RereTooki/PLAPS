// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const userId = localStorage.getItem("user_id");
  return userId ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
