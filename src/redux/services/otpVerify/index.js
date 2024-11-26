import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"; 
import { config } from "../../../config";

// Utility function to get a specific cookie by name
const getCookie = (name) => {
  return Cookies.get(name) || "";
};

export const OtpVerify = createApi({
  reducerPath: "OtpVerify",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl.BaseUrl,
    credentials: "include", // Ensure cookies are included in all requests
    prepareHeaders: (headers) => {
      // Set the CSRF token for each request
      const csrfToken = getCookie("csrftoken"); // Replace 'csrftoken' with the actual name of your CSRF cookie
      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Otp"],
  endpoints: (builder) => ({
    verifyOTP: builder.mutation({
      query: (payload) => ({
        url: "/patients/otp/verify/",
        method: "POST",
        body: { otp: payload.otp },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("OTP verification successful");
        } catch (error) {
          console.error("Error verifying OTP:", error);
        }
      },
      invalidatesTags: ["Otp"],
    }),

    resendOTP: builder.mutation({
      query:() => ({
        url: "/patients/otp/patientresendotp/",
        method: "POST",
        
      }),
      async onQueryStarted(arg, {queryFulfilled}) {
        try{
          await queryFulfilled;

        }
        catch(error){
          console.log("Having error while sending OTP")
        }
      }

    })
  }),
});

export const { 
  useVerifyOTPMutation,
  useResendOTPMutation
 } = OtpVerify;
