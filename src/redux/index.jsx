import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AuthAPI,OtpVerify, Profile } from "./services";
import React from "react";
import {authReducer,otpSlice} from './slices';


const ReduxStore = configureStore({
    reducer:{
        [AuthAPI.reducerPath] : AuthAPI.reducer,
        [OtpVerify.reducerPath]: OtpVerify.reducer,
        [Profile.reducerPath]: Profile.reducer,
        auth: authReducer,
        otp: otpSlice
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            AuthAPI.middleware,
            OtpVerify.middleware,
            Profile.middleware
        )
});

export const AppRedux = ({children}) => {
    return <Provider store={ReduxStore}>
        {children}
    </Provider>
}