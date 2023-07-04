import React, { ChangeEvent, FC } from "react";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import s from "./SearchInput.module.css";
import find from "../../../../assets/find.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type SearchInputType = {
  label: string,
  value: string,
  onChange: (value: string) => void
}


export const SearchInput: FC<SearchInputType> = ({ value, onChange, label }) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <Box>
      <Typography sx={{ fontSize: "16px", fontWeight: "500", mb: "8px" }}>
        {label}
      </Typography>
      <Paper
        component="form"
        elevation={0}
        className={s.container}
        sx={{ background: "transparent" }}
      >
        <img src={find} className={s.findIcon} alt="find" />
        <InputBase
          className={s.input}
          value={value}
          onChange={onChangeHandler}
          placeholder="Provide your text"
          inputProps={{ "aria-label": "provide your text" }}
        />
      </Paper>
    </Box>
  );
};

