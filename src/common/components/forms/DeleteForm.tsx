import React, { FC } from "react";
import s from "features/packs/pack-forms/PackForm.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonBlue, buttonRed, buttonWhite } from "common/contacts/validators/theme";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

type DeleteFormPropsType={
  name:string,
  closeModal:()=>void
}

export const DeleteForm:FC<DeleteFormPropsType> = ({name,closeModal}) => {
  const {isLoadingApp}=useIsLoadingApp()

  return (
      <div className={s.button}>
        <div>
          Do you really want to remove {name}?
          All cards will be deleted.
        </div>

        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, '113px', '10px', '30px')}
          disabled={isLoadingApp}
        >Cancel
        </ButtonComponent>
        <ButtonComponent
          type='submit'
          sx={sxButtonColorCreator(buttonRed, '113px', '10px', '30px')}
          disabled={isLoadingApp}
        >Delete
        </ButtonComponent>
      </div>
  );
};

