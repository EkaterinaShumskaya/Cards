import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "common/contacts/path";
import { useAppSelector } from "app/hooks";
import { isLoggedInSelector } from "features/auth/authSelector";


export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);

  if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;
  return <Outlet />;


};