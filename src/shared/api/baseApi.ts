import { HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

export const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_URL,
  fetch,
};
