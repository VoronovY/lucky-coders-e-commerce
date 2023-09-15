import { Client, ClientBuilder, RefreshAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions, projectKey } from '../baseApi';

const refreshTokenFlowClient = (): Client | null => {
  let token: string | null = '';
  if (localStorage.getItem('accessToken')) {
    token = localStorage.getItem('accessToken');
  } else if (localStorage.getItem('anonymousToken')) {
    token = localStorage.getItem('anonymousToken');
  }

  if (!token) {
    return null;
  }

  const options: RefreshAuthMiddlewareOptions = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    refreshToken: token,
    fetch,
  };

  const client = new ClientBuilder().withRefreshTokenFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();

  return client;
};

export default refreshTokenFlowClient;
