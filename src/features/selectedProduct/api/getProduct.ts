import { ClientResponse, createApiBuilderFromCtpClient, ProductProjection } from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';

const getProductByKey = (key: string): Promise<ClientResponse<ProductProjection>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .productProjections()
    .withKey({ key })
    .get()
    .execute();
};

export default getProductByKey;
