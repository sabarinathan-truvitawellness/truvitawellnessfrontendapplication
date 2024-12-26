import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AuthAPI,DoctorListApi,OtpVerify, Profile } from "./services";
import React from "react";
import {authReducer,otpSlice} from './slices';
import { Doctor } from "../utils/common/svgIcons";


const ReduxStore = configureStore({
    reducer:{
        [AuthAPI.reducerPath] : AuthAPI.reducer,
        [OtpVerify.reducerPath]: OtpVerify.reducer,
        [Profile.reducerPath]: Profile.reducer,
        [DoctorListApi.reducerPath]:DoctorListApi.reducer,
        auth: authReducer,
        otp: otpSlice
    },
    middleware:(getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            AuthAPI.middleware,
            OtpVerify.middleware,
            Profile.middleware,
            DoctorListApi.middleware
        )
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const AppRedux = ({children}) => {
    return <Provider store={ReduxStore}>
        {children}
    </Provider>
}