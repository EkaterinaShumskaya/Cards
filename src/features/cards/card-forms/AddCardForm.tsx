import React, { FC, useState } from "react";
import { useAuthForm } from "common/hooks/useAuthForm";
import { createCardSchema } from "common/contacts/validators/validationShemes";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { packIdSelector } from "features/packs/packsSelector";
import { AddNewCardType, BasicCardForm } from "features/cards/card-forms/cards-basic-form/BasicCardForm";
import { ArgCreateCardType } from "features/cards/cards.api";


type AddCardFormType = {
  closeModal: () => void
}
export const AddCardForm: FC<AddCardFormType> = ({ closeModal }) => {
  const { register, handleSubmit, errors, reset } = useAuthForm<AddNewCardType>(createCardSchema);
  const { isLoadingApp } = useIsLoadingApp();

  const packId = useAppSelector(packIdSelector);

  const dispatch = useAppDispatch();

  const createNewCard = (data: AddNewCardType) => {
    if (packId) {
      const model: ArgCreateCardType = {
        cardsPack_id: packId,
        question: data.question,
        answer: data.answer,
        answerImg: data.answerImg,
        questionImg: data.questionImg
      };
      dispatch(cardsThunks.createCard(model));
      closeModal();
      reset();
    }
  };

  return (
    <>
      <BasicCardForm
        buttonText={"Save"}
        onSubmit={createNewCard}
        disabled={isLoadingApp}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        reset={reset}
        closeModal={closeModal} />
    </>
  );
};



