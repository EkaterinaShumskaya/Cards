import React, { FC } from "react";
import s from "./DeleteForm.module.css";
import { ButtonComponent } from "common/components/buttons/ButtonComponent";
import { sxButtonColorCreator } from "common/utils/styles-utils/sxButtonCreator";
import { buttonRed, buttonWhite } from "common/contacts/validators/theme";
import { useIsLoadingApp } from "app/hooks/useIsLoadingApp";

type DeleteFormPropsType = {
  name: string,
  closeModal: () => void
}

export const DeleteForm: FC<DeleteFormPropsType> = ({ name, closeModal }) => {
  const { isLoadingApp } = useIsLoadingApp();

  return (
    <>
      <div className={s.description}>
        Do you really want to remove <b>{name}</b>?
      </div>
      <div className={s.button}>
        <ButtonComponent
          sx={sxButtonColorCreator(buttonWhite, "113px", "10px", "30px")}
          disabled={isLoadingApp}
        >Cancel
        </ButtonComponent>
        <ButtonComponent
          onClick={closeModal}
          sx={sxButtonColorCreator(buttonRed, "113px", "10px", "30px")}
          disabled={isLoadingApp}
        >Delete
        </ButtonComponent>
      </div>
    </>

  );
};

