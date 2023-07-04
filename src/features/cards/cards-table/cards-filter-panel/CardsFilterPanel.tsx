import React, { FC } from "react";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import { Grid } from "@mui/material";
import { SearchInput } from "common/components/inputs/search-input/SearchInput";
import { PaginationComponent } from "common/components/pagination/PaginationComponent";
import { useCards } from "common/hooks/useCards";

type FilterPanelPropsType = {
  children: React.ReactNode
}

export const CardsFilterPanel: FC<FilterPanelPropsType> = ({ children }) => {
  const { isLoadingApp } = useIsLoadingApp();
  const { cards, onChangePagination, search, onChangeText } = useCards();


  return (
    <>
      <Grid>
        <SearchInput
          label="Search"
          value={search}
          onChange={onChangeText} />
      </Grid>
      {children}
      <Grid item md={12}>
        <PaginationComponent
          page={cards.page}
          pageCount={cards.pageCount}
          totalCount={cards.cardsTotalCount}
          onChange={onChangePagination}
          disabled={isLoadingApp}

        />
      </Grid>
    </>
  );
};

