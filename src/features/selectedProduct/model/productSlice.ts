import { createSlice } from '@reduxjs/toolkit';

import getProductAction from './productActions';

import { SelectedProductData } from '../../../shared/types/types';

type ProductList = {
  product: SelectedProductData | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: ProductList = {
  product: {
    id: '',
    attributes: [],
    discountedPrice: '',
    originalPrice: '',
    imageLinks: [],
    discount: 0,
    quantity: 0,
    description: '',
    title: '',
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const ProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getProductAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.product = payload;
      })
      .addCase(getProductAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
        currentState.isLoading = false;
      });
  },
});

export const selectedProductReducer = ProductSlice.reducer;
