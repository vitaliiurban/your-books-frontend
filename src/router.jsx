import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.jsx";
import AuthenticationLayout from "./layouts/authenticationLayout/authenticationLayout.jsx";

import SignIn from "./views/SignIn/SignIn.jsx";
import SignUp from "./views/SignUp/SignUp.jsx";

import Catalog from "./views/Catalog/Catalog.jsx";
import Home from "./views/Home/Home.jsx";
import SinglePage from "./views/SinglePage/SinglePage.jsx";

import UserProfile from "./views/UserProfile/UserProfile.jsx";
import UserSettings from "./views/UserSettings/UserSettings.jsx";

import Reserves from "./views/Reserves/Reserves.jsx";
import Favorites from "./views/Favorites/Favorites.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/sign-in"} />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Navigate to={"/sign-in"} />,
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
        children: [
          {
            index: true,
            element: <Catalog />,
          },
          {
            path: ":id",
            element: <SinglePage />,
          },
        ],
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/reserves",
        element: <Reserves />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "/user-settings",
        element: <UserSettings />,
      },
      {
        path: "/user-settings",
        element: <UserSettings />,
      },
    ],
  },
]);

export default router;
