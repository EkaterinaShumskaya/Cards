import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { packsAction, packsThunks } from "features/packs/packs.slice";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";
import { CardsCountSlider } from "common/components/slider/CardsCountSlider";
import { SearchInput } from "common/components/inputs/search-input/SearchInput";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { PacksTable } from "features/packs/packs-table/PacksTable";
import { isLoadingPacksSelector } from "features/packs/packsSelector";
import { LinearProgress } from "@mui/material";
import { ModalComponent } from "common/components/modal/ModalComponent";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import IconButton from "@mui/material/IconButton";
import { FilterPanel } from "features/packs/packs-filter-panel/FilterPanel";


export const PacksMain = () => {

  const {
    onChangeSlider,
    setValueSlider,
    valueSlider,
    searchParams,
    search,
    onChangeText, resetFilters
  } = usePacksQueryParams();
  const paramsSearch = Object.fromEntries(searchParams);
  const isLoading = useAppSelector(isLoadingPacksSelector);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(packsAction.setQueryParams({ params: { ...paramsSearch } }));
    dispatch(packsThunks.getPacks());
  }, [dispatch]);

  const addPackHandler = () => {
    const newPack = {
      name: "🦁" + Math.random()
    };
    dispatch(packsThunks.createPack(newPack));
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <>
      <ModalComponent />
      <ButtonComponent onClick={addPackHandler}>
        Add new pack
      </ButtonComponent>

     <FilterPanel>
       <PacksTable/>
     </FilterPanel>
    </>


  );
};






