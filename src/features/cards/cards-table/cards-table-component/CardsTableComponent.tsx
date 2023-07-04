import React, { FC, memo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropUp";
import { CardsTableBody } from "features/cards/cards-table/cards-table-body/CardsTableBody";


type CardsTableComponentType = {
  disabled?: boolean,
  tableCellForHeader: string[],
  sort: boolean,
  setSort: (value: boolean) => void
  sortCardsHandler: () => void;
}

export const CardsTableComponent: FC<CardsTableComponentType> = memo(({
                                                                        disabled,
                                                                        tableCellForHeader,
                                                                        sort,
                                                                        setSort,
                                                                        sortCardsHandler
                                                                      }) => {
  const tableHeaderSX = {
    ordWrap: "break-word",
    minWidth: "150px",
    maxWidth: "200px",
    wordBreak: "break-all"
  };

  const onclickSortHandler = () => {
    sortCardsHandler();
    setSort(!sort);
  };


  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px", marginBottom: "30px" }}>
      <Table sx={{ minWidth: "650px" }}>
        <TableHead>
          <TableRow sx={{ background: "#EFEFEF" }}>
            {tableCellForHeader.map(textHead => (
              <TableCell sx={tableHeaderSX} key={textHead}>
                {textHead}
                {textHead === "Last Updated" && (
                  <IconButton disabled={disabled} onClick={onclickSortHandler}>
                    {sort ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <CardsTableBody />
      </Table>
    </TableContainer>
  );
});

