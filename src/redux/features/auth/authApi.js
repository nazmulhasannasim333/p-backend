import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/login`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["admin"]
    }),
  }),
});

export const {useLoginAdminMutation} = authApi;
