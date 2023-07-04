import { createSlice, isFulfilled, isPending, isRejected, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import {
  CreatePackType,
  GetPacksParamsType,
  packsApi,
  PacksResponseType,
  PackType,
  UpdatePackPayloadType
} from "features/packs/packs.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";
import { toast } from "react-toastify";


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
  error: null as string | null,
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

const createPack = createAppAsyncThunk<{ infoMessage: string }, CreatePackType>("packs/createPack", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    const res = await packsApi.createPack(arg);
    dispatch(packsThunks.getPacks());
    return { infoMessage: `${res.data.newCardsPack.name} pack created` };
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);

  }
});

const updatePack = createAppAsyncThunk<{ updatedCardsPack: PackType, infoMessage: string }, UpdatePackPayloadType>("packs/updatePack",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await packsApi.updatePack(arg);
      dispatch(packsThunks.getPacks());
      return {
        infoMessage: `${res.data.updatedCardsPack.name} pack updated`,
        updatedCardsPack: res.data.updatedCardsPack
      };
    } catch (e) {
      const error = errorNetworkUtil(e);
      return rejectWithValue(error);
    }
  });

const removePack = createAppAsyncThunk<{ infoMessage: string }, string>("pack/removePack", async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    await packsApi.removePack(id);
    dispatch(packsThunks.getPacks());
    return {
      infoMessage: `Pack deleted`
    };
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
      },
      setSelectedPack: (state, action: PayloadAction<{ id: string }>) => {
        const pack = state.packs.cardPacks.find(pack => pack._id === action.payload.id);
        if (pack) state.selectedPack = pack;
      }
    },

    extraReducers: (builder) => {
      builder.addCase(getPacks.fulfilled, (state, action) => {
        state.packs = action.payload.packsPage;
        state.isLoading = false;
      }).addCase(updatePack.fulfilled, (state, action) => {
        state.selectedPack = action.payload.updatedCardsPack;
      })
        .addMatcher(pendingPacks, (state) => {
          state.isLoading = true;
        })
        .addMatcher(rejectedPacks, state => {
          state.isLoading = false;
        })
        .addMatcher(rejectedWithValuePacks, (state, action) => {
          state.error = action.payload as string | null;
          toast.error(state.error);
        })
        .addMatcher(fulfilledInfoMessage, (state, action) => {
          state.infoMessage = action.payload.infoMessage;
          toast.success(state.infoMessage);
        });

    }
  }
);

const fulfilledInfoMessage = isFulfilled(createPack, updatePack, removePack);
const rejectedPacks = isRejected(getPacks, createPack, updatePack, removePack);
const pendingPacks = isPending(getPacks, createPack, updatePack, removePack);
const rejectedWithValuePacks = isRejectedWithValue(getPacks, createPack, updatePack, removePack);

export const packsReducer = slice.reducer;
export const packsAction = slice.actions;
export const packsThunks = { getPacks, createPack, updatePack, removePack };

