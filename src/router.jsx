import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.jsx";
import LoginLayout from "./layouts/LoginLayout/LoginLayout.jsx";

import Login from "./views/Login/Login.jsx";
import Catalog from "./views/Catalog/Catalog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Navigate to={"/login"} />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/catalog"} />,
      },
      {
        path: "/catalog",
        element: <Catalog />,
      },
    ],
  },
]);

export default router;
