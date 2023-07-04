import React, { useState } from "react";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { BackPackLink } from "common/components/back-pack-list/BackPackLink";
import { PATH } from "common/contacts/path";
import { useCards } from "common/hooks/useCards";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PendingIcon from "@mui/icons-material/Pending";
import { CustomPopover } from "common/components/popover/CustomPopover";
import { CardsPopover } from "features/cards/cards-popover/CardsPopover";
import { useModalComponent } from "common/hooks/useModalComponent";
import { ModalComponent } from "common/components/modal/ModalComponent";
import { AddCardForm } from "features/cards/card-forms/AddCardForm";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "features/packs/page-title/PageTitle";


export const CardsHeader = () => {
  const { selectedPack, userId, packUserId, cards } = useCards();
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const { createModal, modalTitle, open, closeModal, modalChildren } = useModalComponent();
  const navigate = useNavigate();


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addCardHandler = () => {
    createModal("Add new card", <AddCardForm closeModal={closeModal} />);
  };

  const learnHandler = () => {
    navigate(PATH.LEARN);
  };

  return (
    <>

      <BackPackLink text={"Back to Packs List"} link={PATH.PACKS} />
      {packUserId === userId ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px"
            }}
          >
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <PageTitle title={selectedPack.name} />
              <IconButton onClick={handleClick} sx={{ height: "32px", p: "0" }}>
                <PendingIcon color={"primary"} />
              </IconButton>
            </Box>
            <CustomPopover anchorEl={anchorEl} handleMenuClose={handleClose}>
              <CardsPopover />
            </CustomPopover>
            <ButtonComponent onClick={addCardHandler}>Add new card</ButtonComponent>
          </Box>
          <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>{modalChildren} </ModalComponent>
        </>

      ) : (
        <>
          <Box display={"flex"} justifyContent={"space-between"}
               alignItems={"center"} marginTop={"50px"} marginBottom={"30px"}>
            <PageTitle title={selectedPack.name} />
            <ButtonComponent onClick={learnHandler}
                             disabled={selectedPack.cardsCount === 0}
            >
              Learn Pack
            </ButtonComponent>
          </Box>
        </>
      )}
    </>
  );
};


