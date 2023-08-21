import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootSlice {
  refreshToken: string;
  accessToken: string;
  userId: string;
  infoMessage: string;
  isInfoModalOpen: boolean;
}

const initialState: RootSlice = {
  refreshToken: '',
  accessToken: '',
  userId: '',
  infoMessage: '',
  isInfoModalOpen: false,
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
    updateInfoMessage: (state, action: PayloadAction<string>) => {
      const currentState = state;
      currentState.infoMessage = action.payload;
    },
    updateIsModalInfoOpen: (state, action: PayloadAction<boolean>) => {
      const currentState = state;
      currentState.isInfoModalOpen = action.payload;
    },
  },
});

export const {
  reducer: mainSettingsReducer,
  actions: { updateRefreshToken, updateAccessToken, updateUserId, updateInfoMessage, updateIsModalInfoOpen },
} = mainSettingsSlice;
