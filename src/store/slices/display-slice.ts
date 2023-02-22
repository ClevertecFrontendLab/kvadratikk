import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Display = 'tile' | 'list';
type Sort = 'desc' | 'asc';

const initialState: {
  display: Display;
  sort: Sort;
} = {
  display: 'tile',
  sort: 'desc',
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDisplay: (state, { payload }: PayloadAction<Display>) => {
      state.display = payload;
    },
    setSort: (state, { payload }: PayloadAction<Sort>) => {
      state.sort = payload;
    },
  },
});

export const { setDisplay, setSort } = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
