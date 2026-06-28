import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import type { Post } from "../types/post";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://jsonplaceholder.typicode.com/",
  }),

  tagTypes: ["Posts"],

  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",

      transformResponse: (
        response: Post[]
      ) => response.slice(0, 20),

      providesTags: ["Posts"],
    }),

    addPost: builder.mutation<
      Post,
      Partial<Post>
    >({
      query: (post) => ({
        url: "posts",
        method: "POST",
        body: post,
      }),

      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation<
      Post,
      Partial<Post> & { id: number }
    >({
      query: ({ id, ...post }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: post,
      }),

      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation<
      void,
      number
    >({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;