import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';

const getCustomer = (): Promise<ClientResponse<Customer>> => {
  const client = existingFlowClient();
  if (!client) {
    return Promise.reject(new Error('Access token is missing'));
  }

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey }).me().get().execute();
};

export default getCustomer;
