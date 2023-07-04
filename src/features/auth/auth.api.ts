import { instance } from "common/api/common.api";
import axios from "axios";

export const authApi = {
  register: (arg:ArgRegisterType)=>{
    // return axios.post<RegisterResponseType>('https://neko-back.herokuapp.com/2.0/auth/register', arg,
    //   {withCredentials:true})
  return instance.post<RegisterResponseType>('auth/register',arg)
  },
  login:(arg:ArgLoginType)=>{
    // return axios.post<ProfileType>('https://neko-back.herokuapp.com/2.0/auth/login', arg,
    //   {withCredentials:true})
    return instance.post<ProfileType>("auth/login",arg)

  },
  forgotPassword:(data:ForgotPasswordType)=>{
    return axios.post<AuthResponseType>('https://neko-back.herokuapp.com/2.0/auth/forgot',
      data,
      { withCredentials:true })
  },
  setNewPassword:(data:SetNewPassword)=>{
    return axios.post<AuthResponseType>('https://neko-back.herokuapp.com/2.0/auth/set-new-password',
      data,
      { withCredentials:true })
  },
  me:()=>{
    return instance.post<ProfileType>('auth/me')
  },
  logout:()=>{
    return instance.delete<AuthResponseType>('auth/me')
  },
  updateUserProFile:(data:UpdateUserType)=>{
    return instance.put<{updatedUser:ProfileType; error?:string}>('auth/me',data)
  }
}



export type SetNewPassword={
  password: string
  resetPasswordToken: string
}

export type ArgLoginType={
  email:string,
  password:string,
  rememberMe:boolean
}

 export type ArgRegisterType=Omit<ArgLoginType,"rememberMe">

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token | tokenDeathTime | avatar">
}


export type ProfileType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
  error?: string
}

export type ForgotPasswordType={
  email:string,
  from?:string,
  message:string
}

export type AuthResponseType = {
  info: string
  error?: string
}

export type UpdateUserType={
  name?:string,
  avatar?:string
}