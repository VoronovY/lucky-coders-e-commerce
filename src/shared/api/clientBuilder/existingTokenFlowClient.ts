import { Client, ClientBuilder, ExistingTokenMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions } from '../baseApi';

const existingFlowClient = (): Client | null => {
  let token: string | null = '';
  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken');
  } else if (localStorage.getItem('anonymousToken')) {
    token = localStorage.getItem('anonymousToken');
  }

  if (!token) {
    return null;
  }

  const authorization: string = token ? `Bearer ${token}` : '';

  const options: ExistingTokenMiddlewareOptions = {
    force: true,
  };

  const client = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return client;
};

export default existingFlowClient;
