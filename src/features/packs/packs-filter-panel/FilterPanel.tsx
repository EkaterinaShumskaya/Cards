import { CardsCountSlider } from "common/components/slider/CardsCountSlider";
import { SearchInput } from "common/components/inputs/search-input/SearchInput";
import React, { FC } from "react";
import { ResetFilter } from "features/packs/packs-filter-panel/ResetFilter";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";
import { PaginationComponent } from "common/components/pagination/PaginationComponent";
import s from "./FilterPanel.module.css";
import { Grid } from "@mui/material";
import { SwitchButton } from "common/components/buttons/switch-button/SwitchButton";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

type FilterPanelPropsType = {
  children: React.ReactNode
}

export const FilterPanel: FC<FilterPanelPropsType> = ({ children }) => {
  const { isLoadingApp } = useIsLoadingApp();
  const {
    onChangeSlider,
    setValueSlider,
    valueSlider,
    search,
    onChangeText, resetFilters, packs, onChangePagination,
    showCards, setShowCards, onClickShowPacksCards
  } = usePacksQueryParams();


  return (
    <>
      <div className={s.container}>
        <Grid item md={3} display={"flex"} justifyContent={"flex-start"}>
          <SearchInput
            label="Search"
            value={search}
            onChange={onChangeText} />
        </Grid>

        <Grid item md={4} display={"flex"} justifyContent={"center"}>
          <SwitchButton
            onClick={onClickShowPacksCards}
            showCards={showCards}
            setShowCards={setShowCards}
            disabled={isLoadingApp}
          />
        </Grid>

        <Grid item md={4} display={"flex"} justifyContent={"center"}>
          <CardsCountSlider
            onChange={onChangeSlider}
            minMax={valueSlider}
            setMinMax={setValueSlider} />
        </Grid>
        <Grid item md={1} display={"flex"} justifyContent={"flex-end"}>
          <ResetFilter resetFilters={resetFilters} disabled={isLoadingApp} />
        </Grid>
      </div>

      {children}
      <Grid item md={12}>
        <PaginationComponent
          page={packs.page}
          pageCount={packs.pageCount}
          totalCount={packs.cardPacksTotalCount}
          onChange={onChangePagination}
          disabled={isLoadingApp}

        />
      </Grid>
    </>
  );
};

