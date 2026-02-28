import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../PostTypes';

export const postAdapter = createEntityAdapter<Post>({
    sortComparer: (a, b) => b.id - a.id,
});

const postSlice = createSlice({
    name: 'posts',
    initialState: postAdapter.getInitialState({
        loading: false,
        error: null as string | null,
    }),
    reducers: {
        addPost: postAdapter.addOne,
        updatePost: postAdapter.updateOne,
        removePost: postAdapter.removeOne,

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { 
    addPost, 
    updatePost, 
    removePost,
    setLoading,
    setError,
} = postSlice.actions;

export default postSlice.reducer;