import {
  ClientResponse,
  Customer,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../baseApi';
import passwordFlowClient from '../clientBuilder/passwordFlowClient';
import existingFlowClient from '../clientBuilder/existingTokenFlowClient';

export const loginUser = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  return createApiBuilderFromCtpClient(existingFlowClient())
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
