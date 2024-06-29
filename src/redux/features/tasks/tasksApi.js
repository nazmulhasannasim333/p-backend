import { baseApi } from "../../api/baseApi";


const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: (args) => {
        return {
          url: `/tasks`,
          method: "GET",
          params: args,
        };
      },
      providesTags: ["tasks"],
    }),
    updateStatus: builder.mutation({
      query: (id) => {
        return {
          url: `/tasks/updateStatus/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["tasks"]
    }),
  }),
});

export const {useGetAllTaskQuery, useUpdateStatusMutation} = tasksApi
