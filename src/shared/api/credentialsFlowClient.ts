import { ClientBuilder, Client, AuthMiddlewareOptions } from '@commercetools/sdk-client-v2';

import { httpMiddlewareOptions, projectKey } from './baseApi';

const credentialsFlowOptions: () => AuthMiddlewareOptions = () => {
  const options = {
    host: import.meta.env.VITE_CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    fetch,
  };

  return options;
};

function credentialsFlowClient(): Client {
  const client = new ClientBuilder()
    .withClientCredentialsFlow(credentialsFlowOptions())
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  return client;
}

export default credentialsFlowClient;
