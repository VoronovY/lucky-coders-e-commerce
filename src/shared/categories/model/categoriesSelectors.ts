import { RootState } from '../../../app/appStore/appStore';
import { CatalogCategory } from '../../types/types';

const selectCategories = (state: RootState): CatalogCategory[] => state.categoriesData.categories;

export default selectCategories;
