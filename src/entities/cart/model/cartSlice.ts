import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Cart } from '@commercetools/platform-sdk';

import { addProductAction, createAnonymousCartAction, createCartAction, getCartAction } from './cartActions';

type UserCart = {
  productsInCart: string[];
  cart: Cart | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: UserCart = {
  productsInCart: [],
  cart: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state: UserCart, action: PayloadAction<Cart | null>) => {
      const newCart = action.payload;
      const currentState = state;
      currentState.cart = newCart;
    },
    updateCartError: (state: UserCart, action: PayloadAction<boolean>) => {
      const newCart = action.payload;
      const currentState = state;
      currentState.isError = newCart;
    },
    updateCartErrorMessage: (state: UserCart, action: PayloadAction<string>) => {
      const newCart = action.payload;
      const currentState = state;
      currentState.errorMessage = newCart;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createAnonymousCartAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(createAnonymousCartAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.cart = payload;
      })
      .addCase(createAnonymousCartAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      })
      .addCase(getCartAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getCartAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.cart = payload;
      })
      .addCase(getCartAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      })
      .addCase(addProductAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(addProductAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.cart = payload;
      })
      .addCase(addProductAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      })
      .addCase(createCartAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(createCartAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.cart = payload;
      })
      .addCase(createCartAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const { reducer: userCartReducer } = CartSlice;
export const { updateCart, updateCartError, updateCartErrorMessage } = CartSlice.actions;
