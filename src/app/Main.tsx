import { useAppDispatch, useAppSelector } from "app/hooks";
import { Container, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { authThunks } from "features/auth/auth.slice";
import { Outlet } from "react-router-dom";
import { isInitializedSelector } from "features/auth/authSelector";
import Box from "@mui/material/Box";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

export const Main = () => {
  const isInitialized = useAppSelector(isInitializedSelector);
  const { isLoadingApp } = useIsLoadingApp();
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(authThunks.authMe());
  }, []);


  return (
    <>
      <Box sx={{ height: "4px" }}>{isLoadingApp && <LinearProgress />}</Box>
      <Container fixed>{!isInitialized ? <div>Loading...</div> : <Outlet />}</Container>
    </>
  );
};

