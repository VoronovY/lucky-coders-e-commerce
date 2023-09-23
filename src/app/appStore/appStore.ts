import { mainSettingsReducer } from '../../shared/model/appSlice';

import { productListReducer } from '../../features/productList/model/productListSlice';

import { selectedProductReducer } from '../../features/selectedProduct/model/productSlice';

import { userDetails } from '../../entities/user/model/userSlice';
import { categoriesData } from '../../shared/categories/model/categoriesSlice';
import { userCartReducer } from '../../entities/cart/model/cartSlice';

const reducer = {
  mainSettings: mainSettingsReducer,
  catalog: productListReducer,
  selectedProduct: selectedProductReducer,
  userDetails,
  categoriesData,
  userCart: userCartReducer,
};

export default reducer;
