import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post, Comment, User, Album, Photo, Todo } from '../PostTypes';

export const TAGS = {
    POSTS: 'Posts' as const,
    POST: 'Post' as const,
    COMMENTS: 'Comments' as const,
    USERS: 'Users' as const,
    USER_POSTS: 'UserPosts' as const,
    USER_ALBUMS: 'UserAlbums' as const,
    USER_TODOS: 'UserTodos' as const,
    ALBUM_PHOTOS: 'AlbumPhotos' as const,
};

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [
        TAGS.POSTS,
        TAGS.POST,
        TAGS.COMMENTS,
        TAGS.USERS,
        TAGS.USER_POSTS,
        TAGS.USER_ALBUMS,
        TAGS.USER_TODOS,
        TAGS.ALBUM_PHOTOS,
    ],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            providesTags: [TAGS.POSTS],
        }),

        getPostById: builder.query<Post, number>({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: TAGS.POST, id }],
        }),

        getCommentsByPostId: builder.query<Comment[], number>({
            query: (postId) => `/posts/${postId}/comments`,
            providesTags: (result, error, postId) => [
                { type: TAGS.COMMENTS, id: `post-${postId}` },
            ],
        }),

        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: [TAGS.USERS],
        }),

        getPostsByUserId: builder.query<Post[], number>({
            query: (userId) => `/users/${userId}/posts`,
            providesTags: (result, error, userId) => [
                { type: TAGS.USER_POSTS, id: userId },
            ],
        }),

        getAlbumsByUserId: builder.query<Album[], number>({
            query: (userId) => `/users/${userId}/albums`,
            providesTags: (result, error, userId) => [
                { type: TAGS.USER_ALBUMS, id: userId },
            ],
        }),

        getTodosByUserId: builder.query<Todo[], number>({
            query: (userId) => `/users/${userId}/todos`,
            providesTags: (result, error, userId) => [
                { type: TAGS.USER_TODOS, id: userId },
            ],
        }),

        getPhotosByAlbumId: builder.query<Photo[], number>({
            query: (albumId) => `/albums/${albumId}/photos`,
            providesTags: (result, error, albumId) => [
                { type: TAGS.ALBUM_PHOTOS, id: albumId },
            ],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetCommentsByPostIdQuery,
    useGetUsersQuery,
    useGetPostsByUserIdQuery,
    useGetAlbumsByUserIdQuery,
    useGetTodosByUserIdQuery,
    useGetPhotosByAlbumIdQuery,
} = postsApi;
