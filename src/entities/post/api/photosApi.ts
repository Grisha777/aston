import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Photo } from '../../[entity]/model/types';

export const ALBUM_PHOTOS_TAG = 'AlbumPhotos' as const;

export const photosApi = createApi({
    reducerPath: 'photosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [ALBUM_PHOTOS_TAG],
    endpoints: (builder) => ({
        getPhotosByAlbumId: builder.query<Photo[], number>({
            query: (albumId) => `/albums/${albumId}/photos`,
            providesTags: (result, error, albumId) => [
                { type: ALBUM_PHOTOS_TAG, id: albumId },
            ],
        }),
    }),
});

export const { useGetPhotosByAlbumIdQuery } = photosApi;
