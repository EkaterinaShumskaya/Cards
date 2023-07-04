import React from "react";
import Box from "@mui/material/Box";
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import s from "../profile/Profile.module.css";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { PersonalProfile } from "features/profile/PersonalProfile";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import logoutImg from "../../assets/logout.svg";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonWhite } from "common/contacts/validators/theme";
import { BackPackLink } from "common/components/back-pack-list/BackPackLink";
import { PATH } from "common/contacts/path";


export const Profile = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  return (
    <div className={s.mainContainer}>
      <BackPackLink text={"Back to Packs Link"} link={PATH.PACKS} />
      <Box sx={sxBox(400)}>
        <Paper elevation={3}>
          <div className={s.profileContainer}>
            <div className={s.title}>Personal Information</div>
            <PersonalProfile />
            <ButtonComponent sx={sxButtonColorCreator(buttonWhite)} onClick={logoutHandler}>
              <img src={logoutImg} alt="logout" className={s.logoutImg} /> Log out
            </ButtonComponent>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

