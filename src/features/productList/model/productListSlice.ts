import { createSlice } from '@reduxjs/toolkit';

import getProductListAction from './productListActions';

import { ProductCardData } from '../../../shared/types/types';

type ProductList = {
  productList: ProductCardData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: ProductList = {
  productList: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const ProductListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductListAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getProductListAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.productList = payload;
      })
      .addCase(getProductListAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const { reducer: productListReducer } = ProductListSlice;
