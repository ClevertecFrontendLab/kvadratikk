import { createAsyncThunk } from '@reduxjs/toolkit';

import { BookItem } from '../interfaces/book-item';
import { BookPreview } from '../interfaces/book-preview';
import { GenreItem } from '../interfaces/genre-item';

export const getGenres = createAsyncThunk('books/getGenres', async () => {
  const response = await fetch('https://strapi.cleverland.by/api/categories');

  return (await response.json()) as GenreItem[];
});

export const getBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await fetch('https://strapi.cleverland.by/api/books');

  return (await response.json()) as BookPreview[];
});

export const getBook = createAsyncThunk('books/getBookById', async (id: string) => {
  const response = await fetch(`https://strapi.cleverland.by/api/books/${id}`);

  return (await response.json()) as BookItem;
});
