import React, { FC } from "react";
import Box from "@mui/material/Box";
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import s from "./CheckEmail.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import emailImg from "../../../../assets/emailImg.svg";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "common/contacts/path";


export const CheckEmail: FC = () => {
  const navigate = useNavigate();

  const { email } = useParams<{ email: string }>();

  return (
    <div>
      <Box sx={sxBox(408)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Check Email</div>
            <img src={emailImg} alt="emailImg" />
            <p className={s.textInfo}>{`We’ve sent an Email with instructions to ${email}`}</p>
            <ButtonComponent
              type="submit"
              sx={sxButtonCreator("35px")}
              onClick={() => navigate(PATH.LOGIN)}
            >
              Back to login
            </ButtonComponent>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

