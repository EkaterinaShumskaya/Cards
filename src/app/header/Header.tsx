import React from "react";
import s from "app/header/Header.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import incubatorLogo from "../../assets/incubator-logo.svg";
import { PATH } from "common/contacts/path";
import { useAppSelector } from "app/hooks";
import { isLoggedInSelector } from "features/auth/authSelector";
import { ProfileMenu } from "app/header/profile-menu/ProfileMenu";
import { useNavigate } from "react-router-dom";


export const Header = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const navigate = useNavigate();
  const loginHandler = () => navigate(PATH.LOGIN);
  const profile = useAppSelector(state => state.auth.profile);

  return (
    <header className={s.header}>
      <img
        src={incubatorLogo}
        alt="logo"
        className={s.logo}
        onClick={() => (isLoggedIn ? navigate(PATH.PACKS) : navigate(PATH.LOGIN))}
      />
      {profile ? (
        <ProfileMenu userName={profile.name} avatar={profile.avatar} />
      ) : (
        <ButtonComponent type="submit" sx={{ width: "113px" }} onClick={loginHandler}>
          Sign in
        </ButtonComponent>
      )}
    </header>
  );
};


