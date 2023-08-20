import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootSlice {
  refreshToken: string;
  accessToken: string;
  userId: string;
}

const initialState: RootSlice = {
  refreshToken: '',
  accessToken: '',
  userId: '',
};

const mainSettingsSlice = createSlice({
  name: 'mainSettings',
  initialState,
  reducers: {
    updateRefreshToken: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.refreshToken = action.payload;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.accessToken = action.payload;
    },
    updateUserId: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.userId = action.payload;
    },
  },
});

export const {
  reducer: mainSettingsReducer,
  actions: { updateRefreshToken, updateAccessToken, updateUserId },
} = mainSettingsSlice;
