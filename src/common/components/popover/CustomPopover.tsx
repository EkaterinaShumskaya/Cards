import React, { FC, memo, ReactNode } from "react";
import Popover from "@mui/material/Popover";

type CustomPopoverPropsType = {
  anchorEl: HTMLButtonElement | null
  handleMenuClose: () => void
  children?: ReactNode
}

export const CustomPopover: FC<CustomPopoverPropsType> = memo(
  ({ handleMenuClose, anchorEl, children }) => {
    return (
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        {children}
      </Popover>
    );
  }
);