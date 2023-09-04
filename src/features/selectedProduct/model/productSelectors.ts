import { RootState } from '../../../app/appStore/appStore';
import { SelectedProductData } from '../../../shared/types/types';

const selectProduct = (state: RootState): SelectedProductData | null => state.selectedProduct.product;

export default selectProduct;
