import {
  ApiRoot,
  Cart,
  ClientResponse,
  MyCartAddLineItemAction,
  MyCartUpdate,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import existingFlowClient from '../../../shared/api/clientBuilder/existingTokenFlowClient';
import anonymousSessionFlowClient from '../../../shared/api/clientBuilder/anonymousSessionFlowClient';

export const getApiRoot: () => ApiRoot = () => {
  return createApiBuilderFromCtpClient(existingFlowClient());
};

export const getUserCart = (): Promise<ClientResponse<Cart>> => {
  return getApiRoot().withProjectKey({ projectKey }).me().activeCart().get().execute();
};

export const createAnonymousCart = (): Promise<ClientResponse<Cart>> => {
  return createApiBuilderFromCtpClient(anonymousSessionFlowClient())
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();
};

export const updateUserCart = (cartId: string, productId: string, version: number): Promise<ClientResponse<Cart>> => {
  const updateAction: MyCartAddLineItemAction = {
    action: 'addLineItem',
    productId,
  };

  const update: MyCartUpdate = {
    version,
    actions: [updateAction],
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: update,
    })
    .execute();
};
