import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreatePackType, GetPacksParamsType, packsApi, PacksResponseType, PackType } from "features/packs/packs.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";


const initialState = {
  packs: {} as PacksResponseType,
  params: {
    page: "1",
    pageCount: "4",
    min: "0",
    max: "100",
    user_id: "",
    packName: ""
  } as GetPacksParamsType,
  isLoading: false,
  selectedPack: {} as PackType,
  infoMessage: null as string | null
};

const getPacks = createAppAsyncThunk<{ packsPage: PacksResponseType }>("packs/getPacks", async (data, thunkAPI) => {
  const { getState, rejectWithValue } = thunkAPI;
  try {
    const searchParams = getState().packs.params;
    const res = await packsApi.getPacks(searchParams);
    return { packsPage: res.data };
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);
  }
});

const createPack = createAppAsyncThunk<{ pack: PackType }, CreatePackType>("packs/createPack", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await packsApi.createPack(arg);
    dispatch(packsThunks.getPacks());
    return { pack: res.data.newCardsPack };
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);

  }
});

const slice = createSlice({
    name: "packs",
    initialState: initialState,
    reducers: {
      setQueryParams: (state, actions: PayloadAction<{ params: GetPacksParamsType }>) => {
        state.params = { ...state.params, ...actions.payload.params };
      }
    },

    extraReducers: (builder) => {
      builder.addCase(getPacks.fulfilled, (state, action) => {
        state.packs = action.payload.packsPage;
        state.isLoading=false
      })
        .addCase(getPacks.pending,(state)=>{
          state.isLoading=true
        })
    }
  }
);

export const packsReducer = slice.reducer;
export const packsAction = slice.actions;
export const packsThunks = { getPacks, createPack };