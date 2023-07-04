import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Save } from "@mui/icons-material";
import { authThunks } from "features/auth/auth.slice";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Typography from "@mui/material/Typography";


export const EditableTitleComponent = () => {
  const profile = useAppSelector(state => state.auth.profile);
  const [newName, setNewName] = useState(profile?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    dispatch(authThunks.updateUserProFile({ name: newName }));

  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewName(newName);

  };

  return (
    <div>
      {!isEditing ? (<Typography
          sx={{
            fontSize: "15px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            marginLeft: "90px"
          }}
        >
          {newName}
          <IconButton onClick={handleEditClick}>
            <BorderColorIcon sx={{ color: "#000", fontSize: "15px" }} />
          </IconButton>
        </Typography>
      ) : (
        <>
          <TextField
            label="Name"
            variant="outlined"
            value={newName}
            onChange={handleNameChange}
            onBlur={handleCancelClick}
          />
          <IconButton onMouseDown={handleSaveClick}>
            <Save />
          </IconButton>

        </>
      )}
    </div>
  );
};