import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookItem } from '../../interfaces/book-item';
import { getBook } from '../thunks';

type Loading = 'idle' | 'pending' | 'succeeded' | 'failed';

const initialState: {
  book: BookItem;
  loading: Loading;
} = {
  loading: 'idle',
  book: {} as BookItem,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<Loading>) => {
      state.loading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBook.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getBook.fulfilled, (state, { payload }) => {
      state.book = payload;
      state.loading = 'succeeded';
    });
    builder.addCase(getBook.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const { setLoading } = bookSlice.actions;
export const bookReducer = bookSlice.reducer;
