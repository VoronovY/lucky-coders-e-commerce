import { createSlice } from '@reduxjs/toolkit';

import getCategoriesAction from './categoriesAction';

import { NewCategory } from '../types/types';

type Category = {
  category: NewCategory[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: Category = {
  category: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const CategoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoriesAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getCategoriesAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.category = payload;
      })
      .addCase(getCategoriesAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const { reducer: categories } = CategoriesSlice;
