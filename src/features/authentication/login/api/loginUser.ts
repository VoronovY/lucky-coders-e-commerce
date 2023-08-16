import { ClientResponse, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import passwordFlowClient from '../../../../shared/api/passwordFlowClient';
import { projectKey } from '../../../../shared/api/baseApi';

const loginUser = (email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> => {
  return createApiBuilderFromCtpClient(passwordFlowClient(email, password))
    .withProjectKey({ projectKey })
    .me()
    .login()
    .post({ body: { email, password } })
    .execute();
};

export default loginUser;
