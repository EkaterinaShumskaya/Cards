import React, { useCallback, useEffect, useState } from "react";
import { GetPacksParamsType } from "features/packs/packs.api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { packsSelector, paramsSelector } from "features/packs/packsSelector";
import { useSearchParams } from "react-router-dom";
import { packsAction, packsThunks } from "features/packs/packs.slice";
import { userIdSelector } from "features/auth/authSelector";

export const usePacksQueryParams = () => {
  const params = useAppSelector(paramsSelector);
  const packs = useAppSelector(packsSelector);
  const userId = useAppSelector(userIdSelector);
  const [search, setSearch] = useState("");
  const [timoutId, setTimeoutId] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState(true);
  const [showCards, setShowCards] = useState(true);

  const [valueSlider, setValueSlider] = useState<number[]>([0, 100]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();


  useEffect(() => {
    const lastQueries: GetPacksParamsType = {};
    if (params.page) +params.page > 1 && (lastQueries.page = params.page);
    if (params.pageCount) +params.pageCount > 4 && (lastQueries.pageCount = params.pageCount);
    if (params.user_id?.length) lastQueries.user_id = params.user_id;
    if (params.min) +params.min > 0 && (lastQueries.min = params.min);
    if (params.max) +params.max !== 100 && (lastQueries.max = params.max);
    if (params.sortPacks)
      params.sortPacks === "1updated" && (lastQueries.sortPacks = params.sortPacks);
    if (params.packName?.length) lastQueries.packName = params.packName;
    setSearchParams({ ...lastQueries });
  }, [searchParams, params]);


  const onDispatchParams = useCallback((paramsArg: GetPacksParamsType) => {
    dispatch(packsAction.setQueryParams({ params: { ...paramsArg } }));
    dispatch(packsThunks.getPacks());
  }, []);


  const onClickShowPacksCards = useCallback(() => {
    if (showCards) {
      onDispatchParams({ user_id: userId, page: "1" });
    } else {
      onDispatchParams({ user_id: "", page: "1" });
    }
  }, [onDispatchParams, showCards, userId]);

  const onChangeSlider = useCallback(
    (min: string, max: string) => {
      onDispatchParams({ min, max, page: "1" });
    },
    [onDispatchParams]
  );

  const onChangePagination = useCallback(
    (page: string, pageCount: string) => {
      onDispatchParams({ page, pageCount });
    },
    [onDispatchParams]);

  const searchHandler = useCallback(
    (value: string) => {
      clearTimeout(timoutId);
      const newTimeoutId = setTimeout(
        () => onDispatchParams({ packName: value, page: "1" }),
        700
      );
      setTimeoutId(+newTimeoutId);
    },
    [onDispatchParams, timoutId]
  );
  const onChangeText = useCallback(
    (value: string) => {
      setSearch(value);
      searchHandler(value);
    },
    [searchHandler]
  );
  const sortHandler = useCallback(() => {
    onDispatchParams({
      sortPacks: sort ? "0updated" : "1updated",
      page: "1"
    });
  }, [onDispatchParams, sort]);


  const resetFilters = useCallback(() => {
    onDispatchParams({
      page: "1",
      pageCount: "4",
      min: "0",
      max: "100",
      user_id: "",
      packName: ""
    });
    setSearch("");
    setValueSlider([0, 100]);
    // setShowCards(true)
  }, [onDispatchParams]);


  return {
    params,
    packs,
    onChangeSlider,
    setValueSlider,
    valueSlider,
    searchParams,
    setSearchParams,
    onChangePagination,
    setSearch,
    search,
    onChangeText,
    searchHandler,
    sort,
    setSort,
    sortHandler,
    userId,
    resetFilters,
    showCards,
    setShowCards,
    onClickShowPacksCards


  };
};
