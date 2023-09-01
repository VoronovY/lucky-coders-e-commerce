import { RootState } from '../../../app/appStore/appStore';
import { FilterFields, ProductCardData, Sort } from '../../../shared/types/types';

const selectProductList = (state: RootState): ProductCardData[] => state.catalog.productList;

const selectSearchValue = (state: RootState): string => state.catalog.searchValue;

const selectSortValue = (state: RootState): Sort => state.catalog.sortValue;

const selectFilters = (state: RootState): FilterFields => state.catalog.filters;

export { selectProductList, selectSearchValue, selectSortValue, selectFilters };
