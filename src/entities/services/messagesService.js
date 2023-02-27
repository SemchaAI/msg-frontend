import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../shared/config";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
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
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => ({
        url: "/message",
      }),
      invalidatesTags: (result) => ["Messages"],
    }),
  }),
});
