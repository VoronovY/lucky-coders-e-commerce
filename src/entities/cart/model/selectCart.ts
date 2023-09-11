import { Cart } from '@commercetools/platform-sdk';

import type { RootState } from '../../../app/appStore/store';

const selectCart = (state: RootState): Cart | null => state.userCart.cart;

const selectCartError = (state: RootState): boolean => state.userCart.isError;

const selectCartLoading = (state: RootState): boolean => state.userCart.isLoading;

const selectCartErrorMessage = (state: RootState): string => state.userCart.errorMessage;

export { selectCart, selectCartError, selectCartLoading, selectCartErrorMessage };
