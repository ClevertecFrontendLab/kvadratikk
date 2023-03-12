import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { BookItem } from '../interfaces/book-item';
import { BookPreview } from '../interfaces/book-preview';
import { GenreItem } from '../interfaces/genre-item';
import { AuthInputs, EmailInputs, RegInputs } from '../interfaces/inputs';

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

export const createUser = createAsyncThunk('users/createUser', async (data: RegInputs, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, data);

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
    try {
      const response = await axios.post(AUTH_URL, data);

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

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (data: EmailInputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_URL}/forgot-password`, data);

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const { message } = error;

      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (data: { password: string; passwordConfirmation: string; code: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_URL}/reset-password`, data);

      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      const status = error.response?.status;

      return rejectWithValue(status);
    }
  }
);
