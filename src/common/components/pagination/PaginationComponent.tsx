import React, { FC } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";

export type PaginationComponentPropsType = {
  disabled?: boolean
  page: number
  pageCount: number
  totalCount: number
  onChange: (page: string, count: string) => void
}

export const PaginationComponent: FC<PaginationComponentPropsType> = ({
                                                                        page,
                                                                        pageCount,
                                                                        totalCount,
                                                                        onChange,
                                                                        disabled
                                                                      }) => {

  const lastPage = Math.ceil(totalCount / +pageCount) || 0;

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onChange(page + "", pageCount + "");
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    onChange(page + "", event.target.value);
  };


  return (
    <Box sx={{
      display: "center",
      alignItems: "center",
      width: "100%"

    }}>
      <Pagination
        page={+page || 1}
        count={lastPage}
        onChange={handlePaginationChange}
        disabled={disabled}
      />
      <FormControl sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "10px"
      }}>
        <Box component={"span"}>Show</Box>
        <Select
          disabled={disabled}
          autoWidth={false}
          sx={{ width: "60px", height: "40px" }}
          value={(pageCount || 4).toString()}
          onChange={handleSelectChange}
        >
          <MenuItem value={"4"}>4</MenuItem>
          <MenuItem value={"7"}>7</MenuItem>
          <MenuItem value={"10"}>10</MenuItem>
        </Select>
        <Box component={"span"}>Cards per Page</Box>
      </FormControl>

    </Box>

  );
};