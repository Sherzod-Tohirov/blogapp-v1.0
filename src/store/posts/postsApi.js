import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Posts", id })), "Posts"]
          : ["Posts"],
    }),
    getUserPosts: builder.query({
      query: (userId) => `posts/${userId}`
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "posts",
        method: "post",
        body,
      }),
    }),
    editPost: builder.mutation({
      query: (body) => ({
        url: `posts/${body?.id}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Posts"]
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `posts/${body?.id}`,
        mode: 'cors',
        method: "patch",
        body,
      }),
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} = postsApi;
