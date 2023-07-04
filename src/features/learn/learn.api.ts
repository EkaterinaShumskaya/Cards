import { CardType } from "features/cards/cards.api";
import { instance } from "common/api/common.api";


export const learnAPI = {
  updateGrade(payload: SetGradePayloadType) {
    return instance.put<SetGradeResponseType>("cards/grade", payload);
  }
};

export type SetGradePayloadType = {
  grade: number
  card_id: string
}

export type SetGradeResponseType = {
  updatedGrade: UpgradedGradeType
}

type UpgradedGradeType = Pick<CardType, "cardsPack_id" | "user_id" | "grade" | "shots"> & {
  _id: string
  card_id: string
}

