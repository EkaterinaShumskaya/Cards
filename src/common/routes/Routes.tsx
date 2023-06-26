import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "common/contacts/path";
import { CheckEmail } from "features/auth/forgot-password/check-email/CheckEmail";
import { Registration } from "features/auth/registration/Registration";
import { PasswordRecovery } from "features/auth/forgot-password/password-recovery/PasswordRecovery";
import { NewPassword } from "features/auth/forgot-password/new-password/NewPassword";
import { Cards } from "features/cards/Cards";
import { Learn } from "features/learn/Learn";
import { Packs } from "features/packs/Packs";
import { Profile } from "features/profile/Profile";
import { Error404 } from "common/components/error404/Error404";
import { Login } from "features/auth/login/Login";


export const router = createBrowserRouter([
  {
    path: PATH.LOGIN,
    element: <Login />
  },
  {
    path: PATH.REGISTRATION,
    element: <Registration />
  },
  {
    path: PATH.PASSWORD_RECOVERY,
    element: <PasswordRecovery />
  },
  {
    path: PATH.CHECK_EMAIL + "/:email",
    element: <CheckEmail />
  },
  {
    path: PATH.NEW_PASSWORD,
    element: <NewPassword />
  },
  {
    path: PATH.ERROR404,
    element: <Error404 />
  }

]);

// export const Pages = () => {
//   return (
//     <Routes>
//       <Route path={PATH.LOGIN} element={<Login />} />
//       <Route path={PATH.REGISTRATION} element={<Registration />} />
//       <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
//       <Route path={PATH.CHECK_EMAIL + '/:email'} element={<CheckEmail />} />
//       <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
//       <Route path={PATH.ERROR404} element={<Error404 />} />
//
//       <Route path="/" element={<Navigate to={PATH.PACKS} />} />
//       <Route path={PATH.PROFILE} element={<Profile />} />
//       <Route path={PATH.PACKS} element={<Packs />} />
//       <Route path={PATH.CARDS} element={<Cards />} />
//       <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />
//
//     </Routes>
//
//   )


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
//   {
//     path: "/login",
//     element: <h1>Login</h1>,
//   },
//   {
//     path: "/register",
//     element: <h1>Register</h1>,
//   },
//   {
//     path: "/packs",
//     element: <h1>Packs</h1>,
//   },
// ]);

