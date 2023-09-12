import { CatalogCategory } from '../../types/types';

import type { RootState } from '../../../app/appStore/store';

const selectCategories = (state: RootState): CatalogCategory[] => state.categoriesData.categories;

export default selectCategories;
