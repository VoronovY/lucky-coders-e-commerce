import { RootState } from '../../app/appStore/appStore';

export const getUserId = (state: RootState): string => state.mainSettings.userId;

export const getAccessToken = (state: RootState): string => state.mainSettings.accessToken;

export const getRefreshToken = (state: RootState): string => state.mainSettings.refreshToken;

export const getInfoModalMessage = (state: RootState): string => state.mainSettings.infoMessage;

export const getIsInfoModalOpen = (state: RootState): boolean => state.mainSettings.isInfoModalOpen;
