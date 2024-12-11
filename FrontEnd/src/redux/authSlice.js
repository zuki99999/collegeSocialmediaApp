import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers:[],
    userprofile:null,
  },
  reducers: {//sabai function reducer ma lekhnee...
        setAuthUser:(state,action)=>{
                state.user = action.payload;
        },
        setSuggestedUsers:(state,action)=>{
                state.suggestedUsers = action.payload;
        },
        setUserProfile:(state,action)=>{
          state.userprofile = action.payload;
  }

  },
});

export const {setAuthUser , setSuggestedUsers , setUserProfile} = authSlice.actions;
export default authSlice.reducer;
