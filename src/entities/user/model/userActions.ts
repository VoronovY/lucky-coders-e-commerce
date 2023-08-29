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
    lastName: user.lastName || '',
    firstName: user.firstName || '',
    dateOfBirth: user.dateOfBirth || '',
    version: user.version || 0,
    addresses:
      user.addresses !== undefined
        ? user.addresses.map((address) => ({
            id: address.id || '',
            street: address.streetName || '---',
            postalCode: address.postalCode || '---',
            city: address.city || '---',
            state: address.state || '---',
            country: countries.find((country) => country.iso === address.country) || { value: '', label: '', iso: '' },
          }))
        : [],
    defaultShippingAddress: shippingAddressId ? { id: shippingAddressId } : undefined,
    defaultBillingAddress: billingAddressId ? { id: billingAddressId } : undefined,
    shippingAddress: user.shippingAddressIds ? user.shippingAddressIds.map((id) => ({ id })) : [],
    billingAddress: user.billingAddressIds ? user.billingAddressIds.map((id) => ({ id })) : [],
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
