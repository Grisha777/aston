import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../../../entities/post/api/postsApi';
import { commentsApi } from '../../../entities/post/api/commentsApi';
import { albumsApi } from '../../../entities/post/api/albumsApi';
import { photosApi } from '../../../entities/post/api/photosApi';
import { todosApi } from '../../../entities/post/api/todosApi';
import { usersApi } from '../../../entities/post/api/usersApi';
import postReducer from '../../../entities/post/slice/postSlice';
import userReducer from '../../../entities/post/slice/userSlice';

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,

        posts: postReducer,
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(postsApi.middleware)
            .concat(commentsApi.middleware)
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
            .concat(todosApi.middleware)
            .concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
