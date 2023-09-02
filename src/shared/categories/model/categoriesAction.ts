import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '@commercetools/platform-sdk';

import { CatalogCategory, CategoriesObject } from '../../types/types';
import getErrorMessage from '../../helpers/routerHelpres';
import getCategories from '../../api/categories/getCategories';

function createCategories(categoriesDTO: Category[]): CatalogCategory[] {
  const categories: CategoriesObject = {};

  categoriesDTO
    .filter((cat: Category) => !cat.parent)
    .forEach((el: Category) => {
      const name = el.name['en-US'];
      categories[name] = {
        id: el.id,
        name: el.name,
        key: el.key,
        description: el.description,
        children: [],
      };
    });

  Object.values(categories).forEach((cat) => {
    const { id } = cat;
    const subCategories = categoriesDTO
      .filter((curCat) => {
        if (curCat?.parent) {
          return curCat.parent.id === id;
        }
        return false;
      })
      .map((curCat) => {
        return {
          id: curCat.id,
          name: curCat.name,
          parent: curCat.parent,
          key: curCat.key,
          description: curCat.description,
          children: [],
        };
      });

    const curCat = cat;

    curCat.children = subCategories;
  });

  return Object.values(categories);
}

const getCategoriesAction = createAsyncThunk<CatalogCategory[], void, { rejectValue: string }>(
  'categories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      const convertedCategories = createCategories(response.body.results);
      return convertedCategories;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      return rejectWithValue(message);
    }
  },
);

export default getCategoriesAction;
