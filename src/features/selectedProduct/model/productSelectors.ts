import { RootState } from '../../../app/appStore/appStore';
import { SelectedProductData } from '../../../shared/types/types';

const selectProduct = (state: RootState): SelectedProductData => state.selectedProductReducer.product;

export default selectProduct;
