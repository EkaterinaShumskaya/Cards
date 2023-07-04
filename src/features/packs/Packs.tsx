import React, { useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { packsAction, packsThunks } from "features/packs/packs.slice";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";
import { PacksTable } from "features/packs/packs-table/PacksTable";
import { FilterPanel } from "features/packs/packs-filter-panel/FilterPanel";
import { PackHeader } from "features/packs/packs-table/PackHeader";


export const Packs = () => {

  const { searchParams } = usePacksQueryParams();
  const paramsSearch = Object.fromEntries(searchParams);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(packsAction.setQueryParams({ params: { ...paramsSearch } }));
    dispatch(packsThunks.getPacks());
  }, [dispatch]);


  return (
    <>
      <PackHeader />
      <FilterPanel>
        <PacksTable />
      </FilterPanel>
    </>

  );
};























