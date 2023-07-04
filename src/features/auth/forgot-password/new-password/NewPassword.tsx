import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import s from "features/auth/registration/Registration.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import { PATH } from "common/contacts/path";
import { PasswordInput } from "common/components/inputs/password-input/PasswordInput";
import { useAuthForm } from "common/hooks/useAuthForm";
import { createPasswordValidationSchema } from "common/contacts/validators/validationShemes";
import { SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { isRecoveredPasswordSelector } from "features/auth/authSelector";
import { isLoadingSelector } from "app/appSelector";

export interface INewPasswordForm {
  password: string;
}

export const NewPassword: FC = () => {
  const { register, handleSubmit, errors } = useAuthForm<INewPasswordForm>(createPasswordValidationSchema);
  const isRecoveredPassword = useAppSelector(isRecoveredPasswordSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { token } = useParams<{ token: string }>();

  console.log(token, "TOKEN");

  const onSubmit: SubmitHandler<INewPasswordForm> = (data) => {
    if (token)
      dispatch(authThunks.setNewPassword({
        password: data.password,
        resetPasswordToken: token
      }));
  };
  useEffect(() => {
    if (isRecoveredPassword) {
      navigate(PATH.LOGIN);
    }
  }, [isRecoveredPassword]);


  return (
    <div>
      <Box sx={sxBox(408)}>
        <Paper elevation={3}>
          <div className={s.paper_container}>
            <div className={s.title}>Create new password</div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
              <PasswordInput id="password" error={errors.password} register={register} />
              <p className={s.textInfo}>
                {`Create new password and we will send you further instructions to email`}
              </p>
              <ButtonComponent
                type="submit"
                sx={sxButtonCreator()}
                disabled={isLoading}
              >
                Create new password
              </ButtonComponent>
            </form>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

