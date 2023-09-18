import {
  ClientResponse,
  DiscountCodePagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import credentialsFlowClient from '../clientBuilder/credentialsFlowClient';
import { projectKey } from '../baseApi';

const getDiscounts = (): Promise<ClientResponse<DiscountCodePagedQueryResponse>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .discountCodes()
    .get()
    .execute();
};

export default getDiscounts;
