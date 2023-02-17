import { configureStore } from '@reduxjs/toolkit';

import { bookReducer } from './slices/book-slice';
import { booksReducer } from './slices/books-slice';
import { loadingReducer } from './slices/loading-slice';
import { menuReducer } from './slices/menu-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    books: booksReducer,
    book: bookReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
