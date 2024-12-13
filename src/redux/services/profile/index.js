import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../../../config";

export const Profile = createApi({
  reducerPath: "ProfileData",
  baseQuery: fetchBaseQuery({
    baseUrl: config.baseUrl.BaseUrl,
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
  tagTypes: ["ProfileData"],
  endpoints: (builder) => ({
    profileData: builder.query({
      query: (payload) => ({
        url: `patients/profileview/${payload.userId}/`,
        method: "GET",
      }),
      providesTags: ["ProfileData"],
    }),

    editProfile: builder.mutation({
      query: (payload) => ({
        url: `patients/profileview/${payload.userId}/`,
        method: "PUT",
        providesTags: ["EditProfileData"],
        body: payload.updatedData
      }),
    }),

    uploadFile: builder.mutation({
      query: (payload) => {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('role', payload.role);
        return {
          url: "auth/upload-file/",
          method: "POST",
          body: formData
        };
      }
    })
  }),
});

export const { useProfileDataQuery, useEditProfileMutation,useUploadFileMutation } = Profile;
