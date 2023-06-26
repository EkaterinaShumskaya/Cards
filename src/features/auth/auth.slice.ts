import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi } from "features/auth/auth.api";


const register=createAsyncThunk('auth/register',(arg:ArgRegisterType)=>{
  // const {dispatch,getState, rejectWithValue}=thunkAPI
  authApi.register(arg).then((res)=>{
    console.log('register',res.data);
  })
})

const login=createAsyncThunk('auth/login',(arg:ArgLoginType)=>{
authApi.login(arg).then((res)=>{
  console.log('');
})
})


const slise=createSlice({
  name:'auth',
  initialState:{},
  reducers:{}
})

export const authReducer=slise.reducer
export const authThunks={register, login}
