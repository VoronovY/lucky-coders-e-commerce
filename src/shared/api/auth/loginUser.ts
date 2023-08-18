import { ClientResponse, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { projectKey } from '../baseApi';
import passwordFlowClient from '../clientBuilder/passwordFlowClient';

const loginUser = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  return createApiBuilderFromCtpClient(passwordFlowClient(email, password))
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: { email, password } })
    .execute();
};

export default loginUser;
