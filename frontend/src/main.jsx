import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./pages/404.jsx";
import LoginPage from "./pages/Auth/login.jsx";
import RegisterPage from "./pages/Auth/register.jsx";
import ProductPage from "./pages/product.jsx";
import UserPage from "./pages/user.jsx";
import Dashboard from "./pages/dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const rooter = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <PrivateRoute isPublic={true}>
        <LoginPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PrivateRoute isPublic={true}>
        <RegisterPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/product",
    element: (
      <PrivateRoute>
        <ProductPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <UserPage />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rooter} />
  </StrictMode>
);
