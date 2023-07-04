import { createSlice } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  ArgRegisterType,
  authApi,
  AuthResponseType,
  ForgotPasswordType,
  ProfileType,
  RegisterResponseType,
  SetNewPassword,
  UpdateUserType
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunk-try-catch";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";


const register = createAppAsyncThunk<RegisterResponseType, ArgRegisterType>(
  "auth/register",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      await authApi.register(arg);
    });
  }
);


const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>(
  "auth/login", async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.login(arg);
      return { profile: res.data };
    });

  });

const forgotPassword = createAppAsyncThunk<AuthResponseType, ForgotPasswordType>(
  "auth/forgotPassword", async (data, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      return await authApi.forgotPassword(data);

    });
  });
const setNewPassword = createAppAsyncThunk<AuthResponseType, SetNewPassword>(
  "auth/setNewPassword", async (data, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      return await authApi.setNewPassword(data);

    });
  });
const authMe = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/authMe", async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.me();
      return { profile: res.data };
    } catch (e) {
      const error = errorNetworkUtil(e);
      return rejectWithValue(error);
    } finally {
      dispatch(setIsInitialized(true));
    }
  });


const logout = createAppAsyncThunk<AuthResponseType, void>("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.logout();
  });
});

const updateUserProFile = createAppAsyncThunk<{ profile: ProfileType }, UpdateUserType>("auth/updateUserProFile",
  async (data, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.updateUserProFile(data);
      return { profile: res.data.updatedUser };
    });
  });


const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false,
    isRegistered: false,
    isSentRecoveryEmail: false,
    isRecoveredPassword: false,
    isInitialized: false
  },
  reducers: {
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isLoggedIn = true;

    })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistered = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isSentRecoveryEmail = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.isRecoveredPassword = true;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false;
        state.profile = null;
      })
      .addCase(updateUserProFile.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  }


});

export const authReducer = slice.reducer;
export const { setIsInitialized } = slice.actions;
export const authThunks = { register, login, forgotPassword, setNewPassword, authMe, logout, updateUserProFile };

