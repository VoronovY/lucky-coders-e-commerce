import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';

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
    version: 0,
    addresses: [],
    defaultShippingAddress: undefined,
    defaultBillingAddress: undefined,
    shippingAddress: [],
    billingAddress: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateBillingAddresses: (state: Draft<User>, action: PayloadAction<string[]>) => {
      const newBillingAddress = action.payload.map((address) => ({ id: address }));
      const currentState = state;
      currentState.user.billingAddress = newBillingAddress;
    },
    updateShippingAddresses: (state: Draft<User>, action: PayloadAction<string[]>) => {
      const newShippingAddress = action.payload.map((address) => ({ id: address }));
      const currentState = state;
      currentState.user.shippingAddress = newShippingAddress;
    },
    updateDefaultShippingAddress: (state, action: PayloadAction<string>) => {
      const currentState = state;
      if (currentState.user.defaultShippingAddress) {
        currentState.user.defaultShippingAddress.id = action.payload;
      }
    },
    updateDefaultBillingAddress: (state, action: PayloadAction<string>) => {
      const currentState = state;
      if (currentState.user.defaultBillingAddress) {
        currentState.user.defaultBillingAddress.id = action.payload;
      }
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
export const {
  updateDefaultShippingAddress,
  updateDefaultBillingAddress,
  updateBillingAddresses,
  updateShippingAddresses,
} = UserSlice.actions;
