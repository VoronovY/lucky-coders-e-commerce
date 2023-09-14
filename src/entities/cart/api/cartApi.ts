import {
  ApiRoot,
  Cart,
  ClientResponse,
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
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

export const getCartById = (id: string): Promise<ClientResponse<Cart>> => {
  return getApiRoot().withProjectKey({ projectKey }).carts().withId({ ID: id }).get().execute();
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

export const createUserCart = (): Promise<ClientResponse<Cart>> => {
  return getApiRoot()
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

// export const updateCart = (cartId: string, version: number, body: MyCartUpdate): Promise<ClientResponse<Cart>> => {
//   return getApiRoot()
//     .withProjectKey({ projectKey })
//     .me()
//     .carts()
//     .withId({ ID: cartId })
//     .post({
//       body: {
//         version,
//         actions: body.actions,
//       },
//     })
//     .execute();
// };

export const updateUserCart = (cartId: string, productId: string, version: number): Promise<ClientResponse<Cart>> => {
  const updateAction: MyCartAddLineItemAction = {
    action: 'addLineItem',
    productId,
  };

  const updateBody: MyCartUpdate = {
    version,
    actions: [updateAction],
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: updateBody,
    })
    .execute();
};

export const changeProductQuantity = (
  cartId: string,
  lineItemId: string,
  quantity: number,
  version: number,
): Promise<ClientResponse<Cart>> => {
  const changeQuantityAction: MyCartChangeLineItemQuantityAction = {
    action: 'changeLineItemQuantity',
    lineItemId,
    quantity,
  };

  const updateBody: MyCartUpdate = {
    version,
    actions: [changeQuantityAction],
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: updateBody,
    })
    .execute();
};

export const removeProducts = (
  cartId: string,
  lineItemsIds: string[],
  version: number,
): Promise<ClientResponse<Cart>> => {
  const removeLineItemActions: MyCartRemoveLineItemAction[] = lineItemsIds.map((lineItemId) => {
    return {
      action: 'removeLineItem',
      lineItemId,
    };
  });

  const updateBody: MyCartUpdate = {
    version,
    actions: removeLineItemActions,
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: updateBody,
    })
    .execute();
};

export const addDiscountCode = (
  cartId: string,
  discountCode: string,
  version: number,
): Promise<ClientResponse<Cart>> => {
  const addDiscountCodeAction: MyCartAddDiscountCodeAction = {
    action: 'addDiscountCode',
    code: discountCode,
  };

  const updateBody: MyCartUpdate = {
    version,
    actions: [addDiscountCodeAction],
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: updateBody,
    })
    .execute();
};

export const removeDiscountCodes = (
  cartId: string,
  discountCodeIds: string[],
  version: number,
): Promise<ClientResponse<Cart>> => {
  const removeDiscountCodeActions: MyCartRemoveDiscountCodeAction[] = discountCodeIds.map((discountCodeId) => {
    return {
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: discountCodeId,
      },
    };
  });

  const updateBody: MyCartUpdate = {
    version,
    actions: removeDiscountCodeActions,
  };

  return getApiRoot()
    .withProjectKey({ projectKey })
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: updateBody,
    })
    .execute();
};
