import React from "react";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";
import { PackTableComponent } from "features/packs/packs-table/pack-table-component/PackTableComponent";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

export const PacksTable = () => {
  const { isLoadingApp } = useIsLoadingApp();
  const { sort, sortHandler, setSort } = usePacksQueryParams();

  return (
    <>
      <PackTableComponent
        disabled={isLoadingApp}
        tableCellForHeader={["Name", "Cards", "Last Updated", "Created by", "Actions"]}
        sort={sort}
        setSort={setSort}
        sortHandler={sortHandler}
      />

    </>

  );
};

