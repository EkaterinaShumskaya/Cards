import React, { FC, useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import s from "../login/Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PATH } from "common/contacts/path";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { ArgLoginType } from "features/auth/auth.api";
import { useAuthForm } from "common/hooks/useAuthForm";
import { PasswordInput } from "common/components/inputs/password-input/PasswordInput";
import { loginValidationSchema } from "common/contacts/validators/validationShemes";
import { sxBox } from "common/utils/styles-utils/sxBox";
import { sxButtonCreator } from "common/utils/styles-utils/sxButtonCreator";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { isLoggedInSelector } from "features/auth/authSelector";
import { isLoadingSelector } from "app/appSelector";


export const Login: FC = () => {
  const {register, handleSubmit, errors } = useAuthForm<ArgLoginType>(loginValidationSchema);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const isLoading=useAppSelector(isLoadingSelector)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (arg: ArgLoginType) => {
    dispatch(authThunks.login(arg));
  };


  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.PACKS);
    }
  }, [isLoggedIn]);


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

            <div className={s.checkbox}>
              <Checkbox id="rememberMe" {...register("rememberMe")} />
              <span>Remember me</span>
            </div>
            <NavLink className={s.forgot} to={PATH.PASSWORD_RECOVERY}>
              Forgot Password?
            </NavLink>
            <ButtonComponent
              type="submit"
              sx={sxButtonCreator("60px")}
              disabled={isLoading}
            >
              Sign In
            </ButtonComponent>
          </form>

          <div className={s.already}>{`Don't have an account yet?`}</div>
          <NavLink className={s.singUp} to={PATH.REGISTRATION}>
            Sign up
          </NavLink>
        </div>
      </Paper>
    </Box>
  );
};





