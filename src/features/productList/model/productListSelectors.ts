import { FilterFields, ProductCardData } from '../../../shared/types/types';
import { OptionInput } from '../../../shared/ui/select/SelectInput';

import type { RootState } from '../../../app/appStore/store';

const selectProductList = (state: RootState): ProductCardData[] => state.catalog.productList;

const selectSearchValue = (state: RootState): string => state.catalog.searchValue;

const selectSortValue = (state: RootState): OptionInput | undefined => state.catalog.sortValue;

const selectFilters = (state: RootState): FilterFields => state.catalog.filters;

const selectIsProductListError = (state: RootState): boolean => state.catalog.isError;

const selectIsProductListLoading = (state: RootState): boolean => state.catalog.isLoading;

const selectProductListErrorMessage = (state: RootState): string => state.catalog.errorMessage;

const selectSelectedCategoryId = (state: RootState): string | null => state.catalog.selectedCategoryId;

const selectProductsTotalCount = (state: RootState): number => state.catalog.totalProductCount;

const selectProductsOffset = (state: RootState): number => state.catalog.offset;

export {
  selectProductList,
  selectSearchValue,
  selectSortValue,
  selectFilters,
  selectIsProductListError,
  selectProductListErrorMessage,
  selectIsProductListLoading,
  selectSelectedCategoryId,
  selectProductsTotalCount,
  selectProductsOffset,
};
