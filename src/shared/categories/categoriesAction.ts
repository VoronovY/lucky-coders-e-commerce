import { createAsyncThunk } from '@reduxjs/toolkit';

import createCategories from './createCategories';

import { NewCategory } from '../types/types';
import getErrorMessage from '../helpers/routerHelpres';

const getCategoriesAction = createAsyncThunk<NewCategory[], void, { rejectValue: string }>(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await createCategories();
      return response;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default getCategoriesAction;
