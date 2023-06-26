import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { PATH } from "common/contacts/path";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const ProfileList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const handleLogout = () => {
    dispatch(authThunks.logout());
  };


  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate(PATH.PROFILE)}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

