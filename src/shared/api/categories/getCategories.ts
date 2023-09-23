import { CategoryPagedQueryResponse, ClientResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { projectKey } from '../baseApi';
import credentialsFlowClient from '../clientBuilder/credentialsFlowClient';

const getCategories = (): Promise<ClientResponse<CategoryPagedQueryResponse>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .categories()
    .get({ queryArgs: { limit: 100 } })
    .execute();
};

export default getCategories;
