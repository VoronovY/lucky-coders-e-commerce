import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import { getApiRoot } from '../../../shared/api/clientBuilder/apiRoot';
import refreshTokenFlowClient from '../../../shared/api/clientBuilder/refreshTokenFlowClient';

export const getCustomer = (): Promise<ClientResponse<Customer>> => {
  const client = refreshTokenFlowClient();
  if (!client) {
    return Promise.reject(new Error('Access token is missing'));
  }

  return getApiRoot().withProjectKey({ projectKey }).me().get().execute();
};

export const executeCustomerAction = (
  version: number,
  actions: MyCustomerUpdateAction[],
): Promise<ClientResponse<Customer>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions,
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
