import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { CustomPopover } from "common/components/popover/CustomPopover";
import { ProfileList } from "features/profile/ProfileList";


type ProfileMenuPropsType = {
  userName: string
  avatar: string
}

export const ProfileMenu: FC<ProfileMenuPropsType> = ({ userName, avatar }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        component={"span"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
      >
        <Typography component={"span"} sx={{ fontWeight: "500", fontSize: "16px" }}>
          {userName}
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt="user_avatar" src={avatar} />
        </IconButton>
        <CustomPopover anchorEl={anchorEl} handleMenuClose={handleMenuClose}>
          <ProfileList />
        </CustomPopover>
      </Box>
    </>
  );
};




