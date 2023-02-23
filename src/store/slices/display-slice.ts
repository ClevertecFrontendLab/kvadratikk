import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Display = 'tile' | 'list';
type Sort = 'desc' | 'asc';

const initialState: {
  display: Display;
  sort: Sort;
  search: string;
} = {
  display: 'tile',
  sort: 'desc',
  search: '',
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
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
  },
});

export const { setDisplay, setSort, setSearch } = displaySlice.actions;
export const displayReducer = displaySlice.reducer;
