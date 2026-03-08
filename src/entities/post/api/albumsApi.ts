import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Album } from '../../[entity]/model/types';

export const ALBUMS_TAG = 'Albums' as const;
export const USER_ALBUMS_TAG = 'UserAlbums' as const;

export const albumsApi = createApi({
    reducerPath: 'albumsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [ALBUMS_TAG, USER_ALBUMS_TAG],
    endpoints: (builder) => ({
        getAlbumsByUserId: builder.query<Album[], number>({
            query: (userId) => `/users/${userId}/albums`,
            providesTags: (result, error, userId) => [
                { type: USER_ALBUMS_TAG, id: userId },
            ],
        }),
    }),
});

export const { useGetAlbumsByUserIdQuery } = albumsApi;
