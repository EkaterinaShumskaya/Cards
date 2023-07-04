import { instance } from "common/api/common.api";

export const packsApi = {
  getPacks: (params: GetPacksParamsType = {}) => {
    return instance.get<PacksResponseType>("cards/pack", { params: params });
  },
  createPack: (cardsPack: CreatePackType) => {
    return instance.post<CommonResponseType & { newCardsPack: PackType }>("cards/pack", { cardsPack });
  },
  updatePack: (cardsPack: UpdatePackPayloadType) => {
    return instance.put<CommonResponseType & { updatedCardsPack: PackType }>("cards/pack", { cardsPack });
  },
  removePack: (id: string) => {
    return instance.delete<CommonResponseType & { removeCardsPack: PackType }>(`cards/pack?id=${id}`);
  }
};

export type GetPacksParamsType = {
  packName?: string
  min?: string
  max?: string
  sortPacks?: "0updated" | "1updated"
  page?: string
  pageCount?: string
  user_id?: string
  block?: string
}

export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  deckCover: string
  type: "pack"
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type PacksResponseType = CommonResponseType & {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
}
type CommonResponseType = {
  token: string
  tokenDeathTime: number
  error?: string
  in?: string
  info?: string
}

export type CreatePackType = {
  name?: string
  deckCover?: string
  private?: boolean
}


export type UpdatePackPayloadType = {
  _id: string
  cardsCount?: number
  created?: string
  grade?: number
  more_id?: string
  name?: string
  path?: string
  private?: boolean
  rating?: number
  shots?: number
  type?: string
  updated?: string
  user_id?: string
  user_name?: string
  __v?: number
  deckCover?: string
}
