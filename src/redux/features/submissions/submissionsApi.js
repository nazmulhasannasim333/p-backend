import { baseApi } from "../../api/baseApi";


const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubmission: builder.query({
      query: ({id, query}) => {
        return {
          url: `/submission/${id}`,
          method: "GET",
          params: query
        };
      },
      providesTags: ["submission"],
    }),
    updateSubmissionStatus: builder.mutation({
        query: ({id, status}) => {
          return {
            url: `/submission/${id}`,
            method: "PUT",
            body: {status}
          };
        },
        invalidatesTags: ["submission"]
      }),
  }),
});

export const {useGetAllSubmissionQuery, useUpdateSubmissionStatusMutation} = submissionApi
