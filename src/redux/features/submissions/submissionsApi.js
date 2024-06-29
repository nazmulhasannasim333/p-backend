import { baseApi } from "../../api/baseApi";


const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmission: builder.query({
      query: ({id, query}) => {
        console.log(query);
        return {
          url: `/submission/${id}`,
          method: "GET",
          params: query
        };
      },
      providesTags: ["submission"],
    }),
    updateSubmissionStatus: builder.mutation({
        query: (id) => {
          return {
            url: `/submission/${id}`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["submission"]
      }),
  }),
});

export const {useGetAllSubmissionQuery, useUpdateSubmissionStatusMutation} = submissionApi
