import { createSlice } from '@reduxjs/toolkit';

import { createAuthUser } from '../thunks';

type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
type Code = number | null;

const initialState: {
  code: Code;
  loading: Loading;
  jwt: string;
  user: object;
} = {
  loading: 'idle',
  code: null,
  jwt: '',
  user: {},
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = '';
      state.user = {};
      state.loading = 'idle';
      state.code = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAuthUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createAuthUser.fulfilled, (state, { payload }) => {
      state.code = payload.status;
      state.jwt = payload.jwt;
      state.user = payload.user;
      state.loading = 'succeeded';
    });
    builder.addCase(createAuthUser.rejected, (state, { payload }) => {
      if (typeof payload === 'number') state.code = payload;
      state.loading = 'failed';
    });
  },
});

export const { logout } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
