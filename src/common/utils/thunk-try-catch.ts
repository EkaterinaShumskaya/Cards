import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";


export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  promise: Function
) => {
  const {rejectWithValue } = thunkAPI;
  try {
    return await promise();
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);
  }
};