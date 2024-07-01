import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://cg-storage.site/api",
  // baseUrl: "http://localhost:1000/api",
  baseUrl: "https://cg-admin-api.vercel.app/api",
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "tasks", "submission", "profileLogs"],
  endpoints: () => ({}),
});
