import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  isLoading: boolean;
  isError: boolean;
} = {
  isLoading: false,
  isError: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setIsError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
  },
});

export const { setIsError, setIsLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
