import { createSlice } from '@reduxjs/toolkit'

export const userAuth = createSlice({
 name: 'user',
 initialState: {
   user:{
    userid:'',
    username:''
   } 
 },
 reducers: {
   setUser:(state,action)=>{
    state.user= action.payload;
   }

  },
})

export const { setUser } = userAuth.actions
export default userAuth.reducer;