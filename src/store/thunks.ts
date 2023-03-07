import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BookItem } from '../interfaces/book-item';
import { BookPreview } from '../interfaces/book-preview';
import { GenreItem } from '../interfaces/genre-item';
import { Inputs } from '../interfaces/inputs';

const BASE_URL = 'https://strapi.cleverland.by/api';
const USER_URL = `${BASE_URL}/auth`;
const AUTH_URL = `${USER_URL}/local`;

export const getGenres = createAsyncThunk('books/getGenres', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);

    return response.data as GenreItem[];
  } catch {
    return rejectWithValue(false);
  }
});

export const getBooks = createAsyncThunk('books/getBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);

    return response.data as BookPreview[];
  } catch {
    return rejectWithValue(false);
  }
});

export const getBook = createAsyncThunk('books/getBookById', async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/${id}`);

    return response.data as BookItem;
  } catch {
    return rejectWithValue(false);
  }
});

// <number, Inputs, { rejectValue: number }>

export const createUser = createAsyncThunk('users/createUser', async (data: Inputs, { rejectWithValue }) => {
  const { login: username, password, name: firstName, surname: lastName, tel: phone, email } = data;

  try {
    const response = await axios.post(`${AUTH_URL}/register`, {
      email,
      username,
      password,
      firstName,
      lastName,
      phone,
    });

    return response.status;
  } catch (e) {
    const error = e as AxiosError;
    const status = error.response?.status;

    return rejectWithValue(status);
  }
});
