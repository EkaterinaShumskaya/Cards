import { useAppSelector } from "app/hooks/useAppSelector";
import { isLoadingSelector } from "app/appSelector";
import { isLoadingPacksSelector } from "features/packs/packsSelector";
import { isLoadingCardsSelector } from "features/cards/cardsSelector";

export const useIsLoadingApp = () => {
  const isAuthLoading = useAppSelector(isLoadingSelector);
  const isPacksLoading = useAppSelector(isLoadingPacksSelector);
  const isCardsLoading = useAppSelector(isLoadingCardsSelector);
  const isLoadingApp = isAuthLoading || isPacksLoading || isCardsLoading;

  return {
    isLoadingApp
  };
};