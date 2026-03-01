import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Comment } from '../../[entity]/model/types';

export const COMMENTS_TAG = 'Comments' as const;

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [COMMENTS_TAG],
    endpoints: (builder) => ({
        getCommentsByPostId: builder.query<Comment[], number>({
            query: (postId) => `/posts/${postId}/comments`,
            providesTags: (result, error, postId) => [
                { type: COMMENTS_TAG, id: `post-${postId}` },
            ],
        }),
    }),
});

export const { useGetCommentsByPostIdQuery } = commentsApi;
