import { createSlice } from '@reduxjs/toolkit';

import getCategoriesAction from './categoriesAction';

import { CatalogCategory } from '../../types/types';

type Category = {
  categories: CatalogCategory[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: Category = {
  categories: [],
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
        currentState.categories = payload;
      })
      .addCase(getCategoriesAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const { reducer: categoriesData } = CategoriesSlice;
