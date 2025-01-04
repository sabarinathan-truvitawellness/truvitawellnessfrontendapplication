import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";

export const AppointmentBookingApi = createApi({
  reducerPath: "appointmentApi",
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
  tagTypes: ["AppointmentList"],

  endpoints: (builder) => ({
    bookSlot: builder.mutation({
      query: (payload) => ({
        url: `patients/appointments/book/${payload.doctorId}/`,
        method: "POST",
        body:payload.bookingData
      }),
    }),

    getAppointmentList: builder.query({
      query:(payload) => ({
        url: `patients/patient/appointments/${payload.userId}/?status=${payload.status}`,
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
    }),

    getAppointmentOverView: builder.query({
      query:(payload) => ({
        url: `/patients/appointments/${payload}/overview/`,
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        },
      })
    }),

    getUpcomingAppointmentsList: builder.query({
      query:(payload) => ({
        url:`/patients/patient/appointments/${payload.userId}/?status=confirmed&date=${payload.date}`,
        method:"GET",
        headers:{
          "Content-Type": "application/json",
        },
      })
    })

  }),
});

export const {useBookSlotMutation,useGetAppointmentListQuery,useGetAppointmentOverViewQuery,useGetUpcomingAppointmentsListQuery} = AppointmentBookingApi;
