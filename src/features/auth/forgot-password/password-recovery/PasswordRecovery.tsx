import React, { useEffect, useState } from "react";
import { useAuthForm } from "common/hooks/useAuthForm";
import { ForgotPasswordType } from "features/auth/auth.api";
import { forgotValidationSchema } from "common/contacts/validators/validationShemes";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { authThunks } from "features/auth/auth.slice";
import { PATH } from "common/contacts/path";
import Box from "@mui/material/Box";
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import s from "./PasswordRecovery.module.css";
import TextField from "@mui/material/TextField";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import { SubmitHandler } from "react-hook-form";
import { emailMessage } from "common/contacts/emailMessage";
import { isSentRecoveryEmailSelector } from "features/auth/authSelector";
import { isLoadingSelector } from "app/appSelector";


export const PasswordRecovery = () => {
  const { register, handleSubmit, errors } = useAuthForm<ForgotPasswordType>(forgotValidationSchema);
  const isSentRecoveryEmail = useAppSelector(isSentRecoveryEmailSelector);
  const isLoading=useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    const model: ForgotPasswordType = {
      email: data.email,
      from: "Developer",
      message: emailMessage
    };
    setEmail(data.email);
    dispatch(authThunks.forgotPassword(model));
  };

  useEffect(() => {
    if (isSentRecoveryEmail) {
      navigate(`${PATH.CHECK_EMAIL}/${email}`);
    }
  }, [isSentRecoveryEmail]);


  return (
    <Box sx={sxBox(552)}>
      <Paper elevation={3}>
        <div className={s.paper_container}>
          <div className={s.title}>Forgot your password?</div>
          <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
            <TextField
              className={s.email}
              sx={{ m: 1, width: "347px" }}
              id="email"
              label="Email"
              variant="standard"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <div className={s.already}>{`Enter your email address and we well send you further instructions`}</div>

            <ButtonComponent
              type="submit"
              sx={sxButtonCreator("60px")}
              disabled={isLoading}
            >
              Send Instructions
            </ButtonComponent>
          </form>

          <div className={s.already}>{`Did you remember your password?`}</div>
          <NavLink className={s.singUp} to={PATH.LOGIN}>
            Try logging in
          </NavLink>
        </div>
      </Paper>
    </Box>
  );
};

