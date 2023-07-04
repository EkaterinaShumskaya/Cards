import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { authThunks } from "features/auth/auth.slice";

export const fulfilled = isFulfilled(
  authThunks.login,
  authThunks.logout,
  authThunks.register,
  authThunks.updateUserProFile,
  authThunks.setNewPassword,
  authThunks.forgotPassword,
  authThunks.authMe
);

export const pending = isPending(
  authThunks.login,
  authThunks.logout,
  authThunks.register,
  authThunks.updateUserProFile,
  authThunks.setNewPassword,
  authThunks.forgotPassword,
  authThunks.authMe
);

export const rejected = isRejectedWithValue(
  authThunks.login,
  authThunks.logout,
  authThunks.register,
  authThunks.updateUserProFile,
  authThunks.setNewPassword,
  authThunks.forgotPassword,
  authThunks.authMe
);