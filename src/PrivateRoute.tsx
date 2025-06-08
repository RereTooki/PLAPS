// src/components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const userId = localStorage.getItem("user_id");
  return userId ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
