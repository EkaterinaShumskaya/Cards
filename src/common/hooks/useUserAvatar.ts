import { useAppDispatch } from "app/hooks";
import { ChangeEvent, useCallback } from "react";
import { convertFileToBase64 } from "common/utils/convertFile";
import { authThunks } from "features/auth/auth.slice";


export const useUploadImage = () => {
  const dispatch = useAppDispatch();

  const userAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (avatar: string) => {
          dispatch(authThunks.updateUserProFile({ avatar }));
        });
      } else {
        console.error("Error: ", "the file is too large!");
      }
    }
  }, []);

  return {
    userAvatar
  };
};
