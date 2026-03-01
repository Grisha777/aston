import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '../../[entity]/model/types';

export const POST_TAGS = {
    POSTS: 'Posts' as const,
    POST: 'Post' as const,
    USER_POSTS: 'UserPosts' as const,
};

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    keepUnusedDataFor: 60,
    tagTypes: [POST_TAGS.POSTS, POST_TAGS.POST, POST_TAGS.USER_POSTS],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            providesTags: [POST_TAGS.POSTS],
        }),

        getPostById: builder.query<Post, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: POST_TAGS.POST, id }],
        }),

        getPostsByUserId: builder.query<Post[], number>({
            query: (userId) => `/users/${userId}/posts`,
            providesTags: (result, error, userId) => [
                { type: POST_TAGS.USER_POSTS, id: userId },
            ],
        }),

        addPost: builder.mutation<Post, Partial<Post>>({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: (result) => {
                const tags: { type: typeof POST_TAGS.POSTS | typeof POST_TAGS.USER_POSTS; id?: number }[] = [
                    { type: POST_TAGS.POSTS }
                ];
                
                if (result?.userId) {
                    tags.push({ type: POST_TAGS.USER_POSTS, id: result.userId });
                }
                
                return tags;
            },
        }),

        updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: POST_TAGS.POST, id },
                POST_TAGS.POSTS,
                ...(result ? [{ type: POST_TAGS.USER_POSTS, id: result.userId }] : []),
            ],
        }),
    }),
});

   
export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetPostsByUserIdQuery,
    useAddPostMutation,
    useUpdatePostMutation,
} = postsApi;