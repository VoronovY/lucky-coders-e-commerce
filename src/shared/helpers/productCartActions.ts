import {
  MyCartAddDiscountCodeAction,
  MyCartAddLineItemAction,
  MyCartChangeLineItemQuantityAction,
  MyCartRemoveDiscountCodeAction,
  MyCartRemoveLineItemAction,
  MyCartUpdate,
  MyCartUpdateAction,
} from '@commercetools/platform-sdk';

export const createProductAction = (productId: string): MyCartAddLineItemAction => {
  return { action: 'addLineItem', productId };
};

export const createChangeQuantityAction = (
  lineItemId: string,
  quantity: number,
): MyCartChangeLineItemQuantityAction => {
  return { action: 'changeLineItemQuantity', lineItemId, quantity };
};

export const createRemoveLineItemAction = (lineItemId: string): MyCartRemoveLineItemAction => {
  return {
    action: 'removeLineItem',
    lineItemId,
  };
};

export const createAddDiscountCodeAction = (code: string): MyCartAddDiscountCodeAction => {
  return {
    action: 'addDiscountCode',
    code,
  };
};

export const createRemoveDiscountCodeAction = (discountCodeId: string): MyCartRemoveDiscountCodeAction => {
  return {
    action: 'removeDiscountCode',
    discountCode: {
      typeId: 'discount-code',
      id: discountCodeId,
    },
  };
};

export const createUpdateCartBody = (version: number, actions: MyCartUpdateAction[]): MyCartUpdate => {
  return {
    version,
    actions,
  };
};
