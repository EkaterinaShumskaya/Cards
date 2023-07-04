import React, { FC, memo } from "react";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropDown";
import { PackTableBody } from "features/packs/packs-table/pack-table-body/PackTableBody";


type PackTableHeadType = {
  disabled?: boolean,
  tableCellForHeader: string[]
  sortHandler: () => void
  setSort: (value: boolean) => void
  sort: boolean
}

export const PackTableComponent: FC<PackTableHeadType> = memo(({
                                                                 disabled,
                                                                 tableCellForHeader,
                                                                 sort,
                                                                 setSort,
                                                                 sortHandler
                                                               }) => {

  const tableHeaderSX = {
    ordWrap: "break-word",
    minWidth: "150px",
    maxWidth: "200px",
    wordBreak: "break-all"
  };

  const onclickSortHandler = () => {
    sortHandler();
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
        <PackTableBody />
      </Table>
    </TableContainer>
  );
});

