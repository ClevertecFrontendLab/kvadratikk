import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BookPreview } from '../../interfaces/book-preview';
import { GenreItem } from '../../interfaces/genre-item';

const initialState: {
  books: BookPreview[];
  genres: GenreItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
} = {
  loading: 'idle',
  books: [],
  genres: [],
};

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await fetch('https://strapi.cleverland.by/api/books');

  return (await response.json()) as BookPreview[];
});

export const getGenres = createAsyncThunk('books/getGenres', async () => {
  const response = await fetch('https://strapi.cleverland.by/api/categories');

  return (await response.json()) as GenreItem[];
});

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
      try {
        state.genres = payload;
        state.loading = state.books.length ? 'succeeded' : 'pending';
      } catch {
        state.loading = 'failed';
      }
    });
    builder.addCase(getGenres.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const booksReducer = booksSlice.reducer;
