import React, { memo, useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import s from "features/packs/packs-table/pack-table-body/PackTableBody.module.css";
import { Rating, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import errorImg from "../../../../assets/errorImg.png";
import { useCards } from "common/hooks/useCards";
import { ActionButton } from "common/components/buttons/action-button/ActionButton";
import edit from "assets/edit-2.svg";
import deleteIcon from "assets/delete.svg";
import { ModalComponent } from "common/components/modal/ModalComponent";
import { useModalComponent } from "common/hooks/useModalComponent";
import { EditCardForm } from "features/cards/card-forms/EditCardForm";
import { DeleteForm } from "common/components/forms/DeleteForm";
import { useAppDispatch } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";

export const CardsTableBody = memo(() => {
  const { cards, userId, packUserId } = useCards();
  const { createModal, modalTitle, open, closeModal, modalChildren } = useModalComponent();
  const dispatch = useAppDispatch();
  const { isLoadingApp } = useIsLoadingApp();
  const tableHeaderSX = {
    ordWrap: "break-word",
    minWidth: "150px",
    maxWidth: "200px",
    wordBreak: "break-all",
    ":hover": {
      backgroundColor: "#f5f5f5"
    }
  };

  const [isQuestionImgBroken, setQuestionImgBroken] = useState(false);
  const [isAnswerImgBroken, setIsAnswerImgBroken] = useState(false);

  const errorHandler = (setBroken: (error: boolean) => void) => {
    setBroken(true);
  };


  const handleUpdateCard = (id: string, question: string, answer: string) => {
    createModal(
      "Edit card",
      <EditCardForm id={id} question={question} answer={answer} closeModal={closeModal} />
    );
  };

  const removeCardHandler = (id: string, name: string) => {
    const closeDeleteModal = () => {
      dispatch(cardsThunks.removeCard(id))
        .then(() => {
          closeModal();
        })
        .catch(() => {
        });
    };
    createModal("Delete card",
      <DeleteForm
        name={name}
        closeModal={closeDeleteModal} />);
  };


  return (
    <>
      <TableBody>
        {cards.cards?.map((card) => (
          <TableRow sx={tableHeaderSX} key={card._id}>
            <TableCell
              className={s.nameCell}
              component="th"
              scope="row"
            >
              <div className={s.nameContainer}>
                {isLoadingApp ? (
                  <Skeleton />
                ) : (
                  <div style={{ display: "flex" }}>
                    {card.questionImg && card.questionImg !== "noImg" ? (
                      <img
                        alt="img"
                        src={isQuestionImgBroken ? errorImg : card.questionImg}
                        onError={() => errorHandler(setQuestionImgBroken)}
                        className={s.cover}
                      />
                    ) : (
                      card.question
                    )}
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              {card.answerImg && card.answerImg !== "noImg" ? (
                <img
                  alt="img"
                  src={isAnswerImgBroken ? errorImg : card.answerImg}
                  onError={() => errorHandler(setIsAnswerImgBroken)}
                  className={s.cover}
                />
              ) : (
                card.answer
              )}
            </TableCell>
            <TableCell>{dayjs(card.updated).format("DD.MM.YYYY")}</TableCell>
            <TableCell>
              <Rating name="simple-controlled" readOnly value={card.grade} />
              {packUserId === userId && (
                <>
                  <ActionButton
                    onClick={() => handleUpdateCard(card._id, card.answer, card.question)}
                    icon={edit}
                    hint="update pack" />
                  <ActionButton
                    onClick={() => removeCardHandler(card._id, card.question)}
                    icon={deleteIcon}
                    hint="delete pack" />
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <ModalComponent title={modalTitle} open={open} handleClose={closeModal}>
        {modalChildren}
      </ModalComponent>

    </>
  );
});

