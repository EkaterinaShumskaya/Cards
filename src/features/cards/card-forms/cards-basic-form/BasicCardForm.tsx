import React, { FC, useState } from "react";
import { FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormReset } from "react-hook-form";
import { Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import Typography from "@mui/material/Typography";
import { TextFields } from "features/cards/card-forms/cards-basic-form/TextFields/TextFields";
import { PictureFields } from "features/cards/card-forms/cards-basic-form/PictureFields/PictureFields";


export type AddNewCardType = {
  answer?: string
  question?: string
  answerImg?: string
  questionImg?: string
}


type BasicCardModalPropsType = {
  buttonText: string
  onSubmit: (data: AddNewCardType) => void
  disabled: boolean
  question?: string
  answer?: string
  handleSubmit: UseFormHandleSubmit<AddNewCardType>
  register: UseFormRegister<AddNewCardType>
  errors: Partial<FieldErrorsImpl<{ answer: string; question: string }>>
  reset: UseFormReset<AddNewCardType>
  closeModal: () => void
}


export const BasicCardForm: FC<BasicCardModalPropsType> = ({
                                                             buttonText,
                                                             onSubmit,
                                                             disabled,
                                                             question,
                                                             answer,
                                                             handleSubmit,
                                                             register,
                                                             errors,
                                                             reset,
                                                             closeModal
                                                           }) => {

  const [select, setSelect] = useState("text");


  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };

  return (
    <>
        <FormControl sx={{ display:"flex", flexDirection:"column",mt:"25px"}}>
          <Typography sx={{ fontSize: "16px", fontWeight: "500", mb: "8px" }}>Choose a question format</Typography>
          <Select
            value={select}
            onChange={handleChange}
            displayEmpty size="small"
          >
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="picture">Picture</MenuItem>
          </Select>
        </FormControl>

      {select === "text" && (
        <>
          <TextFields
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            question={question}
            answer={answer}
            buttonText={buttonText}
            disabled={disabled}
            closeModal={closeModal}
          />
        </>
      )}

      {select === "picture" && (
        <PictureFields onSubmit={onSubmit} disabled={disabled} closeModal={closeModal} />
      )}
    </>
  );
};
