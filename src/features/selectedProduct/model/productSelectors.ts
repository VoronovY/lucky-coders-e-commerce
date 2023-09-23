import { SelectedProductData } from '../../../shared/types/types';

import type { RootState } from '../../../app/appStore/store';

const selectProduct = (state: RootState): SelectedProductData | null => state.selectedProduct.product;

export default selectProduct;
