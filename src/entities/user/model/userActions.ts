import { Customer } from '@commercetools/platform-sdk';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserData } from '../../../shared/types/types';
import getCustomer from '../api/userApi';
import getErrorMessage from '../../../shared/helpers/routerHelpres';
import countries from '../../../shared/constants/countries';

const convertUserFromDTO = (user: Customer): UserData => {
  const shippingAddressId = user.defaultShippingAddressId;
  const billingAddressId = user.defaultBillingAddressId;

  return {
    email: user.email,
    lastName: user.lastName !== undefined ? user.lastName : '---',
    firstName: user.firstName !== undefined ? user.firstName : '---',
    dateOfBirth: user.dateOfBirth !== undefined ? user.dateOfBirth : '---',
    addresses:
      user.addresses !== undefined
        ? user.addresses.map((address) => ({
            id: address.id !== undefined ? address.id : '---',
            street: address.streetName !== undefined ? address.streetName : '---',
            postalCode: address.postalCode !== undefined ? address.postalCode : '---',
            city: address.city !== undefined ? address.city : '---',
            state: address.state !== undefined ? address.state : '---',
            country:
              address.country !== undefined
                ? countries.find((country) => country.iso === address.country)?.label ?? '---'
                : '---',
          }))
        : [],
    defaultShippingAddress: shippingAddressId !== undefined ? { id: shippingAddressId } : undefined,
    defaultBillingAddress: billingAddressId !== undefined ? { id: billingAddressId } : undefined,
    shippingAddress: user.shippingAddressIds !== undefined ? user.shippingAddressIds.map((id) => ({ id })) : [],
    billingAddress: user.billingAddressIds !== undefined ? user.billingAddressIds.map((id) => ({ id })) : [],
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
