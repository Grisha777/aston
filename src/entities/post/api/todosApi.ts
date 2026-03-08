import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../../[entity]/model/types';

export const USER_TODOS_TAG = 'UserTodos' as const;

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    keepUnusedDataFor: 60,
    tagTypes: [USER_TODOS_TAG],
    endpoints: (builder) => ({
        getTodosByUserId: builder.query<Todo[], number>({
            query: (userId) => `/users/${userId}/todos`,
            providesTags: (result, error, userId) => [
                { type: USER_TODOS_TAG, id: userId },
            ],
        }),
    }),
});

export const { useGetTodosByUserIdQuery } = todosApi;
