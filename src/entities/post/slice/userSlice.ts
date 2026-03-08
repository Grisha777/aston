import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { User } from '../../[entity]/model/types';

export const userAdapter = createEntityAdapter<User>({
    sortComparer: (a, b) => a.id - b.id,
});

const userSlice = createSlice({
    name: 'users',
    initialState: userAdapter.getInitialState(),
    reducers: {
        addUser: userAdapter.addOne,
        addManyUsers: userAdapter.addMany,
    },
});

export const { addUser, addManyUsers } = userSlice.actions;

export default userSlice.reducer;
