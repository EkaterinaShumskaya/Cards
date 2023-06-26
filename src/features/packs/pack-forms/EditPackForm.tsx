import { FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import Checkbox from "@mui/material/Checkbox";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "app/hooks";
import { useAuthForm } from "common/hooks/useAuthForm";
import s from "./PackForm.module.css";
import { addPackSchema, editPackSchema } from "common/contacts/validators/validationShemes";
import { SubmitHandler } from "react-hook-form";
import { CreatePackType, UpdatePackPayloadType } from "features/packs/packs.api";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonBlue, buttonWhite } from "common/contacts/validators/theme";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";
import { AddFormType } from "features/packs/pack-forms/AddPackForm";


type UpdatePackFormPropsType = {
  pack_id: string
  name: string
  closeModal: (data: UpdatePackPayloadType) => void
  onPrivate?: boolean
  deckCover?: string
}
export const EditForm:FC<UpdatePackFormPropsType> = ({pack_id,name,closeModal,onPrivate,deckCover}) => {
  const [packStatus,setPackStatus]=useState(false)
  const {register,handleSubmit,errors,reset}=useAuthForm<AddFormType>(editPackSchema)
  const {isLoadingApp}=useIsLoadingApp()



  const onSubmit:SubmitHandler<AddFormType>=data => {
    if (name !== data.name) {
      closeModal({
        name:data.name,
        _id:pack_id,
        private:data.private
      })
  }}



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.input}>
        <TextField
          sx={{ m: 1, width: "320px" }}
          label="Name pack"
          variant="standard"
          defaultValue={name}
          multiline
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </div>

      <div className={s.checkbox}>
        <FormControlLabel
          control={<Checkbox checked={packStatus} onClick={() => setPackStatus(!packStatus)} />}
          label={'Private pack'}
          {...register('private')}
        />
      </div>


      <div className={s.button}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, '113px', '10px', '30px')}
          disabled={isLoadingApp}
        >Cancel
        </ButtonComponent>
        <ButtonComponent
          type='submit'
          sx={sxButtonColorCreator(buttonBlue, '113px', '10px', '30px')}
          disabled={isLoadingApp}
        >Save
        </ButtonComponent>

      </div>

    </form>
  );
};
