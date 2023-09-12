import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createAnonymousCart, createUserCart, getCartById, getUserCart, updateUserCart } from '../api/cartApi';
import getErrorMessage from '../../../shared/helpers/routerHelpres';

import myTokenCache from '../../../shared/api/auth/tokenCache';

import type { RootState } from '../../../app/appStore/store';

export const createAnonymousCartAction = createAsyncThunk<Cart, { rejectValue: string }>(
  'cart/createAnonymousCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await createAnonymousCart();
      const userCart = response.body;
      return userCart;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

export const createCartAction = createAsyncThunk<Cart, void, { rejectValue: string }>(
  'cart/createCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await createUserCart();
      const userCart = response.body;
      return userCart;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

const getCartAction = createAsyncThunk<Cart, string | undefined, { rejectValue: string }>(
  'cart/getCart',
  async (cartId, { rejectWithValue }) => {
    try {
      if (cartId) {
        const response = await getCartById(cartId);
        const userCart = response.body;
        return userCart;
      }
      const response = await getUserCart();
      const userCart = response.body;
      return userCart;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

const updateCartAction = createAsyncThunk<Cart, string>(
  'cart/updateCart',
  async (productId, { dispatch, getState, rejectWithValue }) => {
    try {
      if (!localStorage.getItem('anonymousCartId') && !localStorage.getItem('accessToken')) {
        const anonymousCart = await createAnonymousCart();
        localStorage.setItem('anonymousCartId', anonymousCart.body.id);
        localStorage.setItem('anonymousToken', myTokenCache.store.token);
        await dispatch(getCartAction());
      }

      let state = (await getState()) as RootState;
      const currentCart = state.userCart.cart;

      if (!currentCart) {
        await dispatch(getCartAction());
        state = getState() as RootState;
      }

      const cartId = state.userCart.cart?.id || '';
      const cartVersion = state.userCart.cart?.version ? +state.userCart.cart.version : 0;

      const newCart = (await updateUserCart(cartId, productId, cartVersion)).body;

      return newCart;
    } catch (error: unknown) {
      let currentError = error;
      if (error && typeof error === 'object' && 'body' in error && error.body instanceof Error)
        currentError = error.body.message;
      const message = getErrorMessage(currentError);
      return rejectWithValue(message);
    }
  },
);

export { getCartAction, updateCartAction };
