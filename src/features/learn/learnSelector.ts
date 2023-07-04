import { RootState } from "app/store";


export const isLoadingLearnSelector = (state: RootState) => state.learn.isLoading;