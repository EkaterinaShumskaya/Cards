import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import React from "react";
import { CardsTableComponent } from "features/cards/cards-table/cards-table-component/CardsTableComponent";
import { useCards } from "common/hooks/useCards";

export const CardsTable = () => {
  const { isLoadingApp } = useIsLoadingApp();
  const { sort, setSort, sortCardsHandler } = useCards();
  return (
    <>
      <CardsTableComponent
        disabled={isLoadingApp}
        tableCellForHeader={["Question", "Answer", "Last Updated", "Grade"]}
        sort={sort}
        setSort={setSort}
        sortCardsHandler={sortCardsHandler}
      />

    </>
  );
};