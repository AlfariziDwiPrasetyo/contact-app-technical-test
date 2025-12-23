import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/main/HomePage";
import CreateContactPage from "./pages/main/CreateContactPage";
import NotFound from "./pages/NotFound";
import UpdateContactPage from "./pages/main/UpdateContactPage";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "/create",
                element: <CreateContactPage />,
              },
              {
                path: "/update/:id",
                element: <UpdateContactPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
