import { baseApi } from "../../api/baseApi";


const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        return {
          url: `/users`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const {useGetAllUserQuery} = usersApi
