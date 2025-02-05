import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./pages/404.jsx";
import LoginPage from "./pages/Auth/login.jsx";
import RegisterPage from "./pages/Auth/register.jsx";
import ProductPage from "./pages/product.jsx";
import UserPage from "./pages/user.jsx";
import Dashboard from "./pages/dashboard.jsx";

const rooter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <App />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    title: "Login Page",
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rooter} />
  </StrictMode>
);
