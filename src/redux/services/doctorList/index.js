import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";

export const DoctorListApi = createApi({
  reducerPath: "doctorListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config?.baseUrl.BaseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = localStorage.getItem("authToken");

      if (token) {
        // Set the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["DoctorList"],

  endpoints: (builder) => ({
    getDoctorList: builder.query({
      query: (payload) => ({
        url: `patients/available-slots/`,
        // url: `patients/available-slots/?specialty=`,
        method: "GET",
      }),
      providesTags:["DoctorList"]
    }),

    getDocotorDetails: builder.query({
        query: (payload) =>(
          {
            url:`patients/single_doctor_slot/${payload}/`,
            method:"GET",
          }
        ),
    }),

    getDocotorSlot: builder.query({
        query: (payload) =>(
          {
            url:`patients/doctor_timeslot_perday/${payload.doctorId}/?date=${payload.date}`,
            method:"GET",
          }
        ),
    })
  }),
});

export const {useGetDoctorListQuery,useGetDocotorDetailsQuery,useGetDocotorSlotQuery} = DoctorListApi;
