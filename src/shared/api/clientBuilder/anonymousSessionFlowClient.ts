import { ClientBuilder, Client, AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions, projectKey } from '../baseApi';
import myTokenCache from '../auth/tokenCache';

const credentialsFlowOptions: () => AuthMiddlewareOptions = () => {
  const options = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    tokenCache: myTokenCache,
    fetch,
  };

  return options;
};

function anonymousSessionFlowClient(): Client {
  const client = new ClientBuilder()
    .withClientCredentialsFlow(credentialsFlowOptions())
    .withAnonymousSessionFlow(credentialsFlowOptions())
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return client;
}

export default anonymousSessionFlowClient;
