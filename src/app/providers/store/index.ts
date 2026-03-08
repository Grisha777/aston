import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../../../entities/post/api/postsApi';
import postReducer from '../../../entities/post/slice/postSlice';
import userReducer from '../../../entities/post/slice/userSlice';

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        posts: postReducer,
        users: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
