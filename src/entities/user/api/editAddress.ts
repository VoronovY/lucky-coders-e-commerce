import { BaseAddress, ClientResponse, Customer, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import { projectKey } from '../../../shared/api/baseApi';
import { NewAddress } from '../../../shared/types/types';

const editAddress = ({
  version,
  id,
  country,
  city,
  streetName,
  state,
  postalCode,
}: NewAddress): Promise<ClientResponse<Customer>> => {
  const updatedAddress: BaseAddress = {
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
        actions: [{ action: 'changeAddress', address: updatedAddress, addressId: id }],
      },
    })
    .execute();
};

export default editAddress;
