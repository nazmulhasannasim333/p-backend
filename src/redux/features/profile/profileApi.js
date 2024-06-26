import { baseApi } from "../../api/baseApi";


const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileLogs: builder.query({
      query: (number) => {
        console.log(number);
        return {
          url: `/profile-logs/${number}`,
          method: "GET",
        };
      },
      providesTags: ["users"],
    }),
  }),
});

export const {useGetProfileLogsQuery} = profileApi;
