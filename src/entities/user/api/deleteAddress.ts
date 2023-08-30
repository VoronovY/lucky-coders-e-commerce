import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';

const deleteAddress = (version: number, addressId: string): Promise<ClientResponse<Customer>> => {
  return createApiBuilderFromCtpClient(existingFlowClient())
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

export default deleteAddress;
