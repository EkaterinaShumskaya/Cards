import { instance } from "common/api/common.api";


export const cardsApi = {
  getCards: (params: GetCardsParamsType) => {
    return instance.get<CardsResponseType>("cards/card", { params: params });
  },
  createCard: (data: ArgCreateCardType) => {
    return instance.post<AddCardResponseType>("cards/card", {
      card: { ...data }
    });
  },
  updateCard: (data: ArgUpdateCardType) => {
    return instance.put<UpdateCardResponseType>("cards/card", { card: { ...data } });
  },
  removeCard: (id: string) => {
    return instance.delete<DeleteCardResponseType>(`cards/card?id=${id}`);
  }

};


export type GetCardsParamsType = {
  cardAnswer?: string,
  cardQuestion?: string,
  cardsPack_id: string,
  min?: string,
  max?: string,
  sortCards?: string
  page?: string
  pageCount?: string
}

export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  packUpdated: string
  packCreated: string
  packDeckCover: string | null
  packPrivate: boolean
  pageCount: number
  packUserId: string
}

export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: CardGradeType;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  answerImg?: string;
  answerVideo?: string;
  questionImg?: string;
  questionVideo?: string;
};


// export type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5 ;
export type CardGradeType = number;

export type GetParamsType = Omit<GetCardsParamsType, "cardsPack_id">


type CommonCardResponseType = {
  newCard: CardType;
  deletedCard: CardType;
  updatedCard: CardType;
  token: string;
  tokenDeathTime: number;
};


export type AddCardResponseType = Omit<CommonCardResponseType, "deletedCard" | "updatedCard">;
export type DeleteCardResponseType = Omit<CommonCardResponseType, "newCard" | "updatedCard">;
export type UpdateCardResponseType = Omit<CommonCardResponseType, "newCard" | "deletedCard">;


type CreateUpdateCardType = {
  _id: string;
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: CardGradeType;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type ArgCreateCardType = Omit<CreateUpdateCardType, "_id">;
export type ArgUpdateCardType = Omit<CreateUpdateCardType, "cardsPack_id">;



