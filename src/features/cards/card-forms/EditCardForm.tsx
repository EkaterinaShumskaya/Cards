import React, { FC } from "react";
import { createCardSchema } from "common/contacts/validators/validationShemes";
import { AddNewCardType, BasicCardForm } from "features/cards/card-forms/cards-basic-form/BasicCardForm";
import { useAuthForm } from "common/hooks/useAuthForm";
import { useAppDispatch } from "app/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

type EditCardModalPropsType = {
  id: string
  question: string
  answer: string
  closeModal: () => void
}
export const EditCardForm: FC<EditCardModalPropsType> = ({ id, question, answer, closeModal }) => {
  const { register, handleSubmit, errors, reset } =
    useAuthForm<AddNewCardType>(createCardSchema);
  const dispatch = useAppDispatch();
  const { isLoadingApp } = useIsLoadingApp();

  const handleEditCard = (data: AddNewCardType) => {
    const payload = {
      _id: id,
      answer: data.answer,
      question: data.answer,
      questionImg: data.questionImg || "noImg",
      answerImg: data.answerImg || "noImg"
    };

    dispatch(cardsThunks.updateCard(payload))
      .then(() => {
        closeModal();
      })
      .catch(() => {
      });
  };

  return (
    <BasicCardForm
      buttonText={"Save"}
      onSubmit={handleEditCard}
      disabled={isLoadingApp}
      question={question}
      answer={answer}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      reset={reset}
      closeModal={closeModal}
    />
  );
};

