import { BaseAddress, ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';
import { NewAddress } from '../../../shared/types/types';

const addNewAddress = ({
  version,
  country,
  city,
  streetName,
  state,
  postalCode,
}: NewAddress): Promise<ClientResponse<Customer>> => {
  const newAddress: BaseAddress = {
    country,
    city,
    streetName,
    state,
    postalCode,
  };

  return createApiBuilderFromCtpClient(existingFlowClient())
    .withProjectKey({ projectKey })
    .me()
    .post({
      body: {
        version,
        actions: [{ action: 'addAddress', address: newAddress }],
      },
    })
    .execute();
};

export default addNewAddress;
