import { configureStore } from '@reduxjs/toolkit';

import { booksReducer } from './slices/books-slice';
import { menuReducer } from './slices/menu-slice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    books: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
