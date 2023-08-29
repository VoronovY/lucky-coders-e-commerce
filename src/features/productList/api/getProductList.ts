import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';
import { FilterFields } from '../../../shared/types/types';

const getProductList = (filters: FilterFields | null): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const newFilters = {
    colorFilter: filters?.colors.length
      ? `variants.attributes.color.key: ${filters?.colors
          .map((color) => `"${color[0].toUpperCase()}${color.slice(1)}"`)
          .join(',')}`
      : '',
    priceFilter: filters
      ? `variants.price.centAmount:range (${+filters.price.from * 100} to ${+filters.price.to * 100})`
      : '',
    weightFilter: filters
      ? `variants.attributes.weightNumber:range (${filters.weight.from} to ${filters.weight.to})`
      : '',
  };

  const filter: string[] = [];

  Object.values(newFilters).forEach((filterValue) => filterValue && filter.push(filterValue));

  const queryArgs = {
    limit: 50,
    filter,
  };
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute();
};

export default getProductList;
