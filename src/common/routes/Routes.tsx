import { createHashRouter } from "react-router-dom";
import { PATH } from "common/contacts/path";
import { CheckEmail } from "features/auth/forgot-password/check-email/CheckEmail";
import { Registration } from "features/auth/registration/Registration";
import { PasswordRecovery } from "features/auth/forgot-password/password-recovery/PasswordRecovery";
import { NewPassword } from "features/auth/forgot-password/new-password/NewPassword";
import { Cards } from "features/cards/Cards";
import { Learn } from "features/learn/Learn";
import { Packs } from "features/packs/Packs";
import { Profile } from "features/profile/Profile";
import { Login } from "features/auth/login/Login";
import { PrivateRoutes } from "common/routes/PrivateRoutes";
import { ErrorPage } from "common/components/error404/ErrorPage";
import { Auth } from "common/routes/Auth";
import { App } from "app/App";


export const router = createHashRouter([
  {
    path: PATH.MAIN,
    element: <App />,
    children: [
      {
        path: PATH.MAIN,
        element: <PrivateRoutes />,
        children: [
          {
            path: PATH.CARDS,
            element: <Cards />
          },
          {
            path: PATH.PACKS,
            element: <Packs />
          },
          {
            path: PATH.PROFILE,
            element: <Profile />
          },
          {
            path: PATH.LEARN,
            element: <Learn />
          }
        ]
      },
      {
        path: PATH.AUTH,
        element: <Auth />,
        children: [
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
          }

        ]
      },
      {
        path: PATH.ERROR404,
        element: <ErrorPage />
      }

    ]
  }


]);