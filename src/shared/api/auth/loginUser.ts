import {
  ClientResponse,
  Customer,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../baseApi';
import passwordFlowClient from '../clientBuilder/passwordFlowClient';
import { getApiRoot } from '../clientBuilder/apiRoot';

export const loginUser = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: { email, password, activeCartSignInMode: 'MergeWithExistingCustomerCart' } })
    .execute();
};

export const createUser = (email: string, password: string): Promise<ClientResponse<Customer>> => {
  return createApiBuilderFromCtpClient(passwordFlowClient(email, password))
    .withProjectKey({ projectKey })
    .me()
    .get()
    .execute();
};
