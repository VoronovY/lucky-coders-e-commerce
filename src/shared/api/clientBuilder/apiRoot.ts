import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import refreshTokenFlowClient from './refreshTokenFlowClient';

let apiRoot: ApiRoot | null = null;

export const getApiRoot = (): ApiRoot => {
  if (apiRoot) {
    return apiRoot;
  }

  apiRoot = createApiBuilderFromCtpClient(refreshTokenFlowClient());
  return apiRoot;
};

export const resetApiRoot = (): void => {
  apiRoot = null;
};
