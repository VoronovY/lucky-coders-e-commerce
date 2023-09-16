import { Cart } from '@commercetools/platform-sdk';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { createAnonymousCart, createUserCart, getCartById, getUserCart, updateCart } from '../api/cartApi';
import getErrorMessage from '../../../shared/helpers/routerHelpres';

import myTokenCache from '../../../shared/api/auth/tokenCache';

import { createProductAction, createUpdateCartBody } from '../../../shared/helpers/productCartActions';

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

const getCartAction = createAsyncThunk<Cart | null, string | undefined, { rejectValue: string }>(
  'cart/getCart',
  async (cartId, { rejectWithValue }) => {
    if (!localStorage.getItem('anonymousCartId') && !localStorage.getItem('accessToken')) return null;
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

const addProductAction = createAsyncThunk<Cart, string>(
  'cart/updateCart',
  async (productId, { dispatch, getState, rejectWithValue }) => {
    try {
      if (!localStorage.getItem('anonymousCartId') && !localStorage.getItem('accessToken')) {
        const anonymousCart = await createAnonymousCart();
        localStorage.setItem('anonymousCartId', anonymousCart.body.id);
        const { refreshToken } = myTokenCache.store;
        if (refreshToken) {
          localStorage.setItem('anonymousToken', refreshToken);
        }
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

      const action = createProductAction(productId);
      const updateBody = createUpdateCartBody(cartVersion, [action]);

      const newCart = (await updateCart(cartId, cartVersion, updateBody)).body;

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

export { getCartAction, addProductAction };
