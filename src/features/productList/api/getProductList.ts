import {
  ClientResponse,
  ProductProjectionPagedQueryResponse,
  QueryParam,
  SuggestionResult,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

import { projectKey } from '../../../shared/api/baseApi';
import credentialsFlowClient from '../../../shared/api/clientBuilder/credentialsFlowClient';
import { FilterFields } from '../../../shared/types/types';
import { PRODUCTS_ON_PAGE } from '../../../shared/constants/products';

interface QueryParams {
  fuzzy?: boolean;
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  [key: string]: QueryParam;
}

const getProductList = (
  filters: FilterFields | null,
  searchValue: string,
  sortBy: string,
  categoryId: string | null,
  newOffset: number,
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
    categoriesFilter: categoryId ? `categories.id: "${categoryId}"` : '',
  };

  const filter: string[] = [];

  const sortedValues = [];

  if (sortBy) sortedValues.push(sortBy);

  Object.values(newFilters).forEach((filterValue) => filterValue && filter.push(filterValue));

  const queryArgs: QueryParams = {
    limit: PRODUCTS_ON_PAGE,
    filter,
    'text.en-us': searchParams || '',
    sort: sortedValues,
  };

  if (newOffset) queryArgs.offset = newOffset;

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
