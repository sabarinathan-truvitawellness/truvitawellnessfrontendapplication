import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../config';
import { setAuth } from '../../slices/auth';

  

if (!config.baseUrl) {
  console.error('API Base URL is missing. Check your .env file.');
}

export const AuthAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: config?.baseUrl.BaseUrl }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({

      //login mutation
      login: builder.mutation({
        query: (payload) => ({
          url: "auth/login/",
          method: "POST",
          body: { email: payload.email, password: payload.password },
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
      
            // Extract relevant data from the response
            const { access, refresh, roles, user_id, redirect_url } = data ?? {};
      
            if (access) {
              // Store tokens in localStorage
              localStorage.setItem('authToken', access);
              localStorage.setItem('refreshToken', refresh);
      
              // Optionally store other data if needed
              localStorage.setItem('roles', JSON.stringify(roles));
              localStorage.setItem('userId', user_id);
              localStorage.setItem('redirectUrl', redirect_url);
            }
      
            // Dispatch to store user data or roles in the Redux store if necessary
            dispatch(setAuth({ user: { roles, user_id } }));
          } catch (error) {
            console.log("Error at login auth API: ", error);
          }
        }
      }),
      

      //resetPassword
      resetPassword: builder.mutation({
        query: (payload) => ({
          url: 'auth/forgot-password/',
          method: "POST",
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: payload,
        }),
      }),
      
      //newPaaword
      newPassword : builder.mutation({
        query:(payload) => ({
          url:"auth/reset-password/",
          method:"POST",
          credentials:"include",
          headers:{
            'Content-Type': 'application/json',
          },
          body:payload
        })
      })
,
      //signup patients api
    signUp: builder.mutation({
      query: (payload) => ({
        url: 'patients/signup/',
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: payload,
      }),
    }),
  }),
});

export const { 
    useLoginMutation,
    useResetPasswordMutation,
    useNewPasswordMutation,
    useSignUpMutation 
} = AuthAPI;
