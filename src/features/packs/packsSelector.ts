import { RootState } from "app/store";


export const packsSelector = (state: RootState) => state.packs.packs;
export const paramsSelector = (state: RootState) => state.packs.params;
export const isLoadingPacksSelector = (state: RootState) => state.packs.isLoading;
export const selectedPackSelector = (state: RootState) => state.packs.selectedPack;
export const packIdSelector = (state: RootState) => state.packs.selectedPack._id;

