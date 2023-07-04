import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

type ResetFilterPropsType = {
  disabled?: boolean
  resetFilters: () => void
}
export const ResetFilter: FC<ResetFilterPropsType> = ({ disabled, resetFilters }) => {

  const onClickHandler = () => {
    resetFilters();
  };
  return (
    <IconButton onClick={onClickHandler} disabled={disabled}>
      <FilterAltOffIcon />
    </IconButton>
  );
};