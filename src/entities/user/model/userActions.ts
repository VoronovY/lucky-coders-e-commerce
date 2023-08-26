import { Customer } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserData } from '../../../shared/types/types';
import getCustomer from '../api/userApi';
import getErrorMessage from '../../../shared/helpers/routerHelpres';

const convertUserFromDTO = (user: Customer): UserData => {
  return {
    email: user.email,
    lastName: user.lastName !== undefined ? user.lastName : '',
    firstName: user.firstName !== undefined ? user.firstName : '',
    dateOfBirth: user.dateOfBirth !== undefined ? user.dateOfBirth : '',
    addresses:
      user.addresses !== undefined
        ? user.addresses.map((address) => ({
            id: address.id,
            street: address.streetName !== undefined ? address.streetName : '',
            postalCode: address.postalCode !== undefined ? address.postalCode : '',
            city: address.city !== undefined ? address.city : '',
            country: address.country,
          }))
        : [],
  };
};

const getCustomerAction = createAsyncThunk<UserData, void, { rejectValue: string }>(
  'profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCustomer();
      const userData = convertUserFromDTO(response.body);
      return userData;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default getCustomerAction;
