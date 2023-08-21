import { ClientResponse, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { projectKey } from '../baseApi';
import credentialsFlowClient from '../clientBuilder/credentialsFlowClient';
import { SignUpRequestData } from '../../types/types';

const signUp = (customerData: SignUpRequestData): Promise<ClientResponse<CustomerSignInResult>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .me()
    .signup()
    .post({ body: customerData })
    .execute();
};

export default signUp;
