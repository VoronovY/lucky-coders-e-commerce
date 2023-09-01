import { RootState } from '../../app/appStore/appStore';
import { NewCategory } from '../types/types';

const selectCategories = (state: RootState): NewCategory[] => state.categories.category;

export default selectCategories;
