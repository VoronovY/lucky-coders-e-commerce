import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  SuggestionResult,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';
import { FilterFields } from '../../../shared/types/types';

const getProductList = (
  filters: FilterFields | null,
  searchValue: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  const searchParams = searchValue || null;
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
    'text.en-us': searchParams || '',
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

export const getSearchWords = (prefix: string): Promise<ClientResponse<SuggestionResult>> => {
  return createApiBuilderFromCtpClient(credentialsFlowClient())
    .withProjectKey({ projectKey })
    .productProjections()
    .suggest()
    .get({
      queryArgs: { 'searchKeywords.en-US': `"${prefix}"` },
    })
    .execute();
};

export default getProductList;
