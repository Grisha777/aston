import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../../[entity]/model/types';

export const USERS_TAG = 'Users' as const;

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [USERS_TAG],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/users',
            providesTags: [USERS_TAG],
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
