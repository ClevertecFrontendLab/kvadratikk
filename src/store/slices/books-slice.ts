import { createSlice } from '@reduxjs/toolkit';

import { BookPreview } from '../../interfaces/book-preview';
import { GenreItem } from '../../interfaces/genre-item';
import { getBooks, getGenres } from '../thunks';

const initialState: {
  books: BookPreview[];
  genres: GenreItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
} = {
  loading: 'idle',
  books: [],
  genres: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      try {
        state.books = payload;
        state.loading = state.genres.length ? 'succeeded' : 'pending';
      } catch {
        state.loading = 'failed';
      }
    });
    builder.addCase(getBooks.rejected, (state) => {
      state.loading = 'failed';
    });
    builder.addCase(getGenres.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(getGenres.fulfilled, (state, { payload }) => {
      state.genres = payload;
      state.loading = state.books.length ? 'succeeded' : 'pending';
    });
    builder.addCase(getGenres.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const booksReducer = booksSlice.reducer;
