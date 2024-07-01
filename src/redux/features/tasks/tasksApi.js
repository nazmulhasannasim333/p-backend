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
    createTask: builder.mutation({
      query: (data) => {
        return {
          url: `/tasks`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["tasks"]
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

export const {useGetAllTaskQuery, useCreateTaskMutation, useUpdateStatusMutation} = tasksApi
