import React, { ChangeEvent, FC, useState } from "react";
import s from "features/packs/pack-forms/PackForm.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonBlue, buttonWhite } from "common/contacts/validators/theme";
import { convertFileToBase64 } from "common/utils/convertFile";
import Box from "@mui/material/Box";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { AddNewCardType } from "features/cards/card-forms/cards-basic-form/BasicCardForm";
import noFile from "../../../../../assets/no-image.svg"


type PictureFieldsPropsType = {
  onSubmit: (data: AddNewCardType) => void
  disabled: boolean
  closeModal: () => void
  defaultImg?:string
}
export const PictureFields: FC<PictureFieldsPropsType> = ({ closeModal, onSubmit, disabled ,defaultImg}) => {
  const [questionImg, setQuestionImg] = useState<string | undefined>(undefined);
  const [answerImg, setAnswerImg] = useState<string | undefined>(undefined);


  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) convertFileToBase64(e.currentTarget.files[0], setQuestionImg);
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) convertFileToBase64(e.currentTarget.files[0], setAnswerImg);
  };

  const onClickSaveImg = () => {
    onSubmit({ questionImg, answerImg });

  };

  return (
    <>
      <Box component={"label"} sx={{ cursor: "pointer" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between",mt:"10px" }}>
          Question:
          <DriveFolderUploadIcon />
          <input
            type="file"
            onChange={onChangeQuestion}
            style={{ display: "none" }}
            accept="image/*"
          />
        </Box>
        <div
          style={{
            margin: '16px 0',
            height: '100px',
            background: `url(${
              questionImg || defaultImg || noFile
            }) no-repeat center/contain`,
          }}
        />
      </Box>
      <Box component={"label"} sx={{ cursor: "pointer" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          Answer:
          <DriveFolderUploadIcon />
          <input
            type="file"
            onChange={onChangeAnswer}
            style={{ display: "none" }}
            accept="image/*"
          />
        </Box>
        <div
          style={{
            margin: '16px 0',
            height: '100px',
            background: `url(${
              answerImg || defaultImg || noFile
            }) no-repeat center/contain`,
          }}
        />
      </Box>
      <div className={s.button}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, "113px", "10px", "30px")}
          disabled={disabled}
          onClick={closeModal}
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent
          onClick={onClickSaveImg}
          sx={sxButtonColorCreator(buttonBlue, "113px", "10px", "30px")}
          disabled={disabled}
        >
          Save
        </ButtonComponent>
      </div>
    </>
  );
};
