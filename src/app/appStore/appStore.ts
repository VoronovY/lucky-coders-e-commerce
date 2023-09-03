import { configureStore } from '@reduxjs/toolkit';

import { mainSettingsReducer } from '../../shared/model/appSlice';

import { productListReducer } from '../../features/productList/model/productListSlice';

import { selectedProductReducer } from '../../features/selectedProduct/model/productSlice';

import { userDetails } from '../../entities/user/model/userSlice';
import { categoriesData } from '../../shared/categories/model/categoriesSlice';

const reducer = {
  mainSettings: mainSettingsReducer,
  catalog: productListReducer,
  selectedProduct: selectedProductReducer,
  userDetails,
  categoriesData,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
