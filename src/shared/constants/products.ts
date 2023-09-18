import { FilterFields } from '../types/types';

const defaultFilters: FilterFields = {
  weight: {
    from: 0,
    to: 1000,
  },
  price: {
    from: 0,
    to: 1000,
  },
  colors: [],
};

export const PRODUCTS_ON_PAGE = 6;

export default defaultFilters;
