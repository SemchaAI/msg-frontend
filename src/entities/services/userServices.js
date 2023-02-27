import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../shared/config";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, query) => {
      const authResult = window.localStorage.getItem("token");
      if (authResult) {
        headers.set("Authorization", authResult);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Messages"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
      }),
      providesTags: (result) => ["User"],
    }),
    getAllMessages: builder.query({
      query: (page) => ({
        url: `/message?page=${page}`,
      }),
      providesTags: (result) => ["Messages"],
    }),
    postMessage: builder.mutation({
      query: (post) => ({
        url: `/message`,
        method: "POST",
        body: post,
      }),
      providesTags: (result) => ["Messages"],
    }),
    registerUser: builder.mutation({
      query: (post) => ({
        url: "/auth/register",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
    loginUser: builder.mutation({
      query: (post) => ({
        url: "/auth/login",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
    uploadImageUser: builder.mutation({
      query: (post) => ({
        url: "/user/upload/avatar",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
    changeAvatarUser: builder.mutation({
      query: (post) => ({
        url: "/user/avatar",
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
    deleteOldAvatar: builder.mutation({
      query: (post) => ({
        url: "/user/delete/avatar",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
    updateAvatars: builder.mutation({
      query: (post) => ({
        url: "/user/update/avatars",
        method: "POST",
        body: post,
      }),
      invalidatesTags: (result) => ["User"],
    }),
  }),
});
