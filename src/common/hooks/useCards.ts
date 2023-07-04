import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsSelector, packUserIdSelector, paramsCardsSelector } from "features/cards/cardsSelector";
import { GetParamsType } from "features/cards/cards.api";
import { cardsAction, cardsThunks } from "features/cards/cards.slice";
import { selectedPackSelector } from "features/packs/packsSelector";
import { userIdSelector } from "features/auth/authSelector";

export const useCards = () => {
  const params = useAppSelector(paramsCardsSelector);
  const cards = useAppSelector(cardsSelector);
  const packUserId = useAppSelector(packUserIdSelector);
  const selectedPack = useAppSelector(selectedPackSelector);
  const userId = useAppSelector(userIdSelector);

  const dispatch = useAppDispatch();
  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");
  const [timoutId, setTimeoutId] = useState<number | undefined>(undefined);


  const onDispatchCardsParams = useCallback((params: GetParamsType) => {
    dispatch(cardsAction.setCardsParams({ params }));
    dispatch(cardsThunks.getCards());
  }, []);


  const sortCardsHandler = useCallback(() => {
    onDispatchCardsParams({
      sortCards: sort ? "0updated" : "1updated"
    });
  }, [onDispatchCardsParams, sort]);

  const onChangePagination = useCallback(
    (page: string, pageCount: string) => {
      onDispatchCardsParams({ page, pageCount });
    },
    [onDispatchCardsParams]);

  const searchHandler = useCallback(
    (value: string) => {
      clearTimeout(timoutId);
      setTimeoutId(
        window.setTimeout(() => {
          onDispatchCardsParams({ cardQuestion: value });
          setTimeoutId(undefined);
        }, 850)
      );
    },
    [onDispatchCardsParams, timoutId]
  );
  const onChangeText = useCallback(
    (value: string) => {
      setSearch(value);
      searchHandler(value);
    },
    [searchHandler]
  );


  return {
    params,
    packUserId,
    cards,
    setSort,
    sort,
    sortCardsHandler,
    onChangePagination,
    search,
    setSearch,
    onChangeText,
    searchHandler,
    selectedPack,
    userId
  };

};

