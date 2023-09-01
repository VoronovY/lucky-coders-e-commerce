import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import getProductListAction from './productListActions';

import { FilterFields, ProductCardData } from '../../../shared/types/types';
import defaultFilters from '../../../shared/constants/products';
import { OptionInput } from '../../../shared/ui/select/SelectInput';

type ProductList = {
  productList: ProductCardData[];
  filters: FilterFields;
  searchValue: string;
  sortValue: OptionInput | undefined;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: ProductList = {
  productList: [],
  filters: defaultFilters,
  searchValue: '',
  sortValue: undefined,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const ProductListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<FilterFields>) => {
      const currentState = state;
      currentState.filters = action.payload;
    },
    updateSearchValue: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.searchValue = action.payload;
    },
    updateSortValue: (state, action: PayloadAction<OptionInput>) => {
      const currentState = state;
      currentState.sortValue = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductListAction.pending, (state) => {
        const currentState = state;
        currentState.isLoading = true;
      })
      .addCase(getProductListAction.fulfilled, (state, { payload }) => {
        const currentState = state;
        currentState.productList = payload;
      })
      .addCase(getProductListAction.rejected, (state, { error }) => {
        const currentState = state;
        currentState.errorMessage = error.message || '';
        currentState.isError = true;
      });
  },
});

export const {
  reducer: productListReducer,
  actions: { updateFilters, updateSearchValue, updateSortValue },
} = ProductListSlice;
