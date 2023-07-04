import React, { FC } from "react";
import s from "features/packs/pack-forms/PackForm.module.css";
import TextField from "@mui/material/TextField";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonBlue, buttonWhite } from "common/contacts/validators/theme";
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { AddNewCardType } from "features/cards/card-forms/cards-basic-form/BasicCardForm";


type TextFieldsPropsType = {
  onSubmit: (data: AddNewCardType) => void
  handleSubmit: UseFormHandleSubmit<AddNewCardType>
  register: UseFormRegister<AddNewCardType>
  errors: Partial<FieldErrorsImpl<{ answer: string; question: string }>>
  question?: string
  answer?: string
  buttonText: string
  disabled: boolean
  closeModal: () => void
}


export const TextFields: FC<TextFieldsPropsType> = ({
                                                      onSubmit,
                                                      handleSubmit,
                                                      register,
                                                      errors,
                                                      question,
                                                      answer,
                                                      buttonText,
                                                      disabled,
                                                      closeModal
                                                    }) => {

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        sx={{ m: 1, width: "320px" }}
        label="Question"
        variant="standard"
        {...register("question")}
        error={!!errors.question}
        helperText={errors.question?.message}
        defaultValue={question}
      />

      <TextField
        sx={{ m: 1, width: "320px" }}
        label="Answer"
        variant="standard"
        {...register("answer")}
        error={!!errors.answer}
        helperText={errors.answer?.message}
        defaultValue={answer}
      />

      <div className={s.button}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, "113px", "10px", "30px")}
          disabled={disabled}
          onClick={closeModal}
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          sx={sxButtonColorCreator(buttonBlue, "113px", "10px", "30px")}
          disabled={disabled}
        >
          Save
        </ButtonComponent>
      </div>
    </form>
  );
};


