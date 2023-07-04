import React, { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import s from "./Registration.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "common/contacts/path";
import Box from "@mui/material/Box";
import { sxBox } from "common/utils/styles-utils/sxBox";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { PasswordInput } from "common/components/inputs/password-input/PasswordInput";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import { SubmitHandler } from "react-hook-form";
import { useAuthForm } from "common/hooks/useAuthForm";
import { registrationValidationSchema } from "common/contacts/validators/validationShemes";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { isRegisterSelector } from "features/auth/authSelector";


type IFormInput = {
  email: string
  password: string
  confirmPassword: string
}
export const Registration = () => {

  const { register, handleSubmit, errors } = useAuthForm<IFormInput>(registrationValidationSchema);
  const isRegistered = useAppSelector(isRegisterSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(authThunks.register(data));
  };


  useEffect(() => {
    if (isRegistered) {
      navigate(PATH.LOGIN);
    }
  }, [isRegistered]);


  return (
    <Box sx={sxBox(552)}>
      <Paper elevation={3}>
        <div className={s.paper_container}>
          <div className={s.title}>Sign in</div>
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
            <PasswordInput id="password" error={errors.password} register={register} />
            <PasswordInput id="confirmPassword" error={errors.confirmPassword} register={register} />

            <ButtonComponent
              type="submit"
              sx={sxButtonCreator("60px")}
              // disabled={appStatus === 'loading'}
            >
              Sign up
            </ButtonComponent>
          </form>

          <div className={s.already}>{`Already have an account?`}</div>
          <NavLink className={s.singUp} to={PATH.LOGIN}>
            Sign in
          </NavLink>
        </div>
      </Paper>
    </Box>
  );
};




