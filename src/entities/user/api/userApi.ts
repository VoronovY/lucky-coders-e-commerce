import {
  ApiRoot,
  BaseAddress,
  ClientResponse,
  Customer,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';
import { NewAddress } from '../../../shared/types/types';

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(existingFlowClient());
};

export const getCustomer = (): Promise<ClientResponse<Customer>> => {
  const client = existingFlowClient();
  if (!client) {
    return Promise.reject(new Error('Access token is missing'));
  }

  return getApiRoot().withProjectKey({ projectKey }).me().get().execute();
};

export const updateUserInfo = (
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [
          { action: 'setFirstName', firstName },
          { action: 'setLastName', lastName },
          { action: 'changeEmail', email },
          { action: 'setDateOfBirth', dateOfBirth },
        ],
      },
    })
    .execute();
};

export const changePassword = (
  version: number,
  currentPassword: string,
  newPassword: string,
): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .password()
    .post({
      body: {
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();
};

export const addNewAddress = ({
  version,
  country,
  city,
  streetName,
  state,
  postalCode,
}: NewAddress): Promise<ClientResponse<Customer>> => {
  const newAddress: BaseAddress = {
    country,
    city,
    streetName,
    state,
    postalCode,
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'addAddress', address: newAddress }],
      },
    })
    .execute();
};

export const editAddress = ({
  version,
  id,
  country,
  city,
  streetName,
  state,
  postalCode,
}: NewAddress): Promise<ClientResponse<Customer>> => {
  const updatedAddress: BaseAddress = {
    country,
    city,
    streetName,
    state,
    postalCode,
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'changeAddress', address: updatedAddress, addressId: id }],
      },
    })
    .execute();
};

export const deleteAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'removeAddress', addressId }],
      },
    })
    .execute();
};

export const setDefaultShippingAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'setDefaultShippingAddress', addressId }],
      },
    })
    .execute();
};

export const removeDefaultShippingAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'removeShippingAddressId', addressId }],
      },
    })
    .execute();
};

export const setDefaultBillingAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'setDefaultBillingAddress', addressId }],
      },
    })
    .execute();
};

export const removeDefaultBillingAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'removeBillingAddressId', addressId }],
      },
    })
    .execute();
};
