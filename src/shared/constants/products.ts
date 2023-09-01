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

export default defaultFilters;
