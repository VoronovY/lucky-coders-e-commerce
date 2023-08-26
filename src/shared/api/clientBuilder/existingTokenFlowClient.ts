import { Client, ClientBuilder, ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '../baseApi';

const token = localStorage.getItem('accessToken');

const authorization: string = token ? `Bearer ${token}` : '';
const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

const existingFlowClient = (): Client => {
  const client = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return client;
};

export default existingFlowClient;
