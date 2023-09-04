import { ClientResponse, createApiBuilderFromCtpClient, ProductProjection } from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';

const getProductById = (id: string): Promise<ClientResponse<ProductProjection>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .productProjections()
    .withId({ ID: id })
    .get()
    .execute();
};

export default getProductById;
