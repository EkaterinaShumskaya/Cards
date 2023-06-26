import React from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import dayjs from "dayjs";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";

export const PackTableBody = () => {
  const {packs } = usePacksQueryParams();
  return (
    <TableBody>
      {packs.cardPacks?.map((pack) => (
        <TableRow key={pack._id}>
          <TableCell>{pack.name}</TableCell>
          <TableCell>{pack.cardsCount}</TableCell>
          <TableCell>{dayjs(pack.updated).format("DD.MM.YYYY")}</TableCell>
          <TableCell>{pack.user_name}</TableCell>
          <TableCell>{}</TableCell>

        </TableRow>
      ))}
    </TableBody>
  );
};

