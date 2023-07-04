import React from "react";
import IconButton from "@mui/material/IconButton";
import s from "../profile/PersonalProfile.module.css";
import Avatar from "@mui/material/Avatar";
import { Tooltip } from "@mui/material";
import { Camera } from "@mui/icons-material";
import { useAppSelector } from "app/hooks";
import { EditableTitleComponent } from "common/components/editable-title/EditableTitleComponent";
import { useUploadImage } from "common/hooks/useUserAvatar";
import Typography from "@mui/material/Typography";
import { profileSelector } from "features/auth/authSelector";


export const PersonalProfile = () => {
  const profile = useAppSelector(profileSelector);
  const { userAvatar } = useUploadImage();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    userAvatar(e);
  };
  return (
    <div>
      <IconButton component="label" className={s.avatarContainer}>
        <Avatar alt="user_avatar" src={profile?.avatar}
                sx={{ width: "96px", height: "96px", mt: "30px" }}
        />
        <Tooltip title="Change photo" arrow sx={{ marginTop: "70px", fontSize: "20px" }}>
          <Camera />
        </Tooltip>
        <input
          onChange={handleAvatarChange}
          type="file"
          hidden
          accept="image/png, image/jpeg"
        />
      </IconButton>

      <EditableTitleComponent />
      <Typography>{profile?.email}</Typography>
    </div>
  );
};

