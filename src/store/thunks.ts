import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BookItem } from '../interfaces/book-item';
import { BookPreview } from '../interfaces/book-preview';
import { GenreItem } from '../interfaces/genre-item';
import { AuthInputs, Inputs } from '../interfaces/inputs';

import { RootState, store } from './store';

const BASE_URL = 'https://strapi.cleverland.by/api';
const USER_URL = `${BASE_URL}/auth`;
const AUTH_URL = `${USER_URL}/local`;

const interceptor = axios.create();

interceptor.interceptors.request.use((config) => {
  const { jwt } = store.getState().authorization;
  const copyConfig = { ...config };

  copyConfig.headers.Authorization = `Bearer ${jwt}`;

  return copyConfig;
});

export const getGenres = createAsyncThunk<GenreItem[], void, { state: RootState }>(
  'books/getGenres',
  async (_, { rejectWithValue }) => {
    try {
      const response = await interceptor.get(`${BASE_URL}/categories`);

      return response.data as GenreItem[];
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getBooks = createAsyncThunk<BookPreview[], void, { state: RootState }>(
  'books/getBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await interceptor.get(`${BASE_URL}/books`);

      return response.data as BookPreview[];
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getBook = createAsyncThunk<BookItem, string, { state: RootState }>(
  'books/getBookById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await interceptor.get(`${BASE_URL}/books/${id}`);

      return response.data as BookItem;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

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

export const createAuthUser = createAsyncThunk(
  'users/createAuthUser',
  async (data: AuthInputs, { rejectWithValue }) => {
    const { login: identifier, password } = data;

    try {
      const response = await axios.post(AUTH_URL, {
        identifier,
        password,
      });

      const { jwt, user } = response.data;

      return {
        status: response.status,
        jwt,
        user,
      };
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
