import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsSelector, packUserIdSelector, paramsCardsSelector } from "features/cards/cardsSelector";
import { GetParamsType } from "features/cards/cards.api";
import { useSearchParams } from "react-router-dom";
import { cardsAction, cardsThunks } from "features/cards/cards.slice";
import { selectedPackSelector } from "features/packs/packsSelector";
import { userIdSelector } from "features/auth/authSelector";

export const useCardsQueryParams = () => {
  const params = useAppSelector(paramsCardsSelector);
  const cards = useAppSelector(cardsSelector);
  const packUserId = useAppSelector(packUserIdSelector);
  const selectedPack=useAppSelector(selectedPackSelector)
  const userId = useAppSelector(userIdSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState(true);
  const [search, setSearch] = useState("");
  const [timoutId, setTimeoutId] = useState<number | undefined>(undefined);

  // useEffect(()=>{
  //   const lastQueries:GetParamsType={};
  //   if (params.page) +params.page>1 && (lastQueries.page = params.page)
  //   if (params.pageCount) +params.pageCount > 4 && (lastQueries.pageCount = params.pageCount);
  //   if (params.min) +params.min > 0 && (lastQueries.min = params.min);
  //   if (params.max) +params.max !== 100 && (lastQueries.max = params.max);
  //   if (params.sortCards)
  //     params.sortCards === '0updated' && (lastQueries.sortCards = params.sortCards);
  //   setSearchParams({ ...lastQueries });
  // },[params])


  const onDispatchCardsParams=useCallback((params: GetParamsType) => {
    dispatch(cardsAction.setCardsParams({params }));
    dispatch(cardsThunks.getCards());
  }, []);


  const sortCardsHandler=useCallback(()=>{
    onDispatchCardsParams ({
      sortCards: sort ? '0updated' : '1updated'
    })
  },[onDispatchCardsParams,sort])

  const onChangePagination = useCallback(
    (page: string, pageCount: string) => {
      onDispatchCardsParams({ page, pageCount });
    },
    [onDispatchCardsParams]);

  const searchHandler = useCallback(
    (value: string) => {
      clearTimeout(timoutId);
      const newTimeoutId = setTimeout(
        () => onDispatchCardsParams({ cardQuestion: value, page: "1" }),
        700
      );
      setTimeoutId(+newTimeoutId);
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
  }

};

