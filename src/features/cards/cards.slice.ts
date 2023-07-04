import { createSlice, isFulfilled, isPending, isRejected, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import {
  ArgCreateCardType,
  ArgUpdateCardType,
  cardsApi,
  CardsResponseType,
  CardType,
  GetCardsParamsType,
  GetParamsType
} from "features/cards/cards.api";
import { errorNetworkUtil } from "common/utils/styles-utils/errorNetworkUtil";
import { toast } from "react-toastify";


const initialState = {
  cards: {} as CardsResponseType,
  params: {
    page: "1",
    pageCount: "4",
    min: "0",
    max: "100",
    cardsPack_id: "",
    cardAnswer: "",
    cardQuestion: "",
    sortCards: "0updated"
  } as GetCardsParamsType,
  selectedCardsPackId: "" as string,
  isLoading: false,
  error: null as string | null,
  infoMessage: null as string | null,
  card: {} as CardType
};


const getCards = createAppAsyncThunk<{ cardsPage: CardsResponseType }>("cards/getCards", async (arg, thunkAPI) => {
  const { dispatch, getState, rejectWithValue } = thunkAPI;
  try {
    const params = {
      ...getState().cards.params,
      cardsPack_id: getState().cards.selectedCardsPackId
    };
    const res = await cardsApi.getCards(params);
    return { cardsPage: res.data };
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);
  }

});

const createCard = createAppAsyncThunk<{ newCard: CreateCardDataType, infoMessage: string },
  ArgCreateCardType>("cards/createCard", async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await cardsApi.createCard(data);
    dispatch(cardsThunks.getCards());
    return {
      newCard: {
        question: res.data.newCard.question,
        answer: res.data.newCard.answer
      },
      infoMessage: "Card created!"
    };
  } catch (e) {
    const error = errorNetworkUtil(e);
    return rejectWithValue(error);
  }
});

const updateCard = createAppAsyncThunk<{ updatedCard: CreateCardDataType, infoMessage: string }, ArgUpdateCardType>(
  "cards/updateCard", async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await cardsApi.updateCard(data);
      dispatch(cardsThunks.getCards());
      return {
        updatedCard: {
          question: res.data.updatedCard.question,
          answer: res.data.updatedCard.answer
        },
        infoMessage: "Card updated!"
      };
    } catch (e) {
      const error = errorNetworkUtil(e);
      return rejectWithValue(error);
    }
  });

const removeCard = createAppAsyncThunk<{ deletedCard: CreateCardDataType, infoMessage: string }, string>(
  "cards/removeCard", async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await cardsApi.removeCard(id);
      dispatch(cardsThunks.getCards());
      return {
        deletedCard: {
          question: res.data.deletedCard.question,
          answer: res.data.deletedCard.answer
        },
        infoMessage: `Card removed!`
      };
    } catch (e) {
      const error = errorNetworkUtil(e);
      return rejectWithValue(error);
    }
  });


const slice = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    setCardsParams: (state, action: PayloadAction<{ params: GetParamsType }>) => {
      state.params = { ...state.params, ...action.payload.params };
    },
    setSelectedCardsPackId: (state, action: PayloadAction<string>) => {
      state.selectedCardsPackId = action.payload;
    },
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards.cards = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload.cardsPage;
        state.isLoading = false;
      })
      .addMatcher(cardsPending, state => {
        state.isLoading = true;
      })
      .addMatcher(fulfilledInfoMessage, (state, action) => {
        state.infoMessage = action.payload.infoMessage;
        toast.success(state.infoMessage);
      })
      .addMatcher(rejectedCards, state => {
        state.isLoading = false;
      })
      .addMatcher(rejectedWithValueCards, (state, action) => {
        state.error = action.payload as string | null;
        toast.error(state.error);

      });

  }
});


export type CreateCardDataType = {
  answer?: string
  question?: string

}

const cardsPending = isPending(getCards, createCard, updateCard, removeCard);
const fulfilledInfoMessage = isFulfilled(createCard, updateCard, removeCard);
const rejectedCards = isRejected(getCards, createCard, updateCard, removeCard);
const rejectedWithValueCards = isRejectedWithValue(getCards, createCard, updateCard, removeCard);

export const cardsReducer = slice.reducer;
export const cardsAction = slice.actions;
export const cardsThunks = { getCards, createCard, updateCard, removeCard };


