import { RootState } from '../../../app/appStore/appStore';
import { FilterFields, ProductCardData } from '../../../shared/types/types';
import { OptionInput } from '../../../shared/ui/select/SelectInput';

const selectProductList = (state: RootState): ProductCardData[] => state.catalog.productList;

const selectSearchValue = (state: RootState): string => state.catalog.searchValue;

const selectSortValue = (state: RootState): OptionInput | undefined => state.catalog.sortValue;

const selectFilters = (state: RootState): FilterFields => state.catalog.filters;

const selectIsProductListError = (state: RootState): boolean => state.catalog.isError;

const selectProductListErrorMessage = (state: RootState): string => state.catalog.errorMessage;

const selectSelectedCategoryId = (state: RootState): string => state.catalog.selectedCategoryId;

export {
  selectProductList,
  selectSearchValue,
  selectSortValue,
  selectFilters,
  selectIsProductListError,
  selectProductListErrorMessage,
  selectSelectedCategoryId,
};
