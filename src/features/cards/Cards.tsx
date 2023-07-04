import React from "react";
import { CardsTable } from "features/cards/cards-table/CardsTable";
import { CardsFilterPanel } from "features/cards/cards-table/cards-filter-panel/CardsFilterPanel";
import { CardsHeader } from "features/cards/cards-table/CardsHeader";


export const Cards = () => {


  return (
    <div>
      <CardsHeader />
      <CardsFilterPanel>
        <CardsTable />
      </CardsFilterPanel>

    </div>
  );
};

