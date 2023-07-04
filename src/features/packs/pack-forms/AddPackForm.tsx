import { FormControlLabel } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import TextField from "@mui/material/TextField";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import Checkbox from "@mui/material/Checkbox";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "app/hooks";
import { useAuthForm } from "common/hooks/useAuthForm";
import s from "./PackForm.module.css";
import { addPackSchema } from "common/contacts/validators/validationShemes";
import { SubmitHandler } from "react-hook-form";
import { CreatePackType } from "features/packs/packs.api";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonBlue, buttonWhite } from "common/contacts/validators/theme";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import Box from "@mui/material/Box";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { convertFileToBase64 } from "common/utils/convertFile";
import noFile from "../../../assets/no-image.svg"


export type AddFormType = {
  name: string
  private: boolean

}

type AddPackFormType = {
  closeModal: () => void
  defaultImg?:string
}
export const AddPackForm: FC<AddPackFormType> = ({ closeModal,defaultImg }) => {
  const [coverImg, setCoverImg] = useState<string | undefined>(undefined);
  const [packStatus, setPackStatus] = useState(false);
  const { register, handleSubmit, errors, reset } = useAuthForm<AddFormType>(addPackSchema);
  const { isLoadingApp } = useIsLoadingApp();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<AddFormType> = data => {
    const model: CreatePackType = {
      name: data.name,
      private: data.private,
      deckCover: coverImg
    };
    dispatch(
      packsThunks.createPack(model)
    );
    closeModal();
    reset();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) convertFileToBase64(e.currentTarget.files[0], setCoverImg);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.input}>
        <TextField
          sx={{ m: 1, width: "320px" }}
          label="Name pack"
          variant="standard"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </div>
      <Box component={"label"} sx={{ cursor: "pointer", margin: "10px 0" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          Pack images:
          <DriveFolderUploadIcon />
          <input
            type="file"
            onChange={onChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </Box>
        <div
          style={{
            margin: '16px 0',
            height: '100px',
            background: `url(${
              coverImg || defaultImg || noFile
            }) no-repeat center/contain`,
          }}
        />
      </Box>

      <div className={s.checkbox}>
        <FormControlLabel
          control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
          label={"Private pack"}
          {...register("private")}
        />
      </div>


      <div className={s.button}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, "113px", "10px", "30px")}
          disabled={isLoadingApp}
        >Cancel
        </ButtonComponent>
        <ButtonComponent
          type="submit"
          sx={sxButtonColorCreator(buttonBlue, "113px", "10px", "30px")}
          disabled={isLoadingApp}
        >Save
        </ButtonComponent>

      </div>

    </form>
  );
};
