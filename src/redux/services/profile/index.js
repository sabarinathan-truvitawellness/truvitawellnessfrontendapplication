import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";

export const Profile = createApi({
  reducerPath: "ProfileData",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl.BaseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      // Get the token from local storage
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // Set the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ['ProfileData'],
  endpoints: (builder) => ({
    profileData: builder.query({
      query: (payload) => ({
        url: `/patients/profile/${payload.userId}/`,
        method: "GET",
      }),
      providesTags: ['ProfileData'],
    }),
  }),
});

export const { useProfileDataQuery } = Profile;
