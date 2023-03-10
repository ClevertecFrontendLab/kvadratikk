import { createSlice } from '@reduxjs/toolkit';

import { forgotPassword, resetPassword } from '../thunks';

type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

const initialState: {
  loading: Loading;
  errorMessage: string;
} = {
  loading: 'idle',
  errorMessage: '',
};

export const recoverySlice = createSlice({
  name: 'recovery',
  initialState,
  reducers: {
    resetRecovery: (state) => {
      state.loading = 'idle';
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.errorMessage = '';
      state.loading = 'succeeded';
    });
    builder.addCase(forgotPassword.rejected, (state, { payload }) => {
      if (typeof payload === 'string') state.errorMessage = payload;
      state.loading = 'failed';
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { resetRecovery } = recoverySlice.actions;
export const recoveryReducer = recoverySlice.reducer;
