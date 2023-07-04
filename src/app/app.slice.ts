import { createSlice } from "@reduxjs/toolkit";
import { fulfilled, pending, rejected } from "common/utils/matcher";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(pending, state => {
        state.isLoading = true;
      })
      .addMatcher(fulfilled, state => {
        state.isLoading = false;
      })
      .addMatcher(rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.isLoading = false;
        if (state.error) {
          toast.error(state.error);
        }
      });
  }
});

export const appReducer = slice.reducer;


