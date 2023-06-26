import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useAuthForm = <T extends FieldValues>(schema: any) => {


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<T>({
    mode: "onTouched",
    resolver: yupResolver(schema)
  });

  const setCustomError = (name: any, message: string) => {
    return setError(name, {
      type: "custom",
      message: message
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    setCustomError
  };
};
