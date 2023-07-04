import { AxiosError, isAxiosError } from "axios";

export const errorNetworkUtil = (e: any): string => {
  const err = e as Error | AxiosError;
  if (isAxiosError(err)) {
    return err.response?.data ? (err.response.data as { error: string }).error : err.message;
  } else {
    return `Some error ${err.message}`;
  }
};