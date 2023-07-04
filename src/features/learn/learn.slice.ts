import { createSlice, isRejected, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "features/cards/cards.api";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";
import { learnAPI, SetGradePayloadType } from "features/learn/learn.api";
import { cardsAction } from "features/cards/cards.slice";
import { RootState } from "app/store";
import { toast } from "react-toastify";


const updateGrade = createAppAsyncThunk<void, SetGradePayloadType>(
  "learn/updateGrade", async (data, { rejectWithValue, dispatch, getState }) => {

    try {
      const state = getState() as RootState;
      const card_id = state.learn.currentCard._id;
      const grade = state.learn.grade;
      const cards = state.cards.cards.cards;

      const payload: SetGradePayloadType = { card_id, grade };
      const response = await learnAPI.updateGrade(payload);

      dispatch(
        cardsAction.setCards(
          cards.map(elem =>
            elem._id === response.data.updatedGrade.card_id
              ? {
                ...elem,
                grade: response.data.updatedGrade.grade,
                shots: response.data.updatedGrade.shots
              }
              : elem
          )
        )
      );
    } catch (e) {
      const error = errorNetworkUtil(e);
      return rejectWithValue(error);
    }
  });


const slice = createSlice({
  name: "learn",
  initialState: {
    isLoading: false,
    currentCard: {} as CardType,
    grade: 1,
    isShowAnswer: false,
    error: null as null | string

  },
  reducers: {
    setCurrentCard: (state, action: PayloadAction<CardType>) => {
      state.currentCard = action.payload;
    },
    setGrade: (state, action: PayloadAction<number>) => {
      state.grade = action.payload;
    },
    setIsShowAnswer: (state, action: PayloadAction<boolean>) => {
      state.isShowAnswer = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateGrade.pending, state => {
      state.isLoading = true;
    })
      .addCase(updateGrade.fulfilled, state => {
        state.isLoading = false;
      })
      .addMatcher(rejectedLearn, state => {
        state.isLoading = false;
      })
      .addMatcher(rejectedWithValueLearn, (state, action) => {
        state.error = action.payload as string | null;
        toast.error(state.error);
      });
  }

});


const rejectedLearn = isRejected(updateGrade);
const rejectedWithValueLearn = isRejectedWithValue(updateGrade);


export const learnReducer = slice.reducer;
export const learnAction = slice.actions;
export const learnThunks = { updateGrade };