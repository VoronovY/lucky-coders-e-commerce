import { configureStore } from '@reduxjs/toolkit';

import { mainSettingsReducer } from '../../shared/model/appSlice';

import { productListReducer } from '../../features/productList/model/productListSlice';
import { selectedProductReducer } from '../../features/selectedProduct/model/productSlice';

const reducer = {
  mainSettings: mainSettingsReducer,
  productListReducer,
  selectedProduct: selectedProductReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
