import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{

    }
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setAuth(state,{payload}) {
            state.user = payload.user;
        }
    }
})

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;