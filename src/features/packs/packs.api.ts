import { instance } from "common/api/common.api";

export const packApi={
  // getPacks:(params:GetPacksPayloadType)=>{
  //   return instance.get<PacksResponseType>('cards/pack', {params:params})
  // }
  getPacks: () => {
    return instance.get<PacksResponseType>("cards/pack");
  },
}

export type GetPacksPayloadType = {
  packName?: string
  min?: string
  max?: string
  sortPacks?: '0updated' | '1updated'
  page?: string
  pageCount?: string
  user_id?: string
  block?: string
}

export type PackType ={
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
  type: 'pack'
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