import { RootState } from "app/store";

export const isLoadingCardsSelector = (state: RootState) => state.cards.isLoading;
export const paramsCardsSelector = (state: RootState) => state.cards.params;
export const cardsSelector = (state: RootState) => state.cards.cards;
export const packUserIdSelector = (state: RootState) => state.cards.cards.packUserId;