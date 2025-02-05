import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, isPublic }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (isPublic && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
