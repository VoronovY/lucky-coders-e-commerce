import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductProjection } from '@commercetools/platform-sdk';

import getProductByKey from '../api/getProduct';
import getErrorMessage from '../../../shared/helpers/routerHelpres';
import { SelectedProductData } from '../../../shared/types/types';

const convertProductFromDTO = (product: ProductProjection): SelectedProductData => {
  const { attributes, images, prices } = product.masterVariant;

  const firstPrice = prices ? prices[0] : 0;
  const discountedPrice = firstPrice ? firstPrice.discounted?.value.centAmount : 0;
  const originalPrice = firstPrice ? firstPrice.value.centAmount : 0;

  const imageLinks = images?.map((item) => item.url);

  const discount = discountedPrice ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100) : 0;
  const quantity = product.masterVariant.availability?.availableQuantity || 0;
  const description = product.description ? product.description['en-US'] : '';
  const title = product.name['en-US'];
  return {
    id: product.id,
    attributes: attributes || [],
    discountedPrice: (discountedPrice ? discountedPrice / 100 : 0).toFixed(2) || '',
    originalPrice: (originalPrice / 100).toFixed(2),
    imageLinks: imageLinks || [],
    discount,
    quantity,
    description,
    title,
  };
};

const getProductAction = createAsyncThunk<SelectedProductData | null, string | undefined, { rejectValue: string }>(
  'catalog/selectedProduct',
  async (key: string | undefined, { rejectWithValue }) => {
    try {
      if (!key) return null;
      const response = await getProductByKey(key);
      const convertedProduct = convertProductFromDTO(response.body);
      return convertedProduct;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default getProductAction;
