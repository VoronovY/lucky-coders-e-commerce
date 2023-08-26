import { RootState } from '../../../app/appStore/appStore';
import { ProductCardData } from '../../../shared/types/types';

const selectProductList = (state: RootState): ProductCardData[] => state.productListReducer.productList;

export default selectProductList;
