import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import learn from "assets/learn.svg";
import edit from "assets/edit.svg";
import deleteIcon from "assets/delete.svg";
import { ModalComponent } from "common/components/modal/ModalComponent";
import { useModalComponent } from "common/hooks/useModalComponent";
import { UpdatePackPayloadType } from "features/packs/packs.api";
import { packsThunks } from "features/packs/packs.slice";
import { EditPackForm } from "features/packs/pack-forms/EditPackForm";
import { DeleteForm } from "common/components/forms/DeleteForm";
import { useAppDispatch } from "app/hooks";
import { useCards } from "common/hooks/useCards";


export const CardsPopover = () => {
  const { createModal, modalTitle, open, closeModal, modalChildren } = useModalComponent();
  const { selectedPack } = useCards();
  const dispatch = useAppDispatch();


  const editPackHandler = (
    pack_id: string,
    name: string,
    onPrivate: boolean,
    deckCover: string
  ) => {
    const closeEditModal = (data: UpdatePackPayloadType) => {
      dispatch(packsThunks.updatePack(data))
        .then(() => {
          closeModal();
        })
        .catch(() => {
        });
    };

    createModal(
      "Edit pack",
      <EditPackForm
        pack_id={pack_id}
        name={name}
        onPrivate={onPrivate}
        closeModal={closeEditModal}
        deckCover={deckCover}
      />
    );
  };

  const removePackHandler = (pack_id: string, name: string) => {
    const closeDeleteModal = () => {
      dispatch(packsThunks.removePack(pack_id))
        .then(() => {
          closeModal();
        })
        .catch(() => {
        });
    };
    createModal("Delete pack",
      <DeleteForm
        name={name}
        closeModal={closeDeleteModal} />);
  };


  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon
              onClick={() => editPackHandler(selectedPack._id, selectedPack.name, selectedPack.private, selectedPack.deckCover)}>
              <img src={edit} />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon onClick={() => removePackHandler(selectedPack._id, selectedPack.name)}>
              <img src={deleteIcon} />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <img src={learn} />
            </ListItemIcon>
            <ListItemText primary="Learn" />
          </ListItemButton>
        </ListItem>
      </List>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>

  );
};

