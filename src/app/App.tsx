import "react-toastify/dist/ReactToastify.css";
import { Header } from "app/header/Header";
import { AppToast } from "common/components/app-toast/AppToast";
import { Main } from "app/Main";


export function App() {

  return (
    <>
      <Header />
      <Main />
      <AppToast />
    </>
  );
}

