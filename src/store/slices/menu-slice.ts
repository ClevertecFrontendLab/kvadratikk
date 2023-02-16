import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isExpandedMenu: boolean;
  shouldGenresHide: boolean;
} = {
  isExpandedMenu: false,
  shouldGenresHide: false,
};

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsExpandedMenu: (state, { payload }: PayloadAction<boolean>) => {
      state.isExpandedMenu = payload;
    },
    setShouldGenresHide: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldGenresHide = payload;
    },
  },
});

export const { setIsExpandedMenu, setShouldGenresHide } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
