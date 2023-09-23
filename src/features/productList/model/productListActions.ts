import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductProjection } from '@commercetools/platform-sdk';

import getProductList from '../api/getProductList';
import getErrorMessage from '../../../shared/helpers/routerHelpres';
import { FilterFields, ProductCardData, ProductsResponse } from '../../../shared/types/types';

const convertProductFromDTO = (product: ProductProjection): ProductCardData => {
  const { attributes, images, prices } = product.masterVariant;
  const firstPrice = prices ? prices[0] : 0;
  const discountedPrice = firstPrice ? firstPrice.discounted?.value.centAmount : 0;
  const originalPrice = firstPrice ? firstPrice.value.centAmount : 0;
  const firstImageLink = images?.length ? images[0].url : '';
  const firstImageAlt = images?.length ? images[0].label : '';

  const discount = discountedPrice ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
  const description = product.description ? product.description['en-US'] : '';
  return {
    id: product.id,
    key: product.key,
    categories: product.categories,
    attributes: attributes || [],
    discountedPrice: (discountedPrice ? discountedPrice / 100 : 0).toFixed(2) || '',
    originalPrice: (originalPrice / 100).toFixed(2),
    imageLink: firstImageLink,
    imageAlt: firstImageAlt || '',
    discount,
    description,
    title: product.name['en-US'],
  };
};

const getProductListAction = createAsyncThunk<
  ProductsResponse,
  { filters: FilterFields | null; searchValue: string; sortBy: string; categoryId: string | null; newOffset?: number },
  { rejectValue: string }
>('catalog/productList', async ({ filters, searchValue, sortBy, categoryId, newOffset = 0 }, { rejectWithValue }) => {
  try {
    const response = await getProductList(filters, searchValue, sortBy, categoryId, newOffset);

    const convertedProductList = response.body.results.map((product) => convertProductFromDTO(product));
    const { offset } = response.body;
    const totalProductsCount = response.body.total || 0;

    return { convertedProductList, offset, totalProductsCount };
  } catch (error: unknown) {
    const message = getErrorMessage(error);

    return rejectWithValue(message);
  }
});

export default getProductListAction;
