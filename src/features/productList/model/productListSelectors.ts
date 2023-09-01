import { RootState } from '../../../app/appStore/appStore';
import { FilterFields, ProductCardData } from '../../../shared/types/types';
import { OptionInput } from '../../../shared/ui/select/SelectInput';

const selectProductList = (state: RootState): ProductCardData[] => state.catalog.productList;

const selectSearchValue = (state: RootState): string => state.catalog.searchValue;

const selectSortValue = (state: RootState): OptionInput | undefined => state.catalog.sortValue;

const selectFilters = (state: RootState): FilterFields => state.catalog.filters;

export { selectProductList, selectSearchValue, selectSortValue, selectFilters };
