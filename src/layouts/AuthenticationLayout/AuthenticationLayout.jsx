import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function AuthenticationLayout() {
  const { user } = useStateContext();
  // Commited "if" allow user to login without auth
  if (user?.token) {
    return <Navigate to={"/catalog"} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
