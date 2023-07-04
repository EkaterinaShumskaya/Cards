import { RootState } from "app/store";

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
export const isRegisterSelector = (state: RootState) => state.auth.isRegistered;
export const isSentRecoveryEmailSelector = (state: RootState) => state.auth.isSentRecoveryEmail;
export const isRecoveredPasswordSelector = (state: RootState) => state.auth.isRecoveredPassword;
export const isInitializedSelector = (state: RootState) => state.auth.isInitialized;
export const profileSelector = (state: RootState) => state.auth.profile;

export const userIdSelector = (state: RootState) => state.auth.profile?._id;

