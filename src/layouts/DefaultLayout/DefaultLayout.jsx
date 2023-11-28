import React from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const { user } = useStateContext();

  //   if (!user && !user?.token) {
  //     return <Navigate to={"/login"} />;
  //   }

  return (
    <div className={"app"}>
      <div className={"app__body "}>
        <Outlet />
      </div>
    </div>
  );
}
