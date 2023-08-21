import { configureStore } from '@reduxjs/toolkit';

import { mainSettingsReducer } from '../../shared/model/appSlice';

const reducer = {
  mainSettings: mainSettingsReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
