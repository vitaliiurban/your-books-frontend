import React from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
export default function DefaultLayout() {
  const { user } = useStateContext();
  // console.log(user?.token);
  if (!user?.token) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <div className={"app"}>
      <Header />
      <div className={"app__body "}>
        <Outlet />
      </div>
    </div>
  );
}
