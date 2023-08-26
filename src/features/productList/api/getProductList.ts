import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';

const getProductList = (): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .productProjections()
    .get({
      queryArgs: {
        limit: 20,
      },
    })
    .execute();
};

export default getProductList;
