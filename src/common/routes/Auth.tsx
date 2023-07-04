import { useAppSelector } from "app/hooks";
import { isLoggedInSelector } from "features/auth/authSelector";
import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "common/contacts/path";

export const Auth = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const isInitialized = useAppSelector(state => state.auth.isInitialized);

  if (isLoggedIn && isInitialized) return <Navigate to={PATH.PACKS} />;
  return <Outlet />;

};
