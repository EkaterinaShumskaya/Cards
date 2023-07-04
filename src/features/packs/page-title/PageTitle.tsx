import React, { FC, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type PageTitlePropsType = {
  title: string
}

export const PageTitle: FC<PageTitlePropsType> = memo(({ title }) => {
  return (
    <Box component={"h3"}>
      <Typography sx={{ fontWeight: "600", fontSize: "22px", wordBreak: "break-all" }}>{title}</Typography>
    </Box>
  );
});
