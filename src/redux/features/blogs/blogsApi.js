import { baseApi } from "../../api/baseApi";


const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => {
        return {
          url: `/blogs`,
          method: "GET",
        };
      },
      providesTags: ["blogs"],
    }),
    createBlog: builder.mutation({
      query: (data) => {
        return {
          url: `/blogs`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["blogs"]
    }),
    deleteBlog: builder.mutation({
      query: (id) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blogs"]
    }),
  }),
});

export const {useGetAllBlogQuery, useCreateBlogMutation, useDeleteBlogMutation} = blogApi;
