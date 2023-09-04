import {
  ApiRoot,
  ClientResponse,
  Customer,
  MyCustomerUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';

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
