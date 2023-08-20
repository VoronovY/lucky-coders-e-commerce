import { RootState } from '../../app/appStore/appStore';

export const getUserId = (state: RootState): string => state.mainSettings.userId;

export const getAccessToken = (state: RootState): string => state.mainSettings.accessToken;

export const getRrefreshToken = (state: RootState): string => state.mainSettings.accessToken;
