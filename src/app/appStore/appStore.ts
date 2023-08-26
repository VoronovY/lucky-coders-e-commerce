import { configureStore } from '@reduxjs/toolkit';

import { mainSettingsReducer } from '../../shared/model/appSlice';

import { productListReducer } from '../../features/productList/model/productListSlice';

const reducer = {
  mainSettings: mainSettingsReducer,
  productListReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
