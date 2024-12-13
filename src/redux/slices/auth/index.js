import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    userData: {},
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, { payload }) {
            state.user = payload.user;
        },
        setUserData(state, { payload }) {
            state.userData = payload.userData;
        },
    },
});

export const { setAuth, setUserData } = authSlice.actions;
export default authSlice.reducer;
