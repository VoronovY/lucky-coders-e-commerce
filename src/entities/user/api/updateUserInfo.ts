import { ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';

const updateUserInfo = (
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: string,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return createApiBuilderFromCtpClient(existingFlowClient())
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [
          { action: 'setFirstName', firstName },
          { action: 'setLastName', lastName },
          { action: 'changeEmail', email },
          { action: 'setDateOfBirth', dateOfBirth },
        ],
      },
    })
    .execute();
};

export default updateUserInfo;
