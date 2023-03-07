import { configureStore } from '@reduxjs/toolkit';

import { bookReducer } from './slices/book-slice';
import { booksReducer } from './slices/books-slice';
import { displayReducer } from './slices/display-slice';
import { loadingReducer } from './slices/loading-slice';
import { menuReducer } from './slices/menu-slice';
import { registrationReducer } from './slices/registration-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    books: booksReducer,
    book: bookReducer,
    display: displayReducer,
    loading: loadingReducer,
    registration: registrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
