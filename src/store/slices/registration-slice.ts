import { createSlice } from '@reduxjs/toolkit';

import { createUser } from '../thunks';

type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';
type Code = number | null;

const initialState: {
  code: Code;
  loading: Loading;
} = {
  loading: 'idle',
  code: null,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetRegistration: (state) => {
      state.code = null;
      state.loading = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.code = payload;
      state.loading = 'succeeded';
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      if (typeof payload === 'number') state.code = payload;
      state.loading = 'failed';
    });
  },
});

export const { resetRegistration } = registrationSlice.actions;
export const registrationReducer = registrationSlice.reducer;
