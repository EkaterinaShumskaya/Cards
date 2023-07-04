import React from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import dayjs from "dayjs";
import { usePacksQueryParams } from "common/hooks/usePacksQueryParams";
import learn from "../../../../assets/learn.svg";
import edit from "../../../../assets/edit-2.svg";
import deleteIcon from "../../../../assets/delete.svg";
import { useNavigate } from "react-router-dom";
import { PATH } from "common/contacts/path";
import { Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./PackTableBody.module.css";
import { ActionButton } from "common/components/buttons/action-button/ActionButton";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import { packsAction, packsThunks } from "features/packs/packs.slice";
import { UpdatePackPayloadType } from "features/packs/packs.api";
import { useModalComponent } from "common/hooks/useModalComponent";
import { EditPackForm } from "features/packs/pack-forms/EditPackForm";
import { ModalComponent } from "common/components/modal/ModalComponent";
import { DeleteForm } from "common/components/forms/DeleteForm";
import { cardsAction, cardsThunks } from "features/cards/cards.slice";
import errorImg from "../../../../assets/errorImg.png";
import { packIdSelector } from "features/packs/packsSelector";


export const PackTableBody = () => {
  const { userId, packs } = usePacksQueryParams();
  const navigate = useNavigate();
  const { createModal, modalTitle, open, closeModal, modalChildren } = useModalComponent();
  const { isLoadingApp } = useIsLoadingApp();
  const dispatch = useAppDispatch();


  const tableHeaderSX = {
    ordWrap: "break-word",
    minWidth: "150px",
    maxWidth: "200px",
    wordBreak: "break-all",
    ":hover": {
      backgroundColor: "#f5f5f5"
    }
  };

  const startLearnHandler = async (id: string) => {
    dispatch(packsAction.setSelectedPack({ id }));
    dispatch(cardsAction.setSelectedCardsPackId(id));
    await dispatch(cardsThunks.getCards());
    navigate(PATH.LEARN);
  };


  const navigateToCardsHandler = (id: string, packPrivate: boolean) => {
    dispatch(packsAction.setSelectedPack({ id }));
    dispatch(cardsAction.setSelectedCardsPackId(id));
    navigate(`${PATH.CARDS}/?packId=${id}&packPrivate=${packPrivate}`);
    dispatch(cardsThunks.getCards());
  };
  const imgErrorHandler = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    error.currentTarget.src = errorImg;
  };

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
      <TableBody>
        {packs.cardPacks?.map((pack) => (
          <TableRow sx={tableHeaderSX} key={pack._id}>
            <TableCell
              onClick={() => navigateToCardsHandler(pack._id, pack.private)}
              className={s.nameCell}
              component="th"
              scope="row"
            >
              <div className={s.nameContainer}>
                {isLoadingApp ? (
                  <Skeleton />
                ) : (
                  <div style={{ display: "flex" }}>
                    {pack.deckCover && (
                      <img
                        alt="img"
                        src={pack.deckCover}
                        className={s.cover}
                        onError={imgErrorHandler}
                      />
                    )}
                    <div className={s.name}>{pack.name}</div>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>{pack.cardsCount}</TableCell>
            <TableCell>{dayjs(pack.updated).format("DD.MM.YYYY")}</TableCell>
            <TableCell>{pack.user_name}</TableCell>
            <TableCell>
              {isLoadingApp ? (<Skeleton />) : <>
                <ActionButton
                  icon={learn}
                  hint="start learning"
                  disabled={pack.cardsCount === 0}
                  onClick={() => startLearnHandler(pack._id)}
                />
                {pack.user_id === userId && (
                  <>
                    <ActionButton
                      onClick={() => editPackHandler(pack._id, pack.name, pack.private, pack.deckCover)}
                      icon={edit}
                      hint="update pack" />
                    <ActionButton
                      onClick={() => removePackHandler(pack._id, pack.name)}
                      icon={deleteIcon}
                      hint="delete pack" />
                  </>
                )}
              </>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>
    </>
  );
};

