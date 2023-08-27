import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import getCustomerAction from './userActions';

import { UserData } from '../../../shared/types/types';

type User = {
  user: UserData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: User = {
  user: {
    email: '',
    lastName: '',
    firstName: '',
    dateOfBirth: '',
    addresses: [],
    shippingAddress: undefined,
    billingAddress: undefined,
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateShippingAddress: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          shippingAddress: {
            ...state.user.shippingAddress,
            id: action.payload,
          },
        },
      };
    },
    updateBillingAddress: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        user: {
          ...state.user,
          billingAddress: {
            ...state.user.billingAddress,
            id: action.payload,
          },
        },
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCustomerAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getCustomerAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.isLoading = false;
        currentState.user = payload;
      })
      .addCase(getCustomerAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const { reducer: userDetails } = UserSlice;
export const { updateShippingAddress, updateBillingAddress } = UserSlice.actions;
