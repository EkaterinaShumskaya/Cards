import { useModalComponent } from "common/hooks/useModalComponent";
import { AddPackForm } from "features/packs/pack-forms/AddPackForm";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { ModalComponent } from "common/components/modal/ModalComponent";
import React from "react";

export const PackHeader = () => {
  const { createModal, modalTitle, open, closeModal, modalChildren } = useModalComponent();

  const addPackHandler = () => {
    createModal("Add new pack", <AddPackForm closeModal={closeModal} />);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "30px", marginBottom: "60px" }}>
      <Typography sx={{ fontSize: "20px" }}>
        <b>Pack List</b>
      </Typography>
      <ButtonComponent onClick={addPackHandler}>
        Add New Pack
      </ButtonComponent>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>{modalChildren} </ModalComponent>
    </Box>
  );
};